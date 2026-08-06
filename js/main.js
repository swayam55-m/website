/* ================================================================
   main.js — makes the page work.
   You shouldn't need to edit this file, but it's commented so you
   can read along and learn how each effect is done.
   ================================================================ */

/* If the visitor's OS asks for reduced motion (an accessibility
   setting), we skip the parallax + animations out of respect. */
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ----------------------------------------------------------------
   1. BUILD THE PROJECT CARDS from the PROJECTS list in data.js
   ---------------------------------------------------------------- */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");

  PROJECTS.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal tilt";
    card.style.setProperty("--stagger", index % 3); // staggered entrance

    // Card cover: the project's image, or an auto-generated cover
    // with the project's initials if no image was provided.
    const initials = project.title
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

    const cover = project.image
      ? `<img class="project-img" src="${project.image}" alt="Screenshot of ${project.title}" loading="lazy">`
      : `<div class="project-img project-img-auto" data-hue="${index}"><span>${initials}</span></div>`;

    const tags = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    const links = [
      project.github ? `<a href="${project.github}" target="_blank" rel="noopener">Code ↗</a>` : "",
      project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener">Live demo ↗</a>` : "",
    ].join("");

    card.innerHTML = `
      <div class="project-cover">${cover}</div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.blurb}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-links">${links}</div>
      </div>`;

    grid.appendChild(card);
  });

  // Give the auto-generated covers each their own blue-ish tint
  // (cycles through cyan → blue → indigo, always staying on-theme)
  document.querySelectorAll(".project-img-auto").forEach((el) => {
    const hue = 197 + (parseInt(el.dataset.hue, 10) % 3) * 13;
    el.style.background = `linear-gradient(135deg,
      hsl(${hue}, 80%, 12%) 0%,
      hsl(${hue + 20}, 85%, 24%) 60%,
      hsl(${hue + 38}, 88%, 34%) 100%)`;
  });
}


/* ----------------------------------------------------------------
   2. BUILD THE SKILLS COLUMNS from SKILLS in data.js
   ---------------------------------------------------------------- */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");

  SKILLS.forEach((skillGroup, index) => {
    const column = document.createElement("div");
    column.className = "skill-group reveal";
    column.style.setProperty("--stagger", index);

    const chips = skillGroup.items
      .map((item) => `<li class="chip">${item}</li>`)
      .join("");

    column.innerHTML = `<h3>${skillGroup.group}</h3><ul class="chip-list">${chips}</ul>`;
    grid.appendChild(column);
  });
}


/* ----------------------------------------------------------------
   3. BUILD THE INTEREST CARDS from INTERESTS in data.js
   ---------------------------------------------------------------- */
function renderInterests() {
  const grid = document.getElementById("interestsGrid");

  INTERESTS.forEach((interest, index) => {
    const card = document.createElement("div");
    card.className = "interest-card reveal";
    card.style.setProperty("--stagger", index);
    card.innerHTML = `
      <span class="interest-emoji" aria-hidden="true">${interest.emoji}</span>
      <h3>${interest.title}</h3>
      <p>${interest.blurb}</p>`;
    grid.appendChild(card);
  });
}


/* ----------------------------------------------------------------
   4. PARALLAX — the signature scroll effect.
   Every element with a data-speed attribute drifts as you scroll.
   A speed of 0.3 means "move at 30% of scrolling speed", which
   makes it feel like it's floating on a deeper layer.
   We use requestAnimationFrame so it stays silky-smooth.
   ---------------------------------------------------------------- */
function setupParallax() {
  if (REDUCED_MOTION) return;

  const heroLayers = document.querySelectorAll(".hero [data-speed]");
  const sectionWords = document.querySelectorAll(".section-word[data-speed]");
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    // Hero layers drift down (slower than the page) as you scroll away
    heroLayers.forEach((layer) => {
      layer.style.transform = `translate3d(0, ${scrollY * layer.dataset.speed}px, 0)`;
    });

    // The giant background words drift relative to the screen center
    sectionWords.forEach((word) => {
      const rect = word.parentElement.getBoundingClientRect();
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      word.style.transform = `translate3d(0, ${fromCenter * word.dataset.speed * -1.6}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
}


/* ----------------------------------------------------------------
   5. REVEAL ON SCROLL — elements with class "reveal" fade in
   the first time they enter the viewport (IntersectionObserver).
   ---------------------------------------------------------------- */
function setupReveals() {
  const revealElements = document.querySelectorAll(".reveal");

  if (REDUCED_MOTION) {
    revealElements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}


/* ----------------------------------------------------------------
   6. SCROLL PROGRESS BAR — the thin blue line at the very top
   ---------------------------------------------------------------- */
function setupProgressBar() {
  const bar = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(window.scrollY / scrollable) * 100}%`;
  }, { passive: true });
}


/* ----------------------------------------------------------------
   7. NAVIGATION — solid background once you scroll, highlight the
   section you're currently reading, and the mobile menu button.
   ---------------------------------------------------------------- */
function setupNav() {
  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");
  const links = navLinks.querySelectorAll("a");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // Mobile: hamburger opens/closes the menu
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Clicking a link closes the mobile menu
  links.forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  // Highlight the nav link for the section currently on screen
  const sections = document.querySelectorAll("section[id]");
  const highlighter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => highlighter.observe(section));
}


/* ----------------------------------------------------------------
   8. 3D TILT — project cards subtly tilt toward your cursor.
   Skipped on touch screens (no cursor to follow).
   ---------------------------------------------------------------- */
function setupTilt() {
  if (REDUCED_MOTION || !window.matchMedia("(pointer: fine)").matches) return;

  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;  // -0.5 … 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


/* ----------------------------------------------------------------
   Run everything once the page is ready
   ---------------------------------------------------------------- */
renderProjects();
renderSkills();
renderInterests();
setupParallax();
setupReveals();
setupProgressBar();
setupNav();
setupTilt();

// Keep the © year in the footer up to date automatically
document.getElementById("year").textContent = new Date().getFullYear();
