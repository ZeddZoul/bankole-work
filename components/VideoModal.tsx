"use client";

import React from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  videoSrc: string;
  type: string;
  featured?: boolean;
  description: string;
  tags?: string[];
}

interface VideoModalProps {
  selectedVideo: Project | null;
  onClose: () => void;
  videoProgressRef: React.MutableRefObject<{ [key: string]: number }>;
}

const VideoModal: React.FC<VideoModalProps> = ({
  selectedVideo,
  onClose,
  videoProgressRef,
}) => {
  // Generate Cloudinary video URL with optimizations
  const getVideoUrl = (publicId: string, quality = "auto") => {
    return `https://res.cloudinary.com/dz7nvty57/video/upload/q_${quality},f_auto/${publicId}.mp4`;
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`
      : "";
  };

  if (!selectedVideo) return null;

  const isYouTube = selectedVideo.type === "youtube";
  const youtubeEmbedUrl = isYouTube
    ? getYouTubeEmbedUrl(selectedVideo.videoSrc)
    : "";

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full max-h-[95vh] flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white hover:text-gray-300 transition-colors z-10 cursor-pointer"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video */}
        <div className="w-[80%] mx-auto relative bg-black rounded-lg overflow-hidden">
          {isYouTube ? (
            <iframe
              key={selectedVideo.id}
              src={youtubeEmbedUrl}
              title={selectedVideo.title}
              className="mx-auto w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-contain"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video
              key={selectedVideo.id} // Force re-render when video changes
              src={getVideoUrl(selectedVideo.videoSrc, "auto")}
              className="mx-auto max-w-full h-auto max-h-[80vh] object-contain"
              controls
              autoPlay
              muted
              playsInline
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                const savedTime =
                  videoProgressRef.current[selectedVideo.id.toString()] || 0;
                if (savedTime > 0) {
                  video.currentTime = savedTime;
                  console.log(`Modal video loaded, seeking to ${savedTime}s`);
                }
              }}
            />
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center bg-black/50 rounded-lg p-3">
          <h3 className="text-xl font-unboxed-custom font-semibold text-white mb-1">
            {selectedVideo.title}
          </h3>
          <p className="text-gray-300 font-unboxed-custom uppercase tracking-wider text-sm">
            {selectedVideo.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
