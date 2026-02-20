"use client";

import { FC, ReactElement, useState, useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoItem, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

const GalleryPage: FC = (): ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const filteredImages =
    selectedCategory === "All"
      ? photos
      : photos.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] bg-size-[6px_6px]">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-glorify text-white uppercase tracking-wider">
          Gallery
        </h1>

        {/* Category Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
          {CATEGORIES.map((category, index) => (
            <span key={category} className="flex items-center">
              <Button
                onClick={() => setSelectedCategory(category)}
                className={`text-lg font-euclidCircularBLight transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "text-orange-400 font-bold scale-110"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {category}
              </Button>
              {index < CATEGORIES.length - 1 && (
                <span className="text-gray-400 ml-2.5">•</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Pinterest-style Masonry Grid */}
      {loading ? (
        <div className="text-gray-400 text-center py-20 px-4">
          Loading gallery...
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-gray-400 text-center py-20 px-4">
          No photos found in this category.
        </div>
      ) : (
        <div className="gallery-grid px-4 pb-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredImages.map((image) => (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="gallery-item group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
