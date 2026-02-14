"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { PhotoItem, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

const uploadCategories = CATEGORIES.filter((c) => c !== "All");

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Maternity");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState("");
  const [filterCategory, setFilterCategory] = useState<Category>("All");

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/photos");
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (error) {
      console.error("Failed to fetch photos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchPhotos();
    }
  }, [session, fetchPhotos]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(`Uploading ${selectedFiles.length} file(s)...`);

    try {
      const formData = new FormData();
      formData.append("category", selectedCategory);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      const res = await fetch("/api/photos/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadProgress(`✓ Uploaded ${data.count} photo(s) successfully!`);
        setSelectedFiles(null);
        // Reset file input
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        await fetchPhotos();
      } else {
        setUploadProgress(`✗ Error: ${data.error}`);
      }
    } catch (error) {
      setUploadProgress("✗ Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(""), 4000);
    }
  };

  const toggleSelectForDelete = (url: string) => {
    setSelectedForDelete((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedForDelete.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedForDelete.size} photo(s)? This cannot be undone.`
    );
    if (!confirmed) return;

    const urls = Array.from(selectedForDelete);
    setDeleting(urls);

    try {
      const res = await fetch("/api/photos/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });

      if (res.ok) {
        setSelectedForDelete(new Set());
        await fetchPhotos();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting([]);
    }
  };

  const filteredPhotos =
    filterCategory === "All"
      ? photos
      : photos.filter((p) => p.category === filterCategory);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] bg-size-[6px_6px]">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-glorify text-white uppercase tracking-wider">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {photos.length} photo(s) in gallery
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6 mb-8">
          <h2 className="text-xl text-white font-poppinsBold mb-4">
            Upload Photos
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-orange-400 transition-colors"
                >
                  {uploadCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Photos (max 4.5MB each)
                </label>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-400 file:text-black file:cursor-pointer focus:outline-none focus:border-orange-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={uploading || !selectedFiles || selectedFiles.length === 0}
                className="px-6 py-2.5 rounded-lg bg-orange-400 text-black font-poppinsBold text-sm uppercase tracking-wider hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>

              {selectedFiles && selectedFiles.length > 0 && (
                <span className="text-gray-400 text-sm">
                  {selectedFiles.length} file(s) selected
                </span>
              )}

              {uploadProgress && (
                <span
                  className={`text-sm ${
                    uploadProgress.startsWith("✓")
                      ? "text-green-400"
                      : uploadProgress.startsWith("✗")
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {uploadProgress}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Photo Management Section */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl text-white font-poppinsBold">
              Manage Photos
            </h2>
            <div className="flex gap-3 items-center">
              {/* Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as Category)}
                className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-orange-400 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Delete selected */}
              {selectedForDelete.size > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  disabled={deleting.length > 0}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleting.length > 0
                    ? "Deleting..."
                    : `Delete (${selectedForDelete.size})`}
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-gray-400 text-center py-12">
              Loading photos...
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              No photos found. Upload some above!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.url}
                  onClick={() => toggleSelectForDelete(photo.url)}
                  className={`relative group rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedForDelete.has(photo.url)
                      ? "border-red-500 scale-95"
                      : "border-transparent hover:border-gray-600"
                  }`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    width={300}
                    height={400}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                  {/* Selection indicator */}
                  <div
                    className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedForDelete.has(photo.url)
                        ? "bg-red-500 border-red-500"
                        : "border-white/50 bg-black/30 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {selectedForDelete.has(photo.url) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {/* Category label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-2 py-2">
                    <span className="text-xs text-gray-300">
                      {photo.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
