"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";
import { ProjectImageModal } from "./ProjectImageModal";

export type ProjectGalleryMode = "image-gallery" | "mini-image-gallery";

export type GalleryProject = {
  id: string;
  name: string;
  logo?: string;
  snapshot?: string;
  description?: string;
  tags?: string;
};

type ProjectGalleryProps = {
  projects: GalleryProject[];
  mode?: ProjectGalleryMode;
  className?: string;
};

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dihmbrhjw/image/upload/v1792372961/mock-project_m62dal.svg";

function isUsableImageSource(source?: string): source is string {
  return Boolean(source && source.trim() && source !== "confidential");
}

function getSnapshotSource(project: GalleryProject) {
  if (isUsableImageSource(project.snapshot)) {
    return project.snapshot;
  }

  if (isUsableImageSource(project.logo)) {
    return project.logo;
  }

  return FALLBACK_IMAGE;
}

function ProjectImage({
  project,
  onOpen,
}: {
  project: GalleryProject;
  onOpen: () => void;
}) {
  const source = getSnapshotSource(project);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-square w-full overflow-hidden bg-jet/10 text-left outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View ${project.name} project snapshot`}
    >
      <Image
        src={source}
        alt={`${project.name} project snapshot`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        unoptimized={source.endsWith(".svg")}
        className="object-cover transition duration-500 ease-out group-hover:scale-105"
      />
      <span className="sr-only">{project.description}</span>
    </button>
  );
}

export function ProjectGallery({
  projects,
  mode = "image-gallery",
  className,
}: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(
    null,
  );
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(projects.length / 5));

  if (projects.length === 0) {
    return (
      <div
        role="status"
        className={`border border-dashed border-jet/20 px-6 py-10 text-center font-mono text-sm text-jet/60 ${className ?? ""}`}
      >
        No project snapshots available yet.
      </div>
    );
  }

  const isMiniGallery = mode === "mini-image-gallery";
  const visiblePage = Math.min(page, pageCount - 1);

  return (
    <>
      <div className={className}>
        {isMiniGallery ? (
          <div className="w-full overflow-hidden">
            <div
              className="grid grid-flow-col auto-cols-[20%] transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${visiblePage * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="px-1.5 first:pl-0 last:pr-0">
                  <ProjectImage
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectImage
                key={project.id}
                project={project}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}

        {isMiniGallery && pageCount > 1 ? (
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-jet/60">
            <button
              type="button"
              aria-label="Previous project snapshots"
              onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
              disabled={page === 0}
              className="rounded-full p-2 transition hover:bg-jet/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="chevronLeft" size={20} aria-hidden="true" />
            </button>
            <span aria-live="polite">
              {visiblePage + 1} / {pageCount}
            </span>
            <button
              type="button"
              aria-label="Next project snapshots"
              onClick={() =>
                setPage((currentPage) => Math.min(pageCount - 1, currentPage + 1))
              }
              disabled={visiblePage === pageCount - 1}
              className="rounded-full p-2 transition hover:bg-jet/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="chevronRight" size={20} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      {selectedProject ? (
        <ProjectImageModal
          source={getSnapshotSource(selectedProject)}
          title={selectedProject.name}
          tags={selectedProject.tags}
          isOpen
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
      {/*
        <div>
                <span aria-hidden="true" className="text-2xl leading-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden bg-black/20">
              <Image
                src={getFullResolutionSource(getSnapshotSource(selectedProject))}
                alt={`${selectedProject.name} project snapshot`}
                width={1920}
                height={1080}
                sizes="100vw"
                unoptimized
                className="max-h-[calc(100vh-8rem)] w-full object-contain"
              />
            </div>
          </div>
        </div>
      */}
    </>
  );
}
