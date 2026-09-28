const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const body = document.body;
const nav = $("#nav");
const menu = $("#menu");
const theme = $("#theme");
const topBtn = $("#top");

/* Menu mobile */
menu.onclick = () => {
  nav.classList.toggle("show");
  menu.firstElementChild.className =
    nav.classList.contains("show")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
};

$$("nav a").forEach(a => a.onclick = () => nav.classList.remove("show"));

/* Dark mode */
if (localStorage.theme === "dark") body.classList.add("dark");

const themeIcon = () =>
  theme.firstElementChild.className =
    `fa-solid fa-${body.classList.contains("dark") ? "sun" : "moon"}`;

themeIcon();

theme.onclick = () => {
  body.classList.toggle("dark");
  localStorage.theme = body.classList.contains("dark") ? "dark" : "light";
  themeIcon();
};

/* Typing */
const words = [
  "SV Sư phạm Toán",
  "SV Sư phạm Tin",
  "Gia sư",
  "người yêu Marathon"
];

let word = 0, char = 0, del = false;

function type(){
  const text = words[word];
  $("#typing").textContent = text.slice(0, char);

  if(!del && char < text.length) char++;
  else if(del && char > 0) char--;
  else{
    del = !del;
    if(!del) word = (word + 1) % words.length;
  }

  setTimeout(type, del ? 55 : char === text.length ? 1200 : 90);
}
type();

/* Scroll animation */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;

    e.target.classList.add("show");

    e.target.querySelectorAll("[data-width]").forEach(bar =>
      bar.style.width = bar.dataset.width + "%"
    );
  });
},{threshold:.15});

$$(".reveal").forEach(el => observer.observe(el));

/* Header + back to top */
window.addEventListener("scroll", () => {
  $("header").classList.toggle("scroll", scrollY > 20);
  topBtn.classList.toggle("show", scrollY > 500);

  $$("section[id]").forEach(sec => {
    if(scrollY + 200 >= sec.offsetTop &&
       scrollY + 200 < sec.offsetTop + sec.offsetHeight){

      $$("nav a").forEach(a =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === "#" + sec.id
        )
      );
    }
  });
});

topBtn.onclick = () => scrollTo({top:0, behavior:"smooth"});

/* Năm tự động */
$("#year").textContent = new Date().getFullYear();