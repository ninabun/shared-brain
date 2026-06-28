const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function base64UrlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function parseJwt(token) {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) throw new Error("Invalid auth token.");
  return {
    header: JSON.parse(new TextDecoder().decode(base64UrlToBytes(header))),
    payload: JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))),
    signedData: new TextEncoder().encode(`${header}.${payload}`),
    signature: base64UrlToBytes(signature),
  };
}

async function verifyFirebaseToken(token, env) {
  const parsed = parseJwt(token);
  if (parsed.header.alg !== "RS256" || !parsed.header.kid) {
    throw new Error("Unsupported auth token.");
  }

  const certsResponse = await fetch(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
    { cf: { cacheTtl: 3600, cacheEverything: true } }
  );
  const certs = await certsResponse.json();
  const key = certs.keys?.find((candidate) => candidate.kid === parsed.header.kid);
  if (!key) throw new Error("Unknown auth token key.");

  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    key,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    parsed.signature,
    parsed.signedData
  );
  if (!valid) throw new Error("Invalid auth token signature.");

  const now = Math.floor(Date.now() / 1000);
  const expectedIssuer = `https://securetoken.google.com/${env.FIREBASE_PROJECT_ID}`;
  if (parsed.payload.aud !== env.FIREBASE_PROJECT_ID) throw new Error("Wrong auth audience.");
  if (parsed.payload.iss !== expectedIssuer) throw new Error("Wrong auth issuer.");
  if (!parsed.payload.exp || parsed.payload.exp < now) throw new Error("Expired auth token.");

  const allowedEmails = (env.ALLOWED_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const email = String(parsed.payload.email || "").toLowerCase();
  if (allowedEmails.length && !allowedEmails.includes(email)) {
    throw new Error("This account is not allowed to use title suggestions.");
  }

  return parsed.payload;
}

function trimTitle(value = "") {
  return value
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 6)
    .join(" ");
}

function imageContent(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return [];
  if (!imageUrl.startsWith("data:image/") && !/^https?:\/\//i.test(imageUrl)) return [];
  return [{ type: "input_image", image_url: imageUrl, detail: "low" }];
}

async function suggestTitle(item, env) {
  const textBlock = [
    `Current title: ${item.title || ""}`,
    `Description: ${item.description || ""}`,
    `URL: ${item.url || ""}`,
    `Attribution: ${item.attribution || ""}`,
    `Source type: ${item.source || ""}`,
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You write conservative library titles. Return only one short title, fewer than six words. Prefer exact literal titles from description, URL, attribution, or screenshot text. Do not be clever. Do not add punctuation unless it is part of a product name.",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Suggest a better title for this saved item.\n\n${textBlock}`,
            },
            ...imageContent(item.imageUrl),
          ],
        },
      ],
      max_output_tokens: 24,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const result = await response.json();
  const raw =
    result.output_text ||
    result.output?.flatMap((entry) => entry.content || [])
      ?.find((content) => content.type === "output_text")?.text ||
    "";

  const title = trimTitle(raw);
  if (!title) throw new Error("OpenAI returned an empty title.");
  return title;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return json({ error: "Use POST." }, 405);
    }

    try {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
      if (!token) return json({ error: "Missing Firebase auth token." }, 401);
      await verifyFirebaseToken(token, env);

      const body = await request.json();
      const title = await suggestTitle(body.item || {}, env);
      return json({ title });
    } catch (error) {
      return json({ error: error.message || "Title suggestion failed." }, 400);
    }
  },
};
