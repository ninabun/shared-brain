import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React from "react";
import {
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Film,
  Grid3X3,
  ImagePlus,
  KeyRound,
  Link as LinkIcon,
  LogIn,
  LogOut,
  Plus,
  Search,
  Settings,
  Sparkles,
  Tags,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { auth, db, googleProvider } from "./firebase";
import {
  cx,
  detectSource,
  formatDate,
  hostName,
  initials,
  normalizeUrl,
  randomToken,
  sha256,
  youtubeId,
} from "./utils";

const typeLabels = {
  all: "Everything",
  youtube: "YouTube",
  tweet: "AI Tools",
  instagram: "Instagram",
  article: "Agentic AI",
  note: "Loose ideas",
};

const sourceOptions = ["youtube", "tweet", "instagram", "article", "note"];
const workspaceId = "main";

function sourceLabel(type) {
  return typeLabels[type] || "Reference";
}

function isImageLikeUrl(value = "") {
  return (
    value.startsWith("data:image/") ||
    /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(value)
  );
}

function brandForIdea(idea) {
  const text = `${idea.url || ""} ${idea.title || ""} ${idea.attribution || ""}`.toLowerCase();
  if (text.includes("github.com") || text.includes("github")) {
    return {
      name: "GitHub",
      mark: "GH",
      className: "github",
      tagline: "Code intelligence",
    };
  }
  if (text.includes("suno.com") || text.includes("suno")) {
    return {
      name: "Suno",
      mark: "SU",
      className: "suno",
      tagline: "AI music studio",
    };
  }
  return null;
}

function enrichDraft(url, type) {
  const source = type || detectSource(url);
  const id = youtubeId(url);
  if (source === "youtube" && id) {
    return {
      source,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      title: "Untitled YouTube video",
      attribution: "YouTube",
    };
  }
  if (source === "tweet") {
    return {
      source,
      title: "Saved tweet",
      attribution: hostName(url) || "X / Twitter",
    };
  }
  if (source === "instagram") {
    return {
      source,
      title: "Saved Instagram post",
      attribution: "Instagram",
    };
  }
  if (source === "article") {
    return {
      source,
      title: hostName(url) || "Saved article",
      attribution: hostName(url),
    };
  }
  return {
    source,
    title: "Loose idea",
    attribution: "Original note",
  };
}

function fileToCompressedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not load image preview."));
      image.onload = () => {
        const maxSize = 980;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [accessIssue, setAccessIssue] = useState("");

  useEffect(() => {
    const off = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
      if (nextUser) {
        try {
          await setDoc(
            doc(db, "profiles", nextUser.uid),
            {
              displayName: nextUser.displayName || "",
              email: nextUser.email || "",
              photoURL: nextUser.photoURL || "",
              lastSeenAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (error) {
          console.warn("Profile save skipped:", error);
        }
      }
    });
    return off;
  }, []);

  useEffect(() => {
    if (!user) {
      setIdeas([]);
      setProfile(null);
      return undefined;
    }

    const ideasQuery = query(
      collection(db, "workspaces", workspaceId, "ideas"),
      orderBy("createdAt", "desc")
    );
    const offIdeas = onSnapshot(ideasQuery, (snapshot) => {
      setAccessIssue("");
      setIdeas(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    }, () => setAccessIssue("This Google account is signed in, but it is not a member of the private workspace yet."));
    const offProfile = onSnapshot(doc(db, "profiles", user.uid), (snapshot) => {
      setProfile(snapshot.exists() ? snapshot.data() : null);
    });

    return () => {
      offIdeas();
      offProfile();
    };
  }, [user]);

  const categories = useMemo(() => {
    const all = new Set();
    ideas.forEach((idea) => (idea.categories || []).forEach((category) => all.add(category)));
    return Array.from(all).sort((a, b) => a.localeCompare(b));
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    const text = search.trim().toLowerCase();
    return ideas.filter((idea) => {
      const typeMatch = activeType === "all" || idea.source === activeType;
      const categoryMatch =
        !categoryFilter || (idea.categories || []).includes(categoryFilter);
      const haystack = [
        idea.title,
        idea.description,
        idea.url,
        idea.attribution,
        ...(idea.categories || []),
        idea.filmCategory,
      ]
        .join(" ")
        .toLowerCase();
      return typeMatch && categoryMatch && (!text || haystack.includes(text));
    });
  }, [ideas, search, activeType, categoryFilter]);

  async function handleGoogleSignIn() {
    await signInWithPopup(auth, googleProvider);
  }

  if (!authReady) return <Splash />;

  if (!user) {
    return <SignIn onSignIn={handleGoogleSignIn} />;
  }

  return (
    <main className="app-shell">
      <Sidebar
        activeType={activeType}
        setActiveType={setActiveType}
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        user={user}
        onProfile={() => setProfileOpen(true)}
        onSignOut={() => signOut(auth)}
      />
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Private creative operating system</p>
            <h1>Shared Brain</h1>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search links, ideas, categories..."
              />
            </label>
            <button className="primary-button" onClick={() => setComposerOpen(true)}>
              <Plus size={18} />
              Save idea
            </button>
          </div>
        </header>

        <Stats ideas={ideas} />

        {accessIssue ? (
          <AccessNotice message={accessIssue} user={user} />
        ) : filteredIdeas.length ? (
          <section className="masonry-grid" aria-label="Saved ideas">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onEdit={() => setEditingIdea(idea)} />
            ))}
          </section>
        ) : (
          <EmptyState onCreate={() => setComposerOpen(true)} hasIdeas={ideas.length > 0} />
        )}
      </section>

      {composerOpen && <Composer user={user} onClose={() => setComposerOpen(false)} />}
      {editingIdea && <Composer idea={editingIdea} onClose={() => setEditingIdea(null)} />}
      {profileOpen && (
        <ProfilePanel
          user={user}
          profile={profile}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </main>
  );
}

function Splash() {
  return (
    <div className="center-stage">
      <div className="pulse-mark">
        <Sparkles size={26} />
      </div>
    </div>
  );
}

function SignIn({ onSignIn }) {
  return (
    <main className="signin-page">
      <section className="signin-hero">
        <div className="brand-mark">
          <Sparkles size={24} />
        </div>
        <p className="eyebrow">Shared visual second brain</p>
        <h1>Collect the sparks before they disappear.</h1>
        <p>
          A premium private library for video ideas, saved links, rich previews,
          categories, film planning, and agent-readable creative memory.
        </p>
        <button className="primary-button large" onClick={onSignIn}>
          <LogIn size={19} />
          Continue with Google
        </button>
      </section>
      <section className="signin-preview" aria-label="App preview">
        <div className="preview-card tall">
          <div className="preview-media youtube-glow" />
          <span>YouTube research</span>
          <strong>Why this hook keeps retention high</strong>
        </div>
        <div className="preview-card">
          <TweetPreview
            title="Tweet about an unusually sharp opening line..."
            attribution="@creator"
          />
        </div>
        <div className="preview-card wide">
          <div className="preview-media image-glow" />
          <span>Reference</span>
          <strong>Visual system for the next studio episode</strong>
        </div>
      </section>
    </main>
  );
}

function Sidebar({
  activeType,
  setActiveType,
  categories,
  categoryFilter,
  setCategoryFilter,
  user,
  onProfile,
  onSignOut,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark small">
          <Sparkles size={18} />
        </div>
        <div>
          <strong>Shared Brain</strong>
          <span>AI Applications</span>
        </div>
      </div>

      <nav className="nav-group" aria-label="Library filters">
        {Object.entries(typeLabels).map(([type, label]) => (
          <button
            key={type}
            className={cx("nav-item", activeType === type && "active")}
            onClick={() => setActiveType(type)}
          >
            {type === "all" ? <Grid3X3 size={17} /> : <Film size={17} />}
            {label}
          </button>
        ))}
      </nav>

      <div className="category-block">
        <div className="section-title">
          <Tags size={15} />
          Categories
        </div>
        <button
          className={cx("category-pill", !categoryFilter && "active")}
          onClick={() => setCategoryFilter("")}
        >
          All categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={cx("category-pill", categoryFilter === category && "active")}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
        {!categories.length && <p className="muted-note">No categories yet.</p>}
      </div>

      <div className="user-strip">
        <button className="avatar-button" onClick={onProfile}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="" />
          ) : (
            <span>{initials(user.displayName || user.email)}</span>
          )}
          <span>Profile</span>
        </button>
        <button className="icon-button" onClick={onSignOut} aria-label="Sign out">
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}

function Stats({ ideas }) {
  const planned = ideas.filter((idea) => idea.filmDate).length;
  const uncategorized = ideas.filter((idea) => !idea.categories?.length).length;
  const uploads = ideas.filter((idea) => idea.uploadUrl).length;
  return (
    <section className="stats-row">
      <div>
        <strong>{ideas.length}</strong>
        <span>saved ideas</span>
      </div>
      <div>
        <strong>{planned}</strong>
        <span>film dates</span>
      </div>
      <div>
        <strong>{uncategorized}</strong>
        <span>uncategorized</span>
      </div>
      <div>
        <strong>{uploads}</strong>
        <span>uploaded visuals</span>
      </div>
    </section>
  );
}

function AccessNotice({ message, user }) {
  const [copied, setCopied] = useState(false);

  async function copyUid() {
    await navigator.clipboard.writeText(user.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="empty-state">
      <KeyRound size={32} />
      <h2>Workspace access needed.</h2>
      <p>
        {message} Add <strong>{user.email}</strong> as a member in Firebase at{" "}
        <code>workspaces/main/members/{user.uid}</code>.
      </p>
      <button className="secondary-button uid-copy" onClick={copyUid}>
        {copied ? <Check size={17} /> : <Copy size={17} />}
        {copied ? "Copied UID" : "Copy exact UID"}
      </button>
    </section>
  );
}

function IdeaCard({ idea, onEdit }) {
  const isTweet = idea.source === "tweet";
  const visualUrl = idea.uploadUrl || (isImageLikeUrl(idea.thumbnailUrl) ? idea.thumbnailUrl : "");
  const isVisual = Boolean(visualUrl);
  const brand = brandForIdea(idea);
  return (
    <article className={cx("idea-card", idea.source)}>
      {isVisual ? (
        <a href={idea.url || idea.uploadUrl} target="_blank" rel="noreferrer" className="media-link">
          <img src={visualUrl} alt="" />
        </a>
      ) : brand ? (
        <BrandPreview brand={brand} />
      ) : isTweet ? (
        <TweetPreview title={idea.title} description={idea.description} attribution={idea.attribution} />
      ) : (
        <div className="text-preview">
          <Sparkles size={24} />
          <span>{sourceLabel(idea.source)}</span>
        </div>
      )}

      <div className="card-body">
        <div className="card-kicker">
          <span>{sourceLabel(idea.source)}</span>
          {idea.url && (
            <a href={idea.url} target="_blank" rel="noreferrer" aria-label="Open source">
              <ExternalLink size={15} />
            </a>
          )}
        </div>
        {!isTweet && <h2>{idea.title}</h2>}
        {!isTweet && idea.description && <p>{idea.description}</p>}
        {idea.attribution && <span className="attribution">{idea.attribution}</span>}

        <div className="meta-row">
          {idea.filmDate && (
            <span>
              <Calendar size={14} />
              {formatDate(idea.filmDate)}
            </span>
          )}
          {idea.filmCategory && (
            <span>
              <Film size={14} />
              {idea.filmCategory}
            </span>
          )}
        </div>

        <div className="tag-row">
          {(idea.categories || []).map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>

        <div className="card-actions">
          <button onClick={onEdit}>
            <Settings size={15} />
            Edit
          </button>
          <button className="danger" onClick={() => deleteDoc(doc(db, "workspaces", workspaceId, "ideas", idea.id))}>
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function BrandPreview({ brand }) {
  return (
    <div className={cx("brand-preview", brand.className)}>
      <div className="brand-preview-grid" />
      <div className="brand-orbit">
        <span>{brand.mark}</span>
      </div>
      <div className="brand-preview-copy">
        <strong>{brand.name}</strong>
        <span>{brand.tagline}</span>
      </div>
    </div>
  );
}

function TweetPreview({ title, description, attribution }) {
  return (
    <div className="tweet-preview">
      <div className="tweet-author">
        <div className="tweet-avatar">{initials(attribution || "X")}</div>
        <div>
          <strong>{attribution || "Saved tweet"}</strong>
          <span>X / Twitter</span>
        </div>
      </div>
      <p>{description || title || "Saved tweet"}</p>
      <div className="tweet-line" />
    </div>
  );
}

function EmptyState({ onCreate, hasIdeas }) {
  return (
    <section className="empty-state">
      <Sparkles size={32} />
      <h2>{hasIdeas ? "Nothing matches that view." : "Start with one sharp reference."}</h2>
      <p>
        Save a link, upload a screenshot, or write a loose idea. Categories stay
        empty until you or an agent adds them.
      </p>
      <button className="primary-button" onClick={onCreate}>
        <Plus size={18} />
        Save idea
      </button>
    </section>
  );
}

function Composer({ idea, user, onClose }) {
  const [url, setUrl] = useState(idea?.url || "");
  const [source, setSource] = useState(idea?.source || "note");
  const [title, setTitle] = useState(idea?.title || "");
  const [description, setDescription] = useState(idea?.description || "");
  const [attribution, setAttribution] = useState(idea?.attribution || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(idea?.thumbnailUrl || "");
  const [categories, setCategories] = useState((idea?.categories || []).join(", "));
  const [filmCategory, setFilmCategory] = useState(idea?.filmCategory || "");
  const [filmDate, setFilmDate] = useState(idea?.filmDate || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadUrl, setUploadUrl] = useState(idea?.uploadUrl || "");
  const fileRef = useRef(null);

  useEffect(() => {
    if (!url || idea) return;
    const normalized = normalizeUrl(url);
    const enriched = enrichDraft(normalized, detectSource(normalized));
    setSource(enriched.source);
    setTitle((current) => current || enriched.title);
    setAttribution((current) => current || enriched.attribution);
    setThumbnailUrl((current) => current || enriched.thumbnailUrl || "");
  }, [url, idea]);

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      setUploadUrl(await fileToCompressedDataUrl(file));
      setUploadError("Visual ready. It will be saved as an embedded thumbnail.");
    } catch (error) {
      console.error("Thumbnail failed:", error);
      setUploadError(error?.message || "Thumbnail failed. Try a smaller image or use Preview image URL.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedUrl = url ? normalizeUrl(url) : "";
    const fallback = enrichDraft(normalizedUrl, source);
    const payload = {
      url: normalizedUrl,
      source,
      title: title.trim() || fallback.title,
      description: description.trim(),
      attribution: attribution.trim() || fallback.attribution || "",
      thumbnailUrl: thumbnailUrl.trim() || fallback.thumbnailUrl || "",
      uploadUrl,
      categories: categories
        .split(",")
        .map((category) => category.trim())
        .filter(Boolean),
      filmCategory: filmCategory.trim(),
      filmDate: filmDate || "",
      updatedAt: serverTimestamp(),
    };

    if (idea) {
      await updateDoc(doc(db, "workspaces", workspaceId, "ideas", idea.id), payload);
    } else {
      await addDoc(collection(db, "workspaces", workspaceId, "ideas"), {
        ...payload,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.uid || user?.uid || "",
      });
    }
    onClose();
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="composer" onSubmit={handleSubmit}>
        <header>
          <div>
            <p className="eyebrow">{idea ? "Refine saved item" : "Capture new idea"}</p>
            <h2>{idea ? "Edit idea" : "Save to Shared Brain"}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <label>
          <span>Link</span>
          <div className="input-with-icon">
            <LinkIcon size={17} />
            <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Paste YouTube, X, Instagram, article..." />
          </div>
        </label>

        <div className="segmented">
          {sourceOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={cx(source === option && "active")}
              onClick={() => setSource(option)}
            >
              {sourceLabel(option)}
            </button>
          ))}
        </div>

        <label>
          <span>Title</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What should this be remembered as?" />
        </label>
        <label>
          <span>Notes or hook</span>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Reaction, reference, hook, or what the agent should remember..." />
        </label>

        <div className="two-column">
          <label>
            <span>Attribution</span>
            <input value={attribution} onChange={(event) => setAttribution(event.target.value)} placeholder="Channel, creator, publication..." />
          </label>
          <label>
            <span>Preview image URL</span>
            <input value={thumbnailUrl} onChange={(event) => setThumbnailUrl(event.target.value)} placeholder="Optional thumbnail override" />
          </label>
        </div>

        <div className="two-column">
          <label>
            <span>Categories</span>
            <input value={categories} onChange={(event) => setCategories(event.target.value)} placeholder="Comma separated, optional" />
          </label>
          <label>
            <span>Film category</span>
            <input value={filmCategory} onChange={(event) => setFilmCategory(event.target.value)} placeholder="Shorts, main channel, ad read..." />
          </label>
        </div>

        <div className="two-column">
          <label>
            <span>Planned film date</span>
            <input type="date" value={filmDate} onChange={(event) => setFilmDate(event.target.value)} />
          </label>
          <div className="upload-box">
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} />
            <button type="button" onClick={() => fileRef.current?.click()}>
              {uploading ? <Upload size={17} /> : <ImagePlus size={17} />}
              {uploading ? "Uploading..." : uploadUrl ? "Replace visual" : "Upload visual"}
            </button>
          </div>
        </div>
        {uploadError && <p className="form-error">{uploadError}</p>}

        <footer>
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit">
            <Check size={18} />
            {idea ? "Save changes" : "Add to library"}
          </button>
        </footer>
      </form>
    </div>
  );
}

function ProfilePanel({ user, profile, onClose }) {
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("");

  async function generateAccessToken() {
    const raw = `sb_${randomToken()}`;
    const tokenHash = await sha256(raw);
    await setDoc(
      doc(db, "profiles", user.uid),
      {
        agentTokenHash: tokenHash,
        agentTokenCreatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    setToken(raw);
  }

  async function copyToken() {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="modal-backdrop profile-backdrop" role="dialog" aria-modal="true">
      <aside className="profile-panel">
        <header>
          <div>
            <p className="eyebrow">User profile</p>
            <h2>Agent access</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        <div className="profile-user">
          {user.photoURL ? <img src={user.photoURL} alt="" /> : <span>{initials(user.displayName || user.email)}</span>}
          <div>
            <strong>{user.displayName || "Signed-in user"}</strong>
            <span>{user.email}</span>
          </div>
        </div>

        <section className="agent-card">
          <KeyRound size={20} />
          <h3>Credential for agents</h3>
          <p>
            Agents must use an approved Google session plus this access token. Keep
            it private. Regenerating a token replaces the previous one.
          </p>
          {token ? (
            <div className="token-box">
              <code>{token}</code>
              <button onClick={copyToken}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          ) : (
            <p className="muted-note">
              {profile?.agentTokenHash
                ? "A token exists, but only its secure hash is stored. Generate a new one if you need to reveal it again."
                : "No agent token has been created yet."}
            </p>
          )}
          <button className="secondary-button" onClick={generateAccessToken}>
            <KeyRound size={17} />
            Generate access token
          </button>
        </section>

        <section className="instructions">
          <h3>How agents should operate</h3>
          <ol>
            <li>Authenticate to Firebase using an allowed Google account.</li>
            <li>Ask the human for the current access token from this profile screen.</li>
            <li>Verify the token by hashing it with SHA-256 and comparing it to <code>profiles/{user.uid}.agentTokenHash</code>.</li>
            <li>Read and write items in <code>workspaces/main/ideas</code> only after the token check passes.</li>
            <li>Use Storage paths under <code>workspaces/main/idea-assets/</code> for screenshots and reference images.</li>
          </ol>
        </section>
      </aside>
    </div>
  );
}

export default App;
