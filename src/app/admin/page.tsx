"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { PhotoItem, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import ABWButton from "../components/Button";
import { ButtonType } from "../components/Button/enum";

const uploadCategories = CATEGORIES.filter((c) => c !== "All");

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(["Maternity"]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState("");
  const [filterCategory, setFilterCategory] = useState<Category>("All");

  // Edit modal state
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);
  const [editCategories, setEditCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

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
    if (selectedCategories.length === 0) {
      setUploadProgress("✗ Please select at least one category");
      setTimeout(() => setUploadProgress(""), 3000);
      return;
    }

    setUploading(true);
    setUploadProgress(`Uploading ${selectedFiles.length} file(s)...`);

    try {
      const formData = new FormData();
      formData.append("categories", JSON.stringify(selectedCategories));

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
        setSelectedCategories(["Maternity"]);
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

  const toggleCategory = (category: Category) => {
    if (category === "All") return; // Skip "All"
    
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
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
      : photos.filter((p) => p.categories.includes(filterCategory));

  const openEditModal = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPhoto(photo);
    setEditCategories([...photo.categories]);
  };

  const closeEditModal = () => {
    setEditingPhoto(null);
    setEditCategories([]);
  };

  const toggleEditCategory = (category: Category) => {
    if (category === "All") return;
    setEditCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSaveCategories = async () => {
    if (!editingPhoto || editCategories.length === 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/photos/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: editingPhoto.url, categories: editCategories }),
      });

      if (res.ok) {
        closeEditModal();
        await fetchPhotos();
      } else {
        const data = await res.json();
        alert(`Failed to update: ${data.error}`);
      }
    } catch {
      alert("Failed to save categories. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  Categories (select multiple)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {uploadCategories.map((category) => (
                    <label
                      key={category}
                      className={`p-3 rounded-lg cursor-pointer border-2 transition-all text-center text-sm ${
                        selectedCategories.includes(category)
                          ? "bg-orange-400 border-orange-400 text-black font-poppinsBold"
                          : "bg-gray-800 border-gray-700 text-white hover:border-gray-500"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="sr-only"
                      />
                      {category}
                    </label>
                  ))}
                </div>
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

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={uploading || !selectedFiles || selectedFiles.length === 0 || selectedCategories.length === 0}
                className="px-6 py-2.5 rounded-lg bg-orange-400 text-black font-poppinsBold text-sm uppercase tracking-wider hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {uploading ? "Uploading..." : `Upload to ${selectedCategories.length} categor${selectedCategories.length === 1 ? 'y' : 'ies'}`}
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
                  {/* Edit button */}
                  <button
                    onClick={(e) => openEditModal(photo, e)}
                    className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-400 cursor-pointer"
                    title="Edit categories"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                    </svg>
                  </button>
                  {/* Category label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-2 py-2">
                    <span className="text-xs text-gray-300">
                      {photo.categories.join(", ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Categories Modal */}
      {editingPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={closeEditModal}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-poppinsBold text-lg">Edit Categories</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview */}
            <div className="mb-4 rounded-lg overflow-hidden h-32 bg-gray-800">
              <Image
                src={editingPhoto.url}
                alt={editingPhoto.alt}
                width={400}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category checkboxes */}
            <p className="text-sm text-gray-400 mb-3">Select categories (at least one):</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {uploadCategories.map((category) => (
                <label
                  key={category}
                  className={`p-2.5 rounded-lg cursor-pointer border-2 transition-all text-center text-sm ${
                    editCategories.includes(category)
                      ? "bg-orange-400 border-orange-400 text-black font-poppinsBold"
                      : "bg-gray-800 border-gray-700 text-white hover:border-gray-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={editCategories.includes(category)}
                    onChange={() => toggleEditCategory(category)}
                    className="sr-only"
                  />
                  {category}
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <ABWButton
                type={ButtonType.Secondary}
                onClick={handleSaveCategories}
                disabled={saving || editCategories.length === 0}
                className="px-3"
              >
                {saving ? "Saving..." : "Save"}
              </ABWButton>
              <ABWButton
                type={ButtonType.Tertiary}
                onClick={closeEditModal}
                className="px-3"
              >
                Cancel
              </ABWButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
