'use client';

import {useState} from 'react';
import Image from 'next/image';
import styles from './ActivityGallery.module.css';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  layout: 'full' | 'split-left' | 'split-right';
  youtubeId?: string;
}

interface ActivityGalleryProps {
  gallery: GalleryItem[];
}

export default function ActivityGallery({gallery}: ActivityGalleryProps) {
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  // Group split items together
  const processedGallery: (GalleryItem | GalleryItem[])[] = [];
  let i = 0;
  
  while (i < gallery.length) {
    const current = gallery[i];
    
    if (current.layout === 'split-left' && i + 1 < gallery.length && gallery[i + 1].layout === 'split-right') {
      processedGallery.push([current, gallery[i + 1]]);
      i += 2;
    } else {
      processedGallery.push(current);
      i += 1;
    }
  }

  const handleVideoClick = (videoId: string) => {
    const newPlayingVideos = new Set(playingVideos);
    if (playingVideos.has(videoId)) {
      newPlayingVideos.delete(videoId);
    } else {
      newPlayingVideos.add(videoId);
    }
    setPlayingVideos(newPlayingVideos);
  };

  const renderVideoContent = (item: GalleryItem, videoId: string, size: 'full' | 'split') => {
    const isPlaying = playingVideos.has(videoId);

    if (isPlaying && item.youtubeId) {
      return (
        <div className={styles.videoEmbed}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={item.alt || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button 
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              handleVideoClick(videoId);
            }}
            aria-label="Close video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      );
    }

    return (
      <div 
        className={styles.videoPlaceholder}
        onClick={() => handleVideoClick(videoId)}
      >
        <div className={styles.playButton}>
          <svg
            width={size === 'full' ? '80' : '64'}
            height={size === 'full' ? '80' : '64'}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span className={styles.videoLabel}>
          {item.alt || 'Play Video'}
        </span>
        <div className={styles.youtubeBadge}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
            <path d="M19.582 2.186c-.229-.863-.905-1.54-1.768-1.768C16.254 0 10 0 10 0S3.746 0 2.186.418c-.863.229-1.54.905-1.768 1.768C0 3.746 0 7 0 7s0 3.254.418 4.814c.229.863.905 1.54 1.768 1.768C3.746 14 10 14 10 14s6.254 0 7.814-.418c.863-.229 1.54-.905 1.768-1.768C20 10.254 20 7 20 7s0-3.254-.418-4.814z"/>
            <path fill="#fff" d="M8 10V4l5.196 3L8 10z"/>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.gallery}>
          {processedGallery.map((item, index) => {
            // Handle split layout (two items side by side)
            if (Array.isArray(item)) {
              return (
                <div key={`split-${index}`} className={styles.splitRow}>
                  {item.map((subItem, subIndex) => {
                    const videoId = `${index}-${subIndex}`;
                    return (
                      <div key={videoId} className={styles.splitItem}>
                        {subItem.type === 'image' ? (
                          <div className={styles.imageWrapper}>
                            <Image
                              src={subItem.src}
                              alt={subItem.alt || `Image ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={styles.image}
                              style={{objectFit: 'cover'}}
                            />
                          </div>
                        ) : (
                          renderVideoContent(subItem, videoId, 'split')
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }
            
            // Handle full-width layout
            const videoId = `full-${index}`;
            return (
              <div key={index} className={styles.galleryItem}>
                {item.type === 'image' ? (
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.src}
                      alt={item.alt || `Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className={styles.image}
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                ) : (
                  renderVideoContent(item, videoId, 'full')
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
