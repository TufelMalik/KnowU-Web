import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhotoGrid from "./PhotoGrid";
import Lightbox from "./Lightbox";

const photos = Array.from({ length: 11 }, (_, i) => `/assets/user/user${i + 1}.jpg`);

const PhotosTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const closeLightbox = () => setSelectedIndex(null);

  return (
    <>
      <PhotoGrid photos={photos} onSelect={setSelectedIndex} />

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            photos={photos}
            selectedIndex={selectedIndex}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotosTab;
