(() => {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const sticky = document.querySelector("[data-mobile-cta]");
  const reveals = document.querySelectorAll(".reveal");

  if (!button || !nav) {
    // Continue to sticky CTA behavior even without nav controls.
  } else {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
  }

  const onScroll = () => {
    if (!sticky) {
      return;
    }

    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
    sticky.style.opacity = atBottom ? "0" : "1";
    sticky.style.pointerEvents = atBottom ? "none" : "auto";
  };

  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((item) => observer.observe(item));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
