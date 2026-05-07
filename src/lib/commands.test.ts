import { buildCommands } from "./commands";

describe("buildCommands", () => {
  const ctx = {
    setActiveSection: vi.fn(),
    openResume: vi.fn(),
    openExternal: vi.fn(),
    clearInput: vi.fn(),
  };
  beforeEach(() => Object.values(ctx).forEach((fn) => fn.mockReset?.()));

  it("includes navigate commands for every section", () => {
    const cmds = buildCommands(ctx);
    const navIds = cmds.filter((c) => c.group === "navigate").map((c) => c.id);
    expect(navIds).toEqual(expect.arrayContaining(["about", "experience", "projects", "contact"]));
  });

  it("running 'projects' sets active section to projects", () => {
    const cmds = buildCommands(ctx);
    cmds.find((c) => c.id === "projects")!.run();
    expect(ctx.setActiveSection).toHaveBeenCalledWith("projects");
  });

  it("running 'resume' opens the resume dialog", () => {
    const cmds = buildCommands(ctx);
    cmds.find((c) => c.id === "resume")!.run();
    expect(ctx.openResume).toHaveBeenCalled();
  });

  it("includes a 'view <project>' command per project", () => {
    const cmds = buildCommands(ctx);
    const viewCmds = cmds.filter((c) => c.id.startsWith("view-"));
    expect(viewCmds.length).toBeGreaterThan(0);
  });

  it("includes a download-resume action command", () => {
    const cmds = buildCommands(ctx);
    expect(cmds.find((c) => c.id === "download-resume")).toBeDefined();
  });
});
