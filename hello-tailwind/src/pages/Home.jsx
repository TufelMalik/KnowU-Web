import React, { useState, useEffect, useRef } from "react";
import { Cropper, RectangleStencil } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

/* -------------------------
  IndexedDB helper
-------------------------*/
const DB_NAME = "posts-db";
const STORE_NAME = "files";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function putBlob(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(blob, key);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

async function getBlob(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = (e) => resolve(e.target.result || null);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function deleteBlob(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

/* -------------------------
  Constants
-------------------------*/
const POSTS_META_KEY = "posts_meta_v1";
const DEFAULT_USER_DP =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='%2380899b'>U</text></svg>";
const DEFAULT_COLLEGE = "Your College";
const DEFAULT_YEAR = "2025";

/* -------------------------
  Home Component
-------------------------*/
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const cropperRef = useRef(null);

  const [userDp] = useState(localStorage.getItem("user_dp") || DEFAULT_USER_DP);
  const [userCollege] = useState(
    localStorage.getItem("user_college") || DEFAULT_COLLEGE
  );
  const [userYear] = useState(localStorage.getItem("user_year") || DEFAULT_YEAR);

  /* -------------------------
    Load Posts
  -------------------------*/
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const raw = localStorage.getItem(POSTS_META_KEY);
        if (!raw) return;
        const metaArr = JSON.parse(raw);
        const loaded = await Promise.all(
          metaArr.map(async (meta) => {
            const blob = await getBlob(meta.fileKey);
            if (!blob) return { ...meta, file: null };
            const url = URL.createObjectURL(blob);
            return { ...meta, file: url };
          })
        );
        setPosts(loaded.reverse());
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };
    loadPosts();

    return () => {
      posts.forEach((p) => p.file && URL.revokeObjectURL(p.file));
    };
  }, []);

  const saveMeta = (metaArr) => {
    localStorage.setItem(POSTS_META_KEY, JSON.stringify(metaArr));
  };

  /* -------------------------
    File upload
  -------------------------*/
  const handleFileUpload = (file) => {
    if (!file) return;
    const type = file.type.startsWith("video") ? "video" : "image";
    setPreviewFile(file);
    setPreviewType(type);
    const url = URL.createObjectURL(file);
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewURL(url);
    setPreviewOpen(true);
  };

  const processAndSave = async (blob) => {
    const id = Date.now();
    const fileKey = `post-${id}-${Math.random().toString(36).slice(2)}`;
    await putBlob(fileKey, blob);
    const url = URL.createObjectURL(blob);
    const newMeta = {
      id,
      fileKey,
      type: blob.type.startsWith("video") ? "video" : "image",
      likes: 0,
      liked: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => {
      const runtimePost = { ...newMeta, file: url };
      const updated = [runtimePost, ...prev];
      const metaToSave = updated.map(({ file, ...rest }) => rest).reverse();
      saveMeta(metaToSave);
      return updated;
    });
  };

  const handleConfirmPost = async () => {
    if (!previewFile) return;
    let blobToSave = previewFile;

    if (previewType === "image" && cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        blobToSave = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/jpeg")
        );
      }
    }

    await processAndSave(blobToSave);
    closePreview();
  };

  const closePreview = () => {
    setPreviewOpen(false);
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewFile(null);
    setPreviewType(null);
    setPreviewURL(null);
  };

  /* -------------------------
    Like / Comment / Delete
  -------------------------*/
  const handleLike = (id) => {
    setPosts((prev) => {
      const updated = prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      );
      const metaToSave = updated.map(({ file, ...rest }) => rest).reverse();
      saveMeta(metaToSave);
      return updated;
    });
  };

  const handleAddComment = (id, text) => {
    if (!text.trim()) return;
    setPosts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, text] } : p
      );
      const metaToSave = updated.map(({ file, ...rest }) => rest).reverse();
      saveMeta(metaToSave);
      return updated;
    });
  };

  const handleDeletePost = async (id) => {
    const toDelete = posts.find((p) => p.id === id);
    if (!toDelete) return;

    try {
      await deleteBlob(toDelete.fileKey);
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      const metaToSave = updated.map(({ file, ...rest }) => rest).reverse();
      saveMeta(metaToSave);
      if (toDelete.file) URL.revokeObjectURL(toDelete.file);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  /* -------------------------
    Render
  -------------------------*/
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopNavbar onFileUpload={handleFileUpload} />

      <div className="flex-1 overflow-y-auto p-3 pb-24">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-lg">
            No posts yet. Click the{" "}
            <span className="font-bold text-[#097abe]">+</span> to upload your
            first post!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 max-w-md mx-auto"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={userDp}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">You</div>
                    <div className="text-xs text-gray-500">
                      {userCollege} • Class of {userYear}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>

              {post.type === "image" ? (
                <img
                  src={post.file}
                  alt="Post"
                  className="w-full object-cover max-h-[500px]"
                />
              ) : (
                <video
                  controls
                  className="w-full max-h-[500px] bg-black"
                  src={post.file}
                />
              )}

              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex gap-5">
                  {post.liked ? (
                    <AiFillHeart
                      onClick={() => handleLike(post.id)}
                      className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-transform"
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleLike(post.id)}
                      className="text-3xl text-gray-700 cursor-pointer hover:text-red-500 hover:scale-110 transition-transform"
                    />
                  )}
                  <AiOutlineComment className="text-3xl text-gray-700 cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform" />
                  <AiOutlineShareAlt className="text-3xl text-gray-700 cursor-pointer hover:text-green-500 hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="px-4 -mt-1 text-sm font-semibold text-gray-800">
                {post.likes} {post.likes === 1 ? "like" : "likes"}
              </div>

              <div className="px-4 mt-2 space-y-1">
                {post.comments.map((c, i) => (
                  <div key={i} className="text-sm text-gray-700">
                    <span className="font-semibold mr-2">You:</span>
                    {c}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const comment = e.target.comment.value;
                    handleAddComment(post.id, comment);
                    e.target.reset();
                  }}
                >
                  <input
                    name="comment"
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#097abe]"
                  />
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavbar />

      {/* -------- Crop Preview Modal -------- */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="font-semibold">Adjust & Crop</div>
              <button
                onClick={closePreview}
                className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <div className="relative w-full h-[450px] bg-black">
              {previewType === "image" ? (
                <Cropper
                  ref={cropperRef}
                  src={previewURL}
                  stencilComponent={RectangleStencil}
                  className="h-full w-full"
                  stencilProps={{
                    aspectRatio: 1,
                    movable: true,
                    resizable: true,
                  }}
                />
              ) : (
                <video
                  src={previewURL}
                  controls
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            <div className="p-4 flex justify-center">
              <button
                onClick={handleConfirmPost}
                className="px-6 py-2 bg-[#097abe] text-white rounded-lg text-sm hover:bg-[#0a6ca5]"
              >
                Post
              </button>
            </div>

            <div className="p-2 border-t text-xs text-gray-500 text-center">
              Tip: Use pinch, zoom & drag to crop like mobile apps.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
