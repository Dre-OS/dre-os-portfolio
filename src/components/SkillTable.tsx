'use client';

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { Skill } from "./Skill";

const skillGroups = [
    {
        name: "Frontend",
        skills: [
            ["React", "react"],
            ["Tailwind", "tailwind"],
            ["Material UI", "mui"],
            ["WordPress", "wordpress"],
        ],
    },
    {
        name: "Backend",
        skills: [
            ["Node.js", "node"],
            [".NET", "dotnet"],
            ["RabbitMQ", "rabbitmq"],
        ],
    },
    {
        name: "Infrastructure",
        skills: [
            ["MongoDB", "mongodb"],
            ["MySQL", "mysql"],
            ["SQLite", "sqlite"],
        ],
    },
    {
        name: "Programming languages",
        skills: [
            ["JavaScript", "javascript"],
            ["TypeScript", "typescript"],
            ["C#", "csharp"],
            ["Python", "python"],
            ["Java", "java"],
            ["Dart / Flutter", "flutter"],
            ["Visual Basic", "visualbasic"],
        ],
    },
    {
        name: "DevOps & tools",
        skills: [
            ["Git", "git"],
            ["GitHub", "github"],
            ["Docker", "docker"],
            ["Azure", "azure"],
        ],
    },
    {
        name: "Design & AI",
        skills: [
            ["Figma", "figma"],
            ["GIMP", "gimp"],
            ["Photoshop", "photoshop"],
            ["Snapseed", "snapseed"],
            ["Claude", "claude"],
            ["ChatGPT", "chatgpt"],
            ["Gemini", "gemini"],
            ["Qwen", "qwen"],
        ],
    },
] as const;

const externalIcons = {
    gimp: { src: "https://res.cloudinary.com/dihmbrhjw/image/upload/v1792370235/gimp-logo_nfa7ya.svg", type: "svg" },
    photoshop: { src: "https://res.cloudinary.com/dihmbrhjw/image/upload/v1792370247/photoshop-logo_hbxfil.svg", type: "svg" },
    snapseed: { src: "https://res.cloudinary.com/dihmbrhjw/image/upload/v1792370862/snapseed-logo_w2udcd.svg", type: "svg" },
    claude: { src: "https://svgstack.com/media/img/white-claude-logo-gGPZ382926.webp", type: "webp" },
    chatgpt: { src: "https://svgstack.com/media/img/white-chatgpt-logo-SSnJ382924.webp", type: "webp" },
    gemini: { src: "https://svgstack.com/media/img/white-gemini-logo-qb7c386067.webp", type: "webp" },
    qwen: { src: "https://svgstack.com/media/img/white-qwenlm-logo-OpFe555230.webp", type: "webp" },
} as const;

type SkillIconName = Exclude<(typeof skillGroups)[number]["skills"][number][1], keyof typeof externalIcons>;

function SkillIcon({ icon }: { icon: string }) {
    if (icon in externalIcons) {
        const externalIcon = externalIcons[icon as keyof typeof externalIcons];
        return <Icon src={externalIcon.src} type={externalIcon.type} size={36} alt="" />;
    }

    return <Icon name={icon as SkillIconName} size={36} color="currentColor" aria-hidden="true" />;
}

export function SkillTable() {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();

    return (
        <section className="w-full max-w-5xl">
            <button
                type="button"
                className="mx-auto flex items-center gap-3 border-b border-dark-cyan px-2 pb-2 font-mono text-sm uppercase tracking-[0.2em] text-current transition hover:text-dark-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setIsOpen((open) => !open)}
            >
                <span>Skills</span>
                <Icon name="chevronDown" size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            <div id={panelId} hidden={!isOpen} className="mt-4 border border-jet/20 bg-jet p-4 text-platinum sm:p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group) => (
                        <section key={group.name} aria-labelledby={`${panelId}-${group.name}`}>
                            <h3 id={`${panelId}-${group.name}`} className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-dark-cyan">
                                {group.name}
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {group.skills.map(([name, icon]) => (
                                    <Skill key={name} name={name}>
                                        <SkillIcon icon={icon} />
                                    </Skill>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
