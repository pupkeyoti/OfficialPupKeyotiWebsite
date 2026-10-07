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

// The uploaded GitHub repo stores image files at the repository root,
// while the HTML still references them under assets/. Normalize those paths.
document.querySelectorAll('img[src^="assets/"]').forEach(img => {
  const src = img.getAttribute("src");
  if (src) img.setAttribute("src", src.replace(/^assets\//, ""));
});

// Keep the Den artist name consistent everywhere on the rendered site.
const OLD_RAINBOW_NAME = "Rainbow Skittles";
const CORRECT_RAINBOW_NAME = "Rainbow Squittles";

const replaceRainbowName = (root = document.body) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue?.includes(OLD_RAINBOW_NAME)) {
      node.nodeValue = node.nodeValue.replaceAll(OLD_RAINBOW_NAME, CORRECT_RAINBOW_NAME);
    }
  }

  document.querySelectorAll("[alt], [aria-label], [title]").forEach(el => {
    ["alt", "aria-label", "title"].forEach(attr => {
      const value = el.getAttribute(attr);
      if (value?.includes(OLD_RAINBOW_NAME)) {
        el.setAttribute(attr, value.replaceAll(OLD_RAINBOW_NAME, CORRECT_RAINBOW_NAME));
      }
    });
  });
};

replaceRainbowName();

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

  replaceRainbowName(grid);
}
