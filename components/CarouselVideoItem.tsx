"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useVideoUrls } from "../lib/hooks/useVideoUrls";

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

interface CarouselVideoItemProps {
  project: Project;
  index: number;
  videoRefs: React.RefObject<{ [key: string]: HTMLVideoElement | null }>;
  videoProgressRef: React.RefObject<{ [key: string]: number }>;
  setVideoProgress: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  onVideoClick: (project: Project, e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseEnter?: (projectId: string) => void;
  onMouseLeave?: () => void;
}

const CarouselVideoItem: React.FC<CarouselVideoItemProps> = ({
  project,
  index,
  videoRefs,
  videoProgressRef,
  setVideoProgress,
  onVideoClick,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}) => {
  const progressUpdateInterval = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef<boolean>(false);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Function to get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "";
  };

  // Get video URLs using our secure client-side hook (only for non-YouTube videos)
  const { videoUrl, posterUrl, loading } = useVideoUrls(
    project.type === "youtube" ? "" : project.videoSrc,
    "medium"
  );

  // Optimized progress tracking - every 3 seconds ONLY during hover
  const startProgressTracking = (
    video: HTMLVideoElement,
    projectId: number
  ) => {
    if (progressUpdateInterval.current) {
      clearInterval(progressUpdateInterval.current);
    }

    progressUpdateInterval.current = setInterval(() => {
      // Only track if still hovering and video is playing
      if (isHovering.current && !video.paused && video.currentTime > 0) {
        videoProgressRef.current[projectId.toString()] = video.currentTime;
        setVideoProgress((prev) => ({
          ...prev,
          [projectId.toString()]: video.currentTime,
        }));
        console.log(
          `Tracking progress for video ${projectId}: ${video.currentTime}s`
        );
      } else {
        // Stop tracking if not hovering or video paused
        stopProgressTracking();
      }
    }, 3000); // Update every 3 seconds
  };

  const stopProgressTracking = () => {
    if (progressUpdateInterval.current) {
      clearInterval(progressUpdateInterval.current);
      progressUpdateInterval.current = null;
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, []);

  // Handle video hover play/pause (only for regular videos, not YouTube)
  const handleVideoHover = (projectId: number, shouldPlay: boolean) => {
    // Skip hover handling for YouTube videos
    if (project.type === "youtube") {
      if (shouldPlay) {
        onMouseEnter?.(projectId.toString());
      } else {
        onMouseLeave?.();
      }
      return;
    }

    const video = videoRefs.current[projectId.toString()];
    isHovering.current = shouldPlay; // Track hover state
    console.log(
      `Hover ${shouldPlay ? "enter" : "leave"} for project ${projectId}`,
      video
    );

    // Handle cursor follower
    if (shouldPlay) {
      onMouseEnter?.(projectId.toString());
    } else {
      onMouseLeave?.();
    }

    if (video) {
      if (shouldPlay) {
        // Resume from saved position or start from beginning
        const savedTime = videoProgressRef.current[projectId.toString()] || 0;
        video.currentTime = savedTime;
        console.log(`Resuming video ${projectId} from ${savedTime}s`);

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Only start tracking when hover starts and video actually plays
              startProgressTracking(video, projectId);
            })
            .catch((error: unknown) => {
              console.log("Video play failed:", error);
            });
        }
      } else {
        // Stop tracking immediately when hover ends
        stopProgressTracking();
        // Save current progress before pausing
        videoProgressRef.current[projectId.toString()] = video.currentTime;
        setVideoProgress((prev) => ({
          ...prev,
          [projectId.toString()]: video.currentTime,
        }));
        console.log(
          `Saving progress for video ${projectId}: ${video.currentTime}s`
        );
        video.pause();
      }
    } else {
      console.log(`Video element not found for project ${projectId}`);
    }
  };

  // Show loading state while URLs are being generated (for non-YouTube videos)
  if (project.type !== "youtube" && loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group cursor-pointer relative"
      >
        <div className="relative bg-gray-800 rounded-lg aspect-video animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
      </motion.div>
    );
  }

  const isYouTube = project.type === "youtube";
  const thumbnailUrl = isYouTube
    ? getYouTubeThumbnail(project.videoSrc)
    : posterUrl;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer relative"
    >
      {/* Video Container */}
      <div
        className="relative rounded-lg overflow-hidden aspect-video"
        onMouseEnter={() => handleVideoHover(project.id, true)}
        onMouseLeave={() => handleVideoHover(project.id, false)}
        onMouseMove={onMouseMove}
        onClick={(e) => {
          // Stop tracking when user clicks to open modal
          stopProgressTracking();
          isHovering.current = false;
          console.log(
            `Stopped tracking for video ${project.id} - user clicked to open modal`
          );
          onVideoClick(project, e);
        }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10 bg-gray-900 text-white px-3 py-1 text-xs font-medium rounded-full">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 text-gray-900 px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm">
          {project.category}
        </div>

        {/* Render YouTube iframe or regular video */}
        {isYouTube ? (
          <div className="w-full h-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                project.videoSrc
              )}`}
              title={project.title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            ref={(el) => {
              if (el) {
                videoRefs.current[project.id.toString()] = el;
                console.log(`Video ref set for project ${project.id}:`, el);
              }
            }}
            src={videoUrl}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
            poster={posterUrl}
            preload="metadata"
            muted
            loop
            playsInline
            onLoadedMetadata={() =>
              console.log(`Video loaded for project ${project.id}`)
            }
            onError={(e) =>
              console.error(`Video error for project ${project.id}:`, e)
            }
          />
        )}

        {/* Play Button Overlay for regular videos */}
        {!isYouTube && (
          <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4 md:w-6 md:h-6 text-gray-900 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="space-y-2 mt-4">
        <h3 className="font-unboxed-custom text-lg font-semibold group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 uppercase tracking-wider font-unboxed-custom">
          {project.category}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        {project.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CarouselVideoItem;
