import { useEffect } from "react";

// Adds an "in-view" class to every .reveal element once it enters the viewport.
export function useReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not(.in-view)");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
