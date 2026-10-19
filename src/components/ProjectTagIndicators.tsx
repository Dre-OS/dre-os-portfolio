type ProjectTagIndicatorsProps = {
  tags?: string;
  tone?: "overlay" | "modal";
};

function getVisibleTags(tags?: string) {
  return (tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function ProjectTagIndicators({
  tags,
  tone = "overlay",
}: ProjectTagIndicatorsProps) {
  const visibleTags = getVisibleTags(tags);

  if (visibleTags.length === 0) return null;

  const toneClasses =
    tone === "modal"
      ? "border-platinum/40 bg-platinum/10 text-platinum"
      : "border-white/45 bg-jet/35 text-white";

  return (
    <ul
      aria-label="Project tags"
      className="flex flex-wrap gap-2"
    >
      {visibleTags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] ${toneClasses}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
