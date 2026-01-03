const EMAIL = "asma.m.hattab@gmail.com";

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

const toTop = document.getElementById("toTop");
const yearEl = document.getElementById("year");

const emailBtn = document.getElementById("emailBtn");
const emailModal = document.getElementById("emailModal");
const emailCloseBtn = document.getElementById("closeModal");

const emailSubject = document.getElementById("emailSubject");
const emailBody = document.getElementById("emailBody");

const gmailCompose = document.getElementById("gmailCompose");
const outlookCompose = document.getElementById("outlookCompose");
const defaultCompose = document.getElementById("defaultCompose");

function enc(s) { return encodeURIComponent(s || ""); }

function updateEmailLinks(){
  const subject = emailSubject.value || "";
  const body = emailBody.value || "";

  // Gmail compose
  gmailCompose.href =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(EMAIL)}&su=${enc(subject)}&body=${enc(body)}`;

  // Outlook web compose (works for outlook.com / office.com sign-in)
  outlookCompose.href =
    `https://outlook.office.com/mail/deeplink/compose?to=${enc(EMAIL)}&subject=${enc(subject)}&body=${enc(body)}`;

  // Default mail app (mailto)
  defaultCompose.href =
    `mailto:${EMAIL}?subject=${enc(subject)}&body=${enc(body)}`;
}

// Mobile nav
navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link
nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Back to top button visibility
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) toTop.classList.add("show");
  else toTop.classList.remove("show");
});

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Year
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Modal controls
function openModal(){
  updateEmailLinks();
  emailModal.classList.add("show");
  emailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function hideModal(){
  emailModal.classList.remove("show");
  emailModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

emailBtn?.addEventListener("click", openModal);
emailCloseBtn?.addEventListener("click", hideModal);

// close when clicking overlay
emailModal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") hideModal();
});

// close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && emailModal.classList.contains("show")) hideModal();
});

// Update links when typing
[emailSubject, emailBody].forEach(el => {
  el?.addEventListener("input", updateEmailLinks);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

function onScroll() {
  let current = "";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.id;
  });

  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

/* ========= Projects data (Edit this only) ========= */
const PROJECTS = [
  {
    title: "Education & Unemployment in the U.S. States",
    category: ["powerbi"],
    badge: "Featured • Tableau",
    desc: "An analytical project exploring how education levels influence unemployment rates across U.S. counties (2015–2020), highlighting regional disparities and the impact of COVID-19.",
    tags: ["Tableau", "Data Analysis", "Education", "Public Policy"],
    links: {
      demo: "https://public.tableau.com/app/profile/asma.hattab/viz/EducationUnemploymentinU_S_/Main",
      read: "",
      code: ""
    },
    highlights: [
      "Higher education levels are consistently associated with lower unemployment rates.",
      "A strong negative correlation (−0.62) between bachelor’s degree attainment and unemployment.",
      "Rural areas experienced nearly double the unemployment of urban regions.",
      "COVID-19 sharply increased unemployment in tourism-dependent states."
    ],
    featured: true
  }
];


/* ========= Render ========= */
const grid = document.getElementById("projectsGrid");
const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const filterChips = Array.from(document.querySelectorAll("#projects .filters .chip"));
function safeLink(url) {
  return url && url.trim().length > 0;
}

function cardTemplate(p, idx) {
  const actions = [];

  if (safeLink(p.links.demo))
    actions.push(`<a class="pbtn primary" href="${p.links.demo}" target="_blank" rel="noopener">View Dashboard</a>`);
  if (safeLink(p.links.read))
    actions.push(`<a class="pbtn" href="${p.links.read}" target="_blank" rel="noopener">Read</a>`);
  if (safeLink(p.links.code))
    actions.push(`<a class="pbtn ghost" href="${p.links.code}" target="_blank" rel="noopener">Code</a>`);

  actions.push(`<button class="pbtn secondary" data-open="${idx}">Details</button>`);

  return `
    <article class="project-card" data-cats="${p.category.join(",")}">
      ${p.image ? `
        <div class="project-thumb">
          <img src="${p.image}" alt="${p.title}">
        </div>
      ` : ""}

      <div class="project-top">
        <div class="project-title">
          <h3>${p.title}</h3>
          <span class="badge">${p.badge}</span>
        </div>

        <p class="project-desc">${p.desc}</p>

        <div class="tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>

      <div class="project-actions">
        ${actions.join("")}
      </div>
    </article>
  `;
}
function renderProjects(list) {
  grid.innerHTML = list.map(cardTemplate).join("");
  wireProjectHoverGlow();
  wireDetailsButtons();
  revealOnScroll();
}

function filterProjects(cat) {
  if (cat === "all") return PROJECTS;
  return PROJECTS.filter(p => p.category.includes(cat));
}

/* ========= Modal ========= */
function openProjectModal(p) {
  modalBody.innerHTML = `
    <h3>${p.title}</h3>
    <p style="opacity:.9; line-height:1.55; margin:.2rem 0 .85rem;">${p.desc}</p>
    <div class="tags" style="margin-bottom:.85rem;">
      ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
    </div>
    <strong style="display:block; margin:.6rem 0 .35rem; opacity:.95;">What I delivered</strong>
    <ul>
      ${p.highlights.map(h => `<li>${h}</li>`).join("")}
    </ul>
    <div class="project-actions" style="margin-top:1rem; padding:0;">
      ${safeLink(p.links.demo) ? `<a class="pbtn" href="${p.links.demo}" target="_blank" rel="noopener">View Dashboard</a>` : ""}
      ${safeLink(p.links.read) ? `<a class="pbtn" href="${p.links.read}" target="_blank" rel="noopener">Read</a>` : ""}
      ${safeLink(p.links.code) ? `<a class="pbtn ghost" href="${p.links.code}" target="_blank" rel="noopener">Code</a>` : ""}
    </div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function wireDetailsButtons() {
  grid.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-open"));
      openProjectModal(PROJECTS[idx]);
    });
  });
}

modal?.addEventListener("click", (e) => {
  if (e.target.matches("[data-close]")) closeProjectModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeProjectModal();
});

/* ========= Filters ========= */
filterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    filterChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const cat = chip.getAttribute("data-filter");
    renderProjects(filterProjects(cat));
  });
});

/* ========= Micro-interactions ========= */
function wireProjectHoverGlow() {
  grid.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    });
  });
}

/* Reveal animation on scroll */
function revealOnScroll() {
  const cards = grid.querySelectorAll(".project-card");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("reveal");
    });
  }, { threshold: 0.15 });
  cards.forEach(c => io.observe(c));
}

/* Init */
renderProjects(PROJECTS);

window.addEventListener("scroll", onScroll);
onScroll();

