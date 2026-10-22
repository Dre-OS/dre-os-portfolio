import * as Devicon from "@devicon/react";
import * as fi from "react-icons/fi";
import * as si from "react-icons/si";
import * as bs from "react-icons/bs";
import * as di from "react-icons/di";
import * as tb from "react-icons/tb";
import type { ComponentType, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGElement>, "ref"> & {
  size?: string | number;
  color?: string;
};

export type IconComponent = ComponentType<IconProps>;
export type IconFileType = "svg" | "webp" | "png";

export type SvgIconDefinition = {
  viewBox: string;
  paths: readonly string[];
};

export function createSvgIcon({ viewBox, paths }: SvgIconDefinition): IconComponent {
  return function SvgIcon({ size = 24, color = "currentColor", ...props }) {
    return (
      <svg
        {...props}
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        color={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
    );
  };
}

const iconRegistry = {
  javascript: Devicon.JavascriptPlainIcon,
  typescript: Devicon.TypescriptPlainIcon,
  csharp: Devicon.CsharpPlainIcon,
  visualbasic: Devicon.VisualbasicPlainIcon,
  java: Devicon.JavaPlainIcon,
  flutter: Devicon.FlutterPlainIcon,
  python: Devicon.PythonPlainIcon,
  github: Devicon.GithubOriginalIcon,
  git: Devicon.GitPlainIcon,
  react: Devicon.ReactOriginalIcon,
  node: Devicon.NodejsPlainIcon,
  docker: Devicon.DockerPlainIcon,
  azure: Devicon.AzurePlainIcon,
  linux: Devicon.LinuxPlainIcon,
  windows: Devicon.Windows8OriginalIcon,
  mermaid: si.SiMermaid,
  rabbitmq: Devicon.RabbitmqOriginalIcon,
  mongodb: Devicon.MongodbPlainIcon,
  mysql: Devicon.MysqlOriginalIcon,
  sqlite: Devicon.SqlitePlainIcon,
  dotnet: Devicon.DotNetPlainIcon,
  tailwind: Devicon.TailwindcssOriginalIcon,
  wordpress: Devicon.WordpressPlainIcon,
  nextjs:si.SiNextdotjs,
  express:si.SiExpress,
  fastify:si.SiFastify,
  fastapi:si.SiFastapi,
  prisma:si.SiPrisma,
  ghcopilot:si.SiGithubcopilot,
  ghactions:si.SiGithubactions,
  vercel:si.SiVercel,
  mui:Devicon.MaterialuiPlainIcon,
  figma:Devicon.FigmaPlainIcon,
  gimp:si.SiGimp,
  photoshop:di.DiPhotoshop,
  snapseed:tb.TbBrandSnapseed,
  ollama:si.SiOllama,
  openai:bs.BsOpenai,
  claude:bs.BsClaude,
  gemini:si.SiGooglegemini,
  qwen:si.SiQwen,
  claudecode:si.SiClaudecode,
  cloudflare:si.SiCloudflare,
  jupyter:Devicon.JupyterPlainIcon,
  polars:si.SiPolars,
  pandas:si.SiPandas,
  numpy:si.SiNumpy,
  chevronLeft: fi.FiChevronLeft,
  chevronRight: fi.FiChevronRight,
  chevronDown: fi.FiChevronDown
} satisfies Record<string, IconComponent>;

export type IconName = keyof typeof iconRegistry;

type IconRendererProps = IconProps & {
  name?: IconName;
  component?: IconComponent;
  src?: string;
  alt?: string;
  type?: IconFileType;
};

export function Icon({
  name,
  component,
  src,
  alt = "",
  type = "svg",
  size = 24,
  className,
  style,
  ...props
}: IconRendererProps) {
  if (src) {
    return (
      <object
        data={src}
        type={`image/${type}`}
        className={className}
        style={{ ...style, width: size, height: size }}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        {alt}
      </object>
    );
  }

  const IconComponent = component ?? (name ? iconRegistry[name] : undefined);

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} size={size} className={className} style={style} />;
}
