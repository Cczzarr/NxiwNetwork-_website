(function () {
  const body = document.body;
  const openNavButton = document.querySelector("[data-nav-open]");
  const closeNavButton = document.querySelector("[data-nav-close]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const navScrim = document.querySelector("[data-nav-scrim]");
  const navLinks = document.querySelectorAll(".desktop-nav a, .drawer-nav a");
  const sections = document.querySelectorAll("main section[id]");

  const openNav = () => {
    body.classList.add("nav-open");
    mobileNav?.classList.add("is-open");
    mobileNav?.setAttribute("aria-hidden", "false");
    navScrim.hidden = false;
    openNavButton?.setAttribute("aria-expanded", "true");
    closeNavButton?.focus();
  };

  const closeNav = () => {
    body.classList.remove("nav-open");
    mobileNav?.classList.remove("is-open");
    mobileNav?.setAttribute("aria-hidden", "true");
    navScrim.hidden = true;
    openNavButton?.setAttribute("aria-expanded", "false");
  };

  openNavButton?.addEventListener("click", openNav);
  closeNavButton?.addEventListener("click", closeNav);
  navScrim?.addEventListener("click", closeNav);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      closeNav();
      openNavButton?.focus();
    }
  });

  document.querySelectorAll(".drawer-nav a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveLink(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
  }
})();
