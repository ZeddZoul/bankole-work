import { useState, useEffect } from 'react';
import { getVideoSrc, getPosterSrc } from '@/lib/cloudinary';

interface VideoUrls {
  videoUrl: string;
  posterUrl?: string;
}

export const useVideoUrls = (publicId: string, quality: 'high' | 'medium' | 'low' = 'high') => {
  const [urls, setUrls] = useState<VideoUrls>({ videoUrl: '', posterUrl: undefined });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!publicId) {
      setLoading(false);
      return;
    }

    // Generate URLs immediately (no async needed)
    const videoUrl = getVideoSrc(publicId, quality);
    const posterUrl = getPosterSrc(publicId);

    setUrls({ videoUrl, posterUrl });
    setLoading(false);
  }, [publicId, quality]);

  return { ...urls, loading };
};

// Hook for adaptive quality selection based on connection/device
export const useAdaptiveVideoUrl = (publicId: string) => {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const { videoUrl, posterUrl, loading } = useVideoUrls(publicId, quality);

  useEffect(() => {
    // Simple connection-based quality selection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        if (connection.effectiveType === '4g') {
          setQuality('high');
        } else if (connection.effectiveType === '3g') {
          setQuality('medium');
        } else {
          setQuality('low');
        }
      }
    }
    
    // Also consider device pixel ratio and viewport size
    const devicePixelRatio = window.devicePixelRatio || 1;
    const viewportWidth = window.innerWidth;
    
    if (devicePixelRatio < 2 && viewportWidth < 768) {
      setQuality('low');
    } else if (viewportWidth < 1024) {
      setQuality('medium');
    }
  }, []);

  return { videoUrl, posterUrl, loading, quality, setQuality };
};

// Batch URL generation for multiple videos
export const useBatchVideoUrls = (items: Array<{ publicId: string, quality?: 'high' | 'medium' | 'low' }>) => {
  const [urls, setUrls] = useState<Record<string, VideoUrls>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    const urlMap: Record<string, VideoUrls> = {};
    
    items.forEach(item => {
      const videoUrl = getVideoSrc(item.publicId, item.quality || 'high');
      const posterUrl = getPosterSrc(item.publicId);
      urlMap[item.publicId] = { videoUrl, posterUrl };
    });

    setUrls(urlMap);
    setLoading(false);
  }, [items]);

  return { urls, loading };
};
