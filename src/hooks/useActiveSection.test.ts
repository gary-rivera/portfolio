import { renderHook, act } from "@testing-library/react";
import { useActiveSection } from "./useActiveSection";

describe("useActiveSection", () => {
  beforeEach(() => { window.location.hash = ""; });

  it("defaults to 'about' when hash is empty", () => {
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeSection).toBe("about");
  });

  it("reads section from URL hash on mount", () => {
    window.location.hash = "#experience";
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeSection).toBe("experience");
  });

  it("ignores unknown hash values and defaults to 'about'", () => {
    window.location.hash = "#nonsense";
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeSection).toBe("about");
  });

  it("setActiveSection updates state and writes hash", () => {
    const { result } = renderHook(() => useActiveSection());
    act(() => { result.current.setActiveSection("projects"); });
    expect(result.current.activeSection).toBe("projects");
    expect(window.location.hash).toBe("#projects");
  });
});
