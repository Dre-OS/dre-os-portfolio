'use client'
import projects from "../data/projects.json"
import { Icon } from "../components/Icon";
import ProfilePicture from "../components/ProfilePicture";
import { SkillTable } from "../components/SkillTable";
import { ProjectItem } from "@/components/ProjectItem";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Carousel from "@/components/Carousel";
import { ProjectGallery } from "@/components/ProjectGallery";

type ProjectType = "all" | "software" | "hardware" | "creatives";

function hasProjectTypeTag(tags: string, projectTypes: ProjectType[]) {
    return projectTypes.includes("all") ||
        projectTypes.some((projectType) => getProjectTags(tags).includes(projectType));
}

function getProjectTags(tags: string) {
    return tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
}

function hasAnyRequestedTag(tags: string, requestedTags: string[]) {
    const projectTags = getProjectTags(tags);
    return requestedTags.some((tag) => projectTags.includes(tag));
}

function hasAnyExcludedTag(tags: string, excludedTags: string[]) {
    const projectTags = getProjectTags(tags);
    return excludedTags.some((tag) => projectTags.includes(tag));
}

export default function Home() {
    return (
        <Suspense fallback={null}>
            <HomeContent />
        </Suspense>
    );
}

function HomeContent() {
    const searchParams = useSearchParams();
    const requestedType = searchParams.get("projectType") ?? searchParams.get("type");
    const projectTypes = (requestedType ?? "")
        .split(",")
        .map((type) => type.trim().toLowerCase())
        .filter((type): type is ProjectType =>
            type === "all" ||
            type === "software" ||
            type === "hardware" ||
            type === "creatives"
        );
    const selectedProjectTypes: ProjectType[] = projectTypes.includes("all")
        ? ["all"]
        : projectTypes.length > 0
            ? projectTypes
            : ["all"];
    const requestedTags = (searchParams.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
    const excludedTags = (searchParams.get("excludeTags") ?? "")
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);
    const visibleProjects = projects.filter((project) =>
        hasProjectTypeTag(project.tags, selectedProjectTypes) &&
        (requestedTags.length === 0 || hasAnyRequestedTag(project.tags, requestedTags)) &&
        !hasAnyExcludedTag(project.tags, excludedTags)
    );

    return (
        <>
            <main className="flex min-h-screen w-full flex-col items-center gap-16 overflow-x-hidden px-4 py-10 sm:px-6 sm:py-12">
                <div className="flex min-h-screen w-full flex-col items-center justify-center md:gap-8 gap-12 overflow-x-hidden px-4 py-8 sm:px-6">
                    <div className="flex w-full flex-col items-center gap-4">
                        <div className="flex w-full flex-col items-center gap-4">
                            <ProfilePicture />
                            <h1 className="text-center font-sans text-2xl font-semibold sm:text-4xl">Hendre Leigh O. Sagabaen</h1>
                        </div>
                        <h2 className="max-w-4xl text-center font-mono text-sm font-semibold leading-6 sm:text-xl">Software Engineer | Fullstack Web Developer | Data science, Cybersecurity & Design Enthusiast</h2>
                    </div>
                    <SkillTable />
                    <button
                        type="button"
                        className="scroll-projects-hint group mt-4 flex flex-col items-center gap-2 border-0 bg-transparent p-2 font-mono text-xs uppercase tracking-[0.2em] text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                        aria-label="Scroll down to see projects"
                    >
                        <span>Scroll down to see projects</span>
                        <Icon name="chevronDown" size="clamp(24px, 9vw, 40px)" color="currentColor" aria-hidden="true" />
                    </button>
                </div>
                <section id="projects" className="flex w-full scroll-mt-8 flex-col gap-8 pb-8 sm:gap-10 sm:pb-12">
                    <h1 className="text-center font-sans text-2xl font-semibold uppercase sm:text-4xl">
                        {selectedProjectTypes.includes("all")
                            ? "projects"
                            : `${selectedProjectTypes.join(" and ")} projects`}
                    </h1>
                    {selectedProjectTypes.includes("software") || selectedProjectTypes.includes("all") ? 
                        <>
                            <div className="pb-10">
                                <Carousel items={visibleProjects.map((project) => (
                                    <ProjectItem
                                        key={project.id}
                                        logo={project.logo}
                                        snapshot={project.snapshot}
                                        title={project.name}
                                        description={project.description}
                                        tags={project.tags}
                                    />
                                ))} autoScroll={true}/>
                            </div>
                            {/* <div className="sm:grid grid w-full md:pl-15 md:pr-15 grid-cols-1 gap-6 md:grid-cols-2">
                                {visibleProjects.map((project) => (
                                    <ProjectItem
                                        key={project.id}
                                        logo={project.logo}
                                        snapshot={project.snapshot}
                                        title={project.name}
                                        description={project.description}
                                    />
                                ))}
                            </div> */}
                        </>
                    : null}

                    {selectedProjectTypes.includes("all") || selectedProjectTypes.includes("creatives") ? 
                        <>
                            <h1 className="text-center font-sans text-2xl font-semibold uppercase sm:text-4xl">
                                {"Gallery"}
                            </h1>
                            <ProjectGallery
                                projects={projects.filter((project) =>
                                            hasProjectTypeTag(project.tags, ["creatives"]))}
                                mode="image-gallery"
                                className="md:px-25"
                            />
                        </>

                    : null}

                    <div/>
                </section>
            </main>
        </>
    );
}
