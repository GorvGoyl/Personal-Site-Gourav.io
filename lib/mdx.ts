/**
 * if desktop view: set position of toc on scroll event
 * @return {*} AbortController
 */
export const initTocPosition = () => {
  console.log("initTocPosition");
  const controller = new AbortController();

  const tocEl: HTMLElement = document.querySelector(".page-outline");
  if (tocEl && tocEl.style) {
    const isDesktopView =
      getComputedStyle(document.querySelector(".page-outline")).position ===
      "fixed";

    if (isDesktopView) {
      let lastKnownScrollPosition = 0;
      let ticking = false;
      const adjustTocPosition = (scrollPos: number) => {
        // 210 val taken from .page-outline css: top
        tocEl.style.top = Math.max(210 - scrollPos, 12) + "px";
      };

      const handleTocOnScrollEvent = () => {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(() => {
            adjustTocPosition(lastKnownScrollPosition);
            ticking = false;
          });

          ticking = true;
        }
      };
      document.addEventListener("scroll", handleTocOnScrollEvent, {
        signal: controller.signal,
      });
    }
  }

  return controller;
};
