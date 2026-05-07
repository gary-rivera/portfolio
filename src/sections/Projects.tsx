import { ProjectCatalog, projectCatalogKeys } from "@/data/projects";
import { ExternalLink, Package } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/cn";

export function Projects() {
  const items = projectCatalogKeys.map((key) => ({ key, ...ProjectCatalog[key] }));

  return (
    <div className="space-y-4">
      <div className="text-text-dim text-xs tracking-widest">// PROJECTS · {items.length} files</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {items.map((p) => {
          const [logoSrc] = p.logoConfig;
          return (
            <article
              key={p.key}
              className={cn(
                "border border-border bg-surface-1 p-4",
                "hover:border-accent-muted transition-colors"
              )}
            >
              <header className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {logoSrc && <img src={logoSrc} alt="" className="w-5 h-5 object-contain opacity-80" />}
                  <h3 className="text-accent text-sm truncate">{p.name}</h3>
                </div>
                {typeof p.totalCommits === "number" && (
                  <span className="text-text-dim text-xs tabular-nums">{p.totalCommits} commits</span>
                )}
              </header>
              {p.description && (
                <p className="text-text-muted text-xs leading-relaxed mb-3">{p.description}</p>
              )}
              {p.tags && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-3">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-text-dim text-[10px] tracking-wider">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3 text-text-muted">
                {p.links.repo && (
                  <a href={p.links.repo} target="_blank" rel="noopener" className="hover:text-accent" aria-label="repository">
                    <SiGithub size={14} />
                  </a>
                )}
                {p.links.npm && (
                  <a href={p.links.npm} target="_blank" rel="noopener" className="hover:text-accent" aria-label="npm">
                    <Package size={14} />
                  </a>
                )}
                {p.links.deployment && (
                  <a href={p.links.deployment} target="_blank" rel="noopener" className="hover:text-accent" aria-label="deployment">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
