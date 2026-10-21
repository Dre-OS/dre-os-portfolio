'use client';

import { useState, type ReactNode } from "react";

type SkillProps = {
    name: string;
    children: ReactNode;
    defaultActive?: boolean;
};

export function Skill({ name, children, defaultActive = false }: SkillProps) {
    const [isActive, setIsActive] = useState(defaultActive);

    return (
        <button
            type="button"
            className={`group flex min-h-20 min-w-20 flex-col items-center justify-center gap-2 border p-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-jet ${
                isActive
                    ? "border-dark-cyan bg-dark-cyan text-jet"
                    : "border-platinum/20 text-platinum hover:border-dark-cyan/70 hover:bg-platinum/10"
            }`}
            aria-pressed={isActive}
            aria-label={`${name}${isActive ? " selected" : ""}`}
            onClick={() => setIsActive((active) => !active)}
        >
            <span className="flex h-10 items-center justify-center transition-transform group-hover:scale-110">
                {children}
            </span>
            <span>{name}</span>
        </button>
    );
}
