'use client';

import { useState, type ReactNode } from "react";
import { Icon } from "./Icon";

type SkillProps = {
    name: string;
    children: ReactNode;
    defaultOpen?: boolean;
};

export function Skill({ name, children, defaultOpen = false }: SkillProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentId = `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
        <section className="border border-jet/20 bg-jet text-platinum">
            <button
                type="button"
                className="flex w-full items-center justify-between gap-3 p-4 text-left font-mono text-xs uppercase tracking-[0.16em] text-platinum transition hover:bg-platinum/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-cyan focus-visible:ring-inset"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setIsOpen((open) => !open)}
            >
                <span>{name}</span>
                <Icon
                    name="chevronDown"
                    size={18}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                />
            </button>
            <div id={contentId} hidden={isOpen} className="grid grid-cols-4 gap-2 border-t border-platinum/15 p-3 sm:grid-cols-5">
                {children}
            </div>
        </section>
    );
}
