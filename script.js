// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector(".menu");
const drawer = document.querySelector(".mobile-drawer");
let open = false;

menuBtn?.addEventListener("click", () => {
  open = !open;
  drawer.style.display = open ? "flex" : "none";
  drawer.setAttribute("aria-hidden", open ? "false" : "true");
});

drawer?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    open = false;
    drawer.style.display = "none";
    drawer.setAttribute("aria-hidden", "true");
  });
});
