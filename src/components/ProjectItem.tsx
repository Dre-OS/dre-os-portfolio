"use client";
import type { ReactNode } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { getFullResolutionSource, ProjectImageModal } from './ProjectImageModal';
import { ProjectTagIndicators } from './ProjectTagIndicators';

const FALLBACK_IMAGE =
  'https://res.cloudinary.com/dihmbrhjw/image/upload/v1792372961/mock-project_m62dal.svg';

interface ProjectItemProps {
  /** Project logo (can be an image URL string or ReactNode) */
  logo?: string | ReactNode;
  /** Project snapshot (can be an image URL string or ReactNode) */
  snapshot: string | ReactNode;
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** Comma-separated project tags */
  tags?: string;
  /** Optional additional className for the root container */
  className?: string;
}

/**
 * Project item designed to be used inside a Carousel.
 * Layout:
 *   - Snapshot fills the item with a gradient overlay (jet to transparent) for text/logo visibility.
 *   - Logo, title, and description are overlaid on the snapshot.
 *   - Logo disappears on hover of the item.
 *   - Responsive design with 16:9 aspect ratio.
 */
export function ProjectItem({
  logo,
  snapshot,
  title,
  description,
  tags,
  className,
}: ProjectItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const getImageSrc = (src: string | undefined, width: number, height: number): string => {
    if (typeof src === 'string' && src.trim() !== '' && src !== "confidential") {
      return src;
    }
    if (typeof src === 'string' && src === "confidential"){
      if (width === 100 && height === 100){ return "" }
      if (width === 400 && height === 300){ return "" }
    }
    return FALLBACK_IMAGE;
  };

  const logoSrc = getImageSrc(typeof logo === 'string' ? logo : undefined, 100, 100);
  const hasLogo =
    typeof logo === 'string'
      ? logo.trim() !== '' && logo !== 'confidential'
      : Boolean(logo);
  const snapshotSrc = getImageSrc(
    typeof snapshot === 'string' ? snapshot : undefined,
    400,
    300
  );
  const originalSnapshotSrc = getFullResolutionSource(snapshotSrc);

  return (
    <div 
      className={`${className ?? ''} w-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Snapshot */}
        {typeof snapshot === 'string' ? (
          <button
            type="button"
            onClick={() => setIsImageOpen(true)}
            aria-label={`View ${title} project snapshot`}
            className="absolute inset-0 z-0 block cursor-zoom-in text-left outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan focus-visible:ring-inset"
          >
            <Image
              width={1600}
              height={900}
              src={originalSnapshotSrc}
              alt={`${title} snapshot`}
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized={originalSnapshotSrc.endsWith('.svg')}
              className="absolute inset-0 h-full w-full object-cover bg-jet/20"
            />
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {snapshot}
          </div>
        )}
        {/* Gradient overlay: jet to transparent */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-jet/70 to-transparent"></div>
        {/* Content: logo, title, description at the bottom */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-4 text-white pointer-events-none">
          {/* Logo - fade out on hover */}
          {hasLogo ? (
            <div className={`mb-4 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
              {typeof logo === 'string' ? (
                <Image
                  src={logoSrc}
                  alt={`${title} logo`}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  className="hidden md:block"
                />
              ) : (
                <div className="hidden md:block">{logo}</div>
              )}
              {typeof logo !== 'string' ? (
                <div className="block md:hidden">{logo}</div>
              ) : null}
            </div>
          ) : null}
          <ProjectTagIndicators tags={tags} />
          <h3 className="mb-2 mt-3 font-sans text-lg font-semibold">{title}</h3>
          <p className="text-sm font-mono text-slate-300">{description}</p>
        </div>
        {typeof snapshot === 'string' ? (
          <ProjectImageModal
            source={originalSnapshotSrc}
            title={title}
            tags={tags}
            isOpen={isImageOpen}
            onClose={() => setIsImageOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
