"use client";

import { FC, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoItem } from "@/lib/types";
import ABWButton from "../Button";
import { ButtonType } from "../Button/enum";
import { ChevronIcon, CloseIcon } from "../../../../public/images/icons";

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const currentPhoto = photos[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [isOpen, onNext, onPrev, onClose]
  );

  // Keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          {/* Close Button */}
          <ABWButton
            type={ButtonType.IconButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="top-4 right-4"
          >
            <CloseIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </ABWButton>

          {/* Photo counter */}
          <div className="absolute top-4 left-4 z-10 text-white/70 text-sm font-poppinsMedium">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Previous Button */}
          {photos.length > 1 && (
            <ABWButton type={ButtonType.IconButton} onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
              aria-label="Previous photo"
              className="left-2 md:left-6 md:p-3"
            >
              <ChevronIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </ABWButton>
          )}
b
          {/* Image */}
          <motion.div
            key={currentPhoto.url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentPhoto.url}
              alt={currentPhoto.alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg select-none"
              priority
              draggable={false}
            />
          </motion.div>

          {/* Next Button */}
          {photos.length > 1 && (
            <ABWButton type={ButtonType.IconButton}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="right-2 md:right-6 md:p-3"
              aria-label="Next photo"
            >
              <ChevronIcon className="w-5 h-5 md:w-6 md:h-6 text-white rotate-180" />
            </ABWButton>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
