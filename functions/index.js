import admin from "firebase-admin";
import { defineSecret } from "firebase-functions/params";
import { HttpsError, onCall } from "firebase-functions/v2/https";

admin.initializeApp();

const openaiApiKey = defineSecret("OPENAI_API_KEY");
const workspaceId = "main";

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
  return [
    {
      type: "input_image",
      image_url: imageUrl,
      detail: "low",
    },
  ];
}

async function assertWorkspaceMember(uid, email) {
  if (email === "ninadabun@gmail.com") return;
  const member = await admin
    .firestore()
    .doc(`workspaces/${workspaceId}/members/${uid}`)
    .get();
  if (!member.exists) {
    throw new HttpsError("permission-denied", "This account is not a workspace member.");
  }
}

export const suggestTitle = onCall({ secrets: [openaiApiKey] }, async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Sign in before using AI title suggestions.");
  }

  await assertWorkspaceMember(request.auth.uid, request.auth.token.email);

  const item = request.data?.item || {};
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
      Authorization: `Bearer ${openaiApiKey.value()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
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
    const errorText = await response.text();
    throw new HttpsError("internal", `OpenAI title suggestion failed: ${errorText}`);
  }

  const result = await response.json();
  const raw =
    result.output_text ||
    result.output?.flatMap((entry) => entry.content || [])
      ?.find((content) => content.type === "output_text")?.text ||
    "";

  const title = trimTitle(raw);
  if (!title) {
    throw new HttpsError("internal", "OpenAI returned an empty title.");
  }

  return { title };
});
