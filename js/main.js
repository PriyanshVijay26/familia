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

  // ========== Positioning Chart Lightbox ==========
  const chartImg = document.querySelector(".positioning-chart__img");
  const lightbox = document.getElementById("chartLightbox");

  if (chartImg && lightbox) {
    const lightboxBackdrop = lightbox.querySelector(".chart-lightbox__backdrop");
    const lightboxClose = lightbox.querySelector(".chart-lightbox__close");

    // Open lightbox on chart image click
    chartImg.addEventListener("click", () => {
      lightbox.classList.add("is-active");
      document.body.style.overflow = "hidden";
    });

    // Close lightbox helpers
    function closeLightbox() {
      lightbox.classList.remove("is-active");
      document.body.style.overflow = "";
    }

    lightboxBackdrop.addEventListener("click", closeLightbox);
    lightboxClose.addEventListener("click", closeLightbox);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
        closeLightbox();
      }
    });
  }

  // ========== Flow Chart Lightbox ==========
  const flowImg = document.querySelector(".flow-chart-image img");
  const flowLightbox = document.getElementById("flowLightbox");

  if (flowImg && flowLightbox) {
    const flowBackdrop = flowLightbox.querySelector(".chart-lightbox__backdrop");
    const flowClose = flowLightbox.querySelector(".chart-lightbox__close");

    flowImg.addEventListener("click", () => {
      flowLightbox.classList.add("is-active");
      document.body.style.overflow = "hidden";
    });

    function closeFlowLightbox() {
      flowLightbox.classList.remove("is-active");
      document.body.style.overflow = "";
    }

    flowBackdrop.addEventListener("click", closeFlowLightbox);
    flowClose.addEventListener("click", closeFlowLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && flowLightbox.classList.contains("is-active")) {
        closeFlowLightbox();
      }
    });
  }

  // ========== Point 01 Cylinder Lightbox ==========
  const cylinderWrapper = document.querySelector(".point01-scroll-wrapper");
  const cylinderLightbox = document.getElementById("cylinderLightbox");

  if (cylinderWrapper && cylinderLightbox) {
    const cylBackdrop = cylinderLightbox.querySelector(".cylinder-lightbox__backdrop");
    const cylClose = cylinderLightbox.querySelector(".cylinder-lightbox__close");
    const cylInner = cylinderLightbox.querySelector(".cylinder-lightbox__inner");

    // Open lightbox: clone cylinder content into overlay
    cylinderWrapper.addEventListener("click", () => {
      if (window.innerWidth > 768) return;
      cylInner.innerHTML = "";
      const clone = document.querySelector(".point01-visual").cloneNode(true);
      cylInner.appendChild(clone);
      cylinderLightbox.classList.add("is-active");
      document.body.style.overflow = "hidden";
    });

    function closeCylinderLightbox() {
      cylinderLightbox.classList.remove("is-active");
      document.body.style.overflow = "";
      cylInner.innerHTML = "";
    }

    cylBackdrop.addEventListener("click", closeCylinderLightbox);
    cylClose.addEventListener("click", closeCylinderLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && cylinderLightbox.classList.contains("is-active")) {
        closeCylinderLightbox();
      }
    });
  }

  // ========== Support Table Lightbox ==========
  const supportWrapper = document.querySelector(".support-table-wrap");
  const supportLightbox = document.getElementById("supportLightbox");

  if (supportWrapper && supportLightbox) {
    const suppBackdrop = supportLightbox.querySelector(".cylinder-lightbox__backdrop");
    const suppClose = supportLightbox.querySelector(".cylinder-lightbox__close");
    const suppInner = supportLightbox.querySelector(".cylinder-lightbox__inner");

    // Open lightbox: clone table into overlay
    supportWrapper.addEventListener("click", () => {
      if (window.innerWidth > 768) return;
      suppInner.innerHTML = "";
      const clone = document.querySelector(".support-table").cloneNode(true);
      suppInner.appendChild(clone);
      supportLightbox.classList.add("is-active");
      document.body.style.overflow = "hidden";
    });

    function closeSupportLightbox() {
      supportLightbox.classList.remove("is-active");
      document.body.style.overflow = "";
      suppInner.innerHTML = "";
    }

    suppBackdrop.addEventListener("click", closeSupportLightbox);
    suppClose.addEventListener("click", closeSupportLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && supportLightbox.classList.contains("is-active")) {
        closeSupportLightbox();
      }
    });
  }
});
