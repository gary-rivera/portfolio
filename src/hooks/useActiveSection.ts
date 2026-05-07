import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SECTION, isSectionId, type SectionId } from "@/app/routes";

function readHash(): SectionId {
  const raw = window.location.hash.replace(/^#/, "");
  return isSectionId(raw) ? raw : DEFAULT_SECTION;
}

export function useActiveSection() {
  const [activeSection, setActive] = useState<SectionId>(() => readHash());

  useEffect(() => {
    const onHashChange = () => setActive(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setActiveSection = useCallback((id: SectionId) => {
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    }
    setActive(id);
  }, []);

  return { activeSection, setActiveSection };
}
