// Example of how to update your CarouselVideoItem component
"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useVideoUrls } from "@/lib/hooks/useVideoUrls";

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

  // Get video URLs using the client-side hook
  const { videoUrl, posterUrl, loading } = useVideoUrls(
    project.videoSrc,
    "medium"
  );

  // Rest of your component logic remains the same...
  const startProgressTracking = (
    video: HTMLVideoElement,
    projectId: number
  ) => {
    if (progressUpdateInterval.current) {
      clearInterval(progressUpdateInterval.current);
    }

    progressUpdateInterval.current = setInterval(() => {
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
        stopProgressTracking();
      }
    }, 3000);
  };

  const stopProgressTracking = () => {
    if (progressUpdateInterval.current) {
      clearInterval(progressUpdateInterval.current);
      progressUpdateInterval.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, []);

  const handleVideoHover = (projectId: number, shouldPlay: boolean) => {
    const video = videoRefs.current[projectId.toString()];
    isHovering.current = shouldPlay;

    if (shouldPlay) {
      onMouseEnter?.(projectId.toString());
    } else {
      onMouseLeave?.();
    }

    if (video) {
      if (shouldPlay) {
        const savedTime = videoProgressRef.current[projectId.toString()] || 0;
        video.currentTime = savedTime;

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              startProgressTracking(video, projectId);
            })
            .catch((error) => {
              console.log("Video play failed:", error);
            });
        }
      } else {
        stopProgressTracking();
        videoProgressRef.current[projectId.toString()] = video.currentTime;
        setVideoProgress((prev) => ({
          ...prev,
          [projectId.toString()]: video.currentTime,
        }));
        video.pause();
      }
    }
  };

  // Show loading state while URLs are being generated (very fast now)
  if (loading) {
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
        className="relative"
        onMouseEnter={() => handleVideoHover(project.id, true)}
        onMouseLeave={() => handleVideoHover(project.id, false)}
        onMouseMove={onMouseMove}
        onClick={(e) => {
          stopProgressTracking();
          isHovering.current = false;
          onVideoClick(project, e);
        }}
      >
        <video
          ref={(el) => {
            if (el) {
              videoRefs.current[project.id.toString()] = el;
            }
          }}
          src={videoUrl}
          className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-300"
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
      </div>

      {/* Project Info */}
      <div className="space-y-2 mt-4">
        <h3 className="font-unboxed-custom text-lg font-semibold group-hover:text-gray-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 uppercase tracking-wider font-unboxed-custom">
          {project.category}
        </p>
      </div>
    </motion.div>
  );
};

export default CarouselVideoItem;
