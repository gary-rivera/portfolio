import { render, screen, act } from "@testing-library/react";
import { TypingText } from "./TypingText";

describe("TypingText", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("types out the text one character at a time", () => {
    render(<TypingText text="hi" charDelayMs={50} startDelayMs={0} />);
    expect(screen.getByTestId("typing-text").textContent).toBe("");
    act(() => { vi.advanceTimersByTime(50); });
    expect(screen.getByTestId("typing-text").textContent).toBe("h");
    act(() => { vi.advanceTimersByTime(50); });
    expect(screen.getByTestId("typing-text").textContent).toBe("hi");
  });

  it("calls onComplete when done", () => {
    const onComplete = vi.fn();
    render(<TypingText text="ok" charDelayMs={20} startDelayMs={0} onComplete={onComplete} />);
    act(() => { vi.advanceTimersByTime(60); });
    expect(onComplete).toHaveBeenCalledOnce();
  });
});
