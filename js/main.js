document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > 100) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
    lastScroll = current;
  });

  const navLinks = document.querySelectorAll('.header__nav-list a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });

  const floatingCta = document.querySelector(".floating-cta");
  if (floatingCta) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        floatingCta.style.opacity = "1";
        floatingCta.style.pointerEvents = "auto";
      } else {
        floatingCta.style.opacity = "0";
        floatingCta.style.pointerEvents = "none";
      }
    });
    floatingCta.style.opacity = "0";
    floatingCta.style.pointerEvents = "none";
    floatingCta.style.transition = "all 0.3s ease";
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".hero__feature-card, .concept__image-wrapper, .concept__text").forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});
