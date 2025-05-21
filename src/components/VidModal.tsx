import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

const VideoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is on the backdrop itself, not inside the modal
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Image with play icon */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer w-full h-full rounded-lg overflow-hidden shadow-md"
      >
        <img
          src="/images/overlay.webp"
          alt="Video preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition">
          <FaPlay className="text-white text-4xl" />
        </div>
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <div className="bg-white rounded-lg overflow-hidden w-[90%] md:w-[720px] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-red-600 z-[1000]"
            >
              &times;
            </button>
            <div className="aspect-video w-full">
              <video
                src="/videos/test.mp4"
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPopup;
