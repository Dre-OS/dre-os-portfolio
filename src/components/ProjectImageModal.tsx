"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef } from "react";
import { ProjectTagIndicators } from "./ProjectTagIndicators";

type ProjectImageModalProps = {
  source: string;
  title: string;
  tags?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function getFullResolutionSource(source: string) {
  const cleanSource = source.split(/[?#]/, 1)[0];
  const uploadMarker = "/image/upload/";
  const uploadIndex = cleanSource.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return source;
  }

  const prefix = cleanSource.slice(0, uploadIndex + uploadMarker.length);
  const path = cleanSource.slice(uploadIndex + uploadMarker.length);
  const segments = path.split("/");
  const firstSegment = segments[0];
  const hasCloudinaryTransform =
    firstSegment.split(",").every((segment) =>
      /^(?:a|ar|b|bo|c|co|dpr|e|f|fl|g|h|l|o|pg|q|r|so|t|w|x|y|z)_/.test(
        segment,
      ),
    );

  return `${prefix}${(hasCloudinaryTransform ? segments.slice(1) : segments).join("/")}`;
}

export function ProjectImageModal({
  source,
  title,
  tags,
  isOpen,
  onClose,
}: ProjectImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-jet/90 p-4 sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-full w-full max-w-6xl flex-col gap-3">
        <div className="flex items-center justify-between gap-4 text-platinum">
          <div className="min-w-0">
            <h2 id={titleId} className="font-sans text-lg font-semibold">
              {title}
            </h2>
            <div className="mt-2">
              <ProjectTagIndicators tags={tags} tone="modal" />
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project snapshot"
            className="rounded-full p-2 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden bg-black/20">
          <Image
            src={getFullResolutionSource(source)}
            alt={`${title} project snapshot`}
            width={1920}
            height={1080}
            sizes="100vw"
            unoptimized
            className="max-h-[calc(100vh-8rem)] w-full object-contain"
          />
        </div>
      </div>
    </div>
    ),
    document.body,
  );
}
