const EMAIL = "asma.m.hattab@gmail.com";

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

const toTop = document.getElementById("toTop");
const yearEl = document.getElementById("year");

const emailBtn = document.getElementById("emailBtn");
const emailModal = document.getElementById("emailModal");
const closeModal = document.getElementById("closeModal");

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
closeModal?.addEventListener("click", hideModal);

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
window.addEventListener("scroll", onScroll);
onScroll();

