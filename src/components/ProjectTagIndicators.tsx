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
      className="flex flex-wrap gap-1.5 sm:gap-2"
    >
      {visibleTags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full border px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.06em] sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.08em] ${toneClasses}`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
