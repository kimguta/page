/**
 * Lenis 부드러운 스크롤
 * 사용하지 않을 프로젝트는 HTML에서 lenis.js와 이 파일을 함께 제거합니다.
 */
(function (window) {
  "use strict";

  window.DQTemplate.use("smooth-scroll", function (DQ) {
    if (typeof window.Lenis !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var lenis = new window.Lenis({
      duration: 1.1,
      smoothWheel: true
    });
    var frameId = 0;

    function frame(time) {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(frame);
    }

    frameId = window.requestAnimationFrame(frame);
    DQ.smoothScroll = lenis;

    window.addEventListener("pagehide", function () {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      DQ.smoothScroll = null;
    }, { once: true });
  });
}(window));
