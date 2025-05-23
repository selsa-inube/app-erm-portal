import { useState, useRef } from "react";

export function useSearchInput<T>(
  filteredItems: T[],
  handleItemSelection: (item: T) => void,
) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1,
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1,
      );
    } else if (e.key === "Enter" && selectedIndex !== null) {
      handleItemSelection(filteredItems[selectedIndex]);
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  return {
    selectedIndex,
    setSelectedIndex,
    containerRef,
    handleKeyDown,
    handleMouseEnter,
  };
}
