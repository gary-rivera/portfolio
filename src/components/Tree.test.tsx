import { render, screen } from "@testing-library/react";
import { Tree } from "./Tree";

describe("Tree", () => {
  it("renders branch glyph (├) for non-last items", () => {
    render(
      <Tree>
        <Tree.Item>first</Tree.Item>
        <Tree.Item>middle</Tree.Item>
        <Tree.Item isLast>last</Tree.Item>
      </Tree>
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("├");
    expect(items[1]).toHaveTextContent("├");
    expect(items[2]).toHaveTextContent("└");
  });

  it("applies active styling when active prop is true", () => {
    render(
      <Tree>
        <Tree.Item active>about</Tree.Item>
      </Tree>
    );
    expect(screen.getByText("about").parentElement).toHaveClass("text-accent");
  });
});
