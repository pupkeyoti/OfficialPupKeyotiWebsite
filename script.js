document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));

const grid = document.getElementById("newsGrid");
const stories = window.PUP_KEYOTI_NEWS || [];
if (grid) {
  grid.innerHTML = stories.map(item => `
    <article class="news-card">
      <div class="news-meta"><span>${item.category || "News"}</span><span>${item.date || ""}</span></div>
      <h3>${item.headline || ""}</h3>
      <p>${item.summary || ""}</p>
      ${item.link ? `<a href="${item.link}" target="_blank" rel="noreferrer">${item.linkText || "Read more"} →</a>` : ""}
    </article>
  `).join("");
}