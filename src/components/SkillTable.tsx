'use client';

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
            ["Next.JS", "nextjs"]
        ],
    },
    {
        name: "Backend",
        skills: [
            ["Node.js", "node"],
            [".NET", "dotnet"],
            ["Express", "express"],
            ["Fastify", "fastify"],
            ["FastAPI","fastapi"],
            ["RabbitMQ", "rabbitmq"],
        ],
    },
    {
        name: "Database",
        skills: [
            ["MongoDB", "mongodb"],
            ["MySQL", "mysql"],
            ["SQLite", "sqlite"],
            ["Prisma","prisma"]
        ],
    },
    {
        name: "Infrastructure",
        skills: [
            ["Linux", "linux"],
            ["Windows", "windows"],
            ["Docker", "docker"],
            ["Azure", "azure"],
            ["Cloudflare","cloudflare"]
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
            ["Dart", "flutter"],
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
            ["Github Actions","ghactions"],
            ["Vercel","vercel"]
        ],
    },
    {
        name: "Design",
        skills: [
            ["Figma", "figma"],
            ["GIMP", "gimp"],
            ["Photoshop", "photoshop"],
            ["Snapseed", "snapseed"],
            ["Mermaid","mermaid"]
        ],
    },
    {
        name: "AI",
        skills: [
            ["Claude", "claude"],
            ["OpenAI", "openai"],
            ["Gemini", "gemini"],
            ["Qwen", "qwen"],
            ["Ollama","ollama"],
            ["Claude Code","claudecode"],
            ["Github Copilot","ghcopilot"]
        ],
    },
    {
        name: "Data Science",
        skills: [
            ["Jupyter Noteboor", "jupyter"],
            ["Pandas", "pandas"],
            ["Polars", "polars"],
            ["Numpy", "numpy"],
        ],
    },
] as const;

// const externalIcons = {
// } as const;

type SkillIconName = Exclude<(typeof skillGroups)[number]["skills"][number][1], keyof typeof externalIcons>;

function SkillIcon({ icon }: { icon: string }) {
    // if (icon in externalIcons) {
    //     const externalIcon = externalIcons[icon as keyof typeof externalIcons];
    //     return <Icon src={externalIcon.src} type={externalIcon.type} size={36} alt="" />;
    // }

    return <Icon name={icon as SkillIconName} size={36} color="currentColor" aria-hidden="true" />;
}

export function SkillTable() {
    return (
        <div className="grid w-full max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
                <Skill key={group.name} name={group.name}>
                    {group.skills.map(([name, icon]) => (
                        <span key={name} className="flex flex-col min-h-16 items-center justify-center text-platinum transition">
                            <SkillIcon icon={icon} />
                            <span className="mt-2 text-center font-mono text-[0.6rem] uppercase leading-tight tracking-[0.08em] text-platinum/80">
                                {name}
                            </span>
                        </span>
                    ))}
                </Skill>
            ))}
        </div>
    );
}
