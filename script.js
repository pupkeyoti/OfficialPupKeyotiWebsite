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

// Remove Fluff Fur 30 from the Den Pack team lineup while leaving all other roles unchanged.
document.querySelectorAll("#leadership .tree-card h3").forEach(name => {
  if (name.textContent.trim() === "Fluff Fur 30") {
    name.closest(".tree-card")?.remove();
  }
});

// Shared styling for the SRL milestone and Project KPUP sections.
const projectStyles = document.createElement("style");
projectStyles.textContent = `
  .srl-stage-card{position:relative;overflow:hidden;border:1px solid rgba(40,217,255,.3);border-radius:24px;padding:32px;background:radial-gradient(circle at 90% 15%,rgba(255,60,207,.17),transparent 34%),linear-gradient(135deg,rgba(40,217,255,.08),rgba(139,92,255,.09));box-shadow:0 22px 60px rgba(0,0,0,.28)}
  .srl-stage-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:28px;align-items:center}.srl-stage-card h2{font-size:clamp(2.2rem,5vw,4rem);line-height:.95;letter-spacing:-.045em;margin:8px 0 14px}.srl-stage-card h2 span{background:linear-gradient(90deg,#28d9ff,#a982ff,#ff3ccf);-webkit-background-clip:text;background-clip:text;color:transparent}.srl-stage-card p{color:#c4c9d8;max-width:760px}.star-panel{display:grid;place-items:center;min-height:220px;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:rgba(5,6,11,.44);text-align:center;padding:22px}.star-row{font-size:2.35rem;letter-spacing:.18em;line-height:1}.star-panel strong{display:block;margin-top:10px;font-size:1.25rem}.star-panel small{display:block;color:#a9afc2;margin-top:5px}
  .kpup-section{position:relative}.kpup-hero{border:1px solid rgba(139,92,255,.3);border-radius:26px;padding:34px;background:radial-gradient(circle at 90% 8%,rgba(40,217,255,.12),transparent 32%),radial-gradient(circle at 10% 90%,rgba(255,60,207,.1),transparent 36%),rgba(255,255,255,.022)}.kpup-title{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap}.kpup-title h2{font-size:clamp(2.5rem,6vw,5rem);line-height:.9;letter-spacing:-.055em;margin:8px 0}.kpup-title h2 span{display:block;font-size:.38em;letter-spacing:.02em;color:#c9cfdf;margin-top:12px}.kpup-status{padding:10px 14px;border:1px solid rgba(40,217,255,.3);border-radius:999px;color:#9fefff;background:rgba(40,217,255,.06);font-weight:850;font-size:.82rem;white-space:nowrap}.kpup-copy{color:#c4c9d8;max-width:920px}.kpup-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.kpup-subsection{margin-top:34px}.kpup-subsection h3{font-size:1.55rem;margin:0 0 10px}.kpup-subsection p,.kpup-subsection li{color:#aeb5c8}.kpup-use-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:18px 0 0;padding:0;list-style:none}.kpup-use-list li{padding:13px 15px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.025)}
  .kpup-roadmap{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}.kpup-step{padding:20px;border:1px solid rgba(255,255,255,.09);border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.038),rgba(255,255,255,.018))}.kpup-step.current{border-color:rgba(40,217,255,.4);box-shadow:0 0 34px rgba(40,217,255,.08)}.kpup-step .num{display:inline-block;color:#28d9ff;font-size:.76rem;font-weight:900;letter-spacing:.15em}.kpup-step h4{font-size:1.15rem;margin:6px 0 2px}.kpup-step em{color:#c9b9ff;font-size:.82rem}.kpup-step p{margin:10px 0}.kpup-step strong{display:block;color:#eef1fb;font-size:.9rem}.kpup-callout{margin-top:26px;padding:22px;border-radius:18px;border:1px solid rgba(244,201,109,.22);background:rgba(244,201,109,.045)}.kpup-callout h3{margin-top:0}.kpup-disclaimer{margin-top:28px;padding:18px;border-left:3px solid #8b5cff;background:rgba(139,92,255,.055);color:#9da5bb;font-size:.84rem;border-radius:0 12px 12px 0}.kpup-signoff{text-align:center;font-weight:900;letter-spacing:.04em;margin-top:28px;color:#f3f5ff}
  @media(max-width:820px){.srl-stage-grid,.kpup-roadmap,.kpup-use-list{grid-template-columns:1fr}.star-panel{min-height:170px}.kpup-hero{padding:24px}}
`;
document.head.appendChild(projectStyles);

// Add Project KPUP to the main navigation.
if (nav && !nav.querySelector('a[href="#kpup"]')) {
  const link = document.createElement("a");
  link.href = "#kpup";
  link.textContent = "KPUP";
  const newsLink = nav.querySelector('a[href="#news"]');
  if (newsLink) newsLink.insertAdjacentElement("afterend", link);
  else nav.appendChild(link);
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
}

// Skunk Radio Live Stage 3 / two-star milestone.
const newsSection = document.getElementById("news");
if (newsSection && !document.getElementById("srl-stage-three")) {
  const stageSection = document.createElement("section");
  stageSection.id = "srl-stage-three";
  stageSection.className = "section-shell section-block";
  stageSection.innerHTML = `
    <div class="srl-stage-card">
      <div class="srl-stage-grid">
        <div>
          <p class="eyebrow">SKUNK RADIO LIVE AUDITIONS</p>
          <h2>STAGE THREE.<br><span>TWO STARS EARNED.</span></h2>
          <p>Pup Keyoti has officially reached Stage 3 of the Skunk Radio Live auditions with two stars. The next target is star number three — and The Pack can help make it happen.</p>
          <p>Visit the official Pup Keyoti artist page and cast your support for the next stage of the audition.</p>
          <div class="kpup-actions">
            <a class="btn primary" href="https://skunkradiolive.com/artist-page.php?artist=Pup%20Keyoti&id=4654d1473ecdd9fa" target="_blank" rel="noreferrer">Vote for Pup Keyoti ↗</a>
          </div>
        </div>
        <div class="star-panel" aria-label="Stage 3 audition progress: two stars">
          <div>
            <div class="star-row" aria-hidden="true">★ ★ ☆</div>
            <strong>2 STARS • STAGE 3</strong>
            <small>Help push Pup Keyoti toward the third star.</small>
          </div>
        </div>
      </div>
    </div>`;
  newsSection.parentNode.insertBefore(stageSection, newsSection);
}

// Project KPUP — concept-stage ecosystem project.
const contactSection = document.getElementById("contact");
if (contactSection && !document.getElementById("kpup")) {
  const kpup = document.createElement("section");
  kpup.id = "kpup";
  kpup.className = "section-shell section-block kpup-section";
  kpup.innerHTML = `
    <div class="kpup-hero">
      <div class="kpup-title">
        <div>
          <p class="eyebrow">THE DEN • FUTURE ECOSYSTEM PROJECT</p>
          <h2>PROJECT KPUP<span>One Pack. A Shared Future.</span></h2>
        </div>
        <div class="kpup-status">CURRENT STAGE: CONCEPT &amp; PLANNING</div>
      </div>

      <p class="kpup-copy">The Den began with a vision of bringing people together through Fortnite streams, music, creativity, and community. Project KPUP is our next idea: developing The Den’s first crypto token, with meaningful uses across our growing ecosystem.</p>
      <p class="kpup-copy">We’re starting from the ground up — and inviting our community to help shape what comes next.</p>

      <div class="kpup-actions">
        <a class="btn primary" href="https://discord.gg/9MyRPgbxvB" target="_blank" rel="noreferrer">Follow the Journey ↗</a>
        <a class="btn secondary" href="https://www.pupkeyoti.com/" target="_blank" rel="noreferrer">Investor &amp; Partner Interest ↗</a>
      </div>

      <div class="kpup-subsection">
        <p class="eyebrow">THE VISION</p>
        <h3>A shared digital token for The Den ecosystem.</h3>
        <p>KPUP is being designed to connect The Den’s supporters, artists, and creators through a shared digital token. Our goal is to develop an experience that feels approachable, including for community members who have never used cryptocurrency before.</p>
        <ul class="kpup-use-list">
          <li>Access to selected digital content and creator experiences.</li>
          <li>Redemption for participating Den perks and benefits.</li>
          <li>Community participation rewards.</li>
          <li>Integrations with future Den projects.</li>
        </ul>
        <p>The first features will be selected through community feedback, feasibility research, and testing. Confirmed benefits will be published before launch.</p>
      </div>

      <div class="kpup-subsection">
        <p class="eyebrow">OUR ROADMAP</p>
        <div class="kpup-roadmap">
          <article class="kpup-step current"><span class="num">01 — CURRENT FOCUS</span><h4>Establish the Foundation</h4><em>Current focus</em><p>Define KPUP’s mission, gather community feedback, identify its first practical use within The Den, and establish project ownership, an initial budget, and the business and legal groundwork.</p><strong>Milestone: A clear project brief and an achievable first use.</strong></article>
          <article class="kpup-step"><span class="num">02 — PLANNED</span><h4>Design the KPUP Economy</h4><em>Planned</em><p>Develop the proposed token supply, distribution, treasury structure, and team allocation. Establish release schedules and explain how tokens would enter circulation.</p><strong>Milestone: A transparent token design available for community review.</strong></article>
          <article class="kpup-step"><span class="num">03 — PLANNED</span><h4>Connect with Investors &amp; Strategic Partners</h4><em>Planned</em><p>Prepare the KPUP pitch, establish funding needs, and begin conversations with potential investors and partners who understand The Den’s vision. Funding priorities include development, legal review, independent security review, and ongoing operations.</p><strong>Milestone: A defined funding plan and potential collaborators.</strong></article>
          <article class="kpup-step"><span class="num">04 — PLANNED</span><h4>Build the Prototype</h4><em>Planned</em><p>Choose a suitable blockchain and develop a test version of KPUP. Create a dedicated website experience where testers can connect a wallet, view test tokens, and try the first planned benefit.</p><strong>Milestone: A working demonstration on a test network.</strong></article>
          <article class="kpup-step"><span class="num">05 — PLANNED</span><h4>Test with The Pack</h4><em>Planned</em><p>Invite a small group of community members to try the experience, share feedback, and help identify improvements. Use the results to refine the product and demonstrate progress to prospective investors.</p><strong>Milestone: A tested experience with major issues resolved.</strong></article>
          <article class="kpup-step"><span class="num">06 — PLANNED</span><h4>Prepare for Launch</h4><em>Planned</em><p>Complete independent security review, establish treasury safeguards, publish official token details, administrative permissions, and participation terms, and confirm payment and verification arrangements before enabling purchases.</p><strong>Milestone: A reviewed launch plan with clear public documentation.</strong></article>
          <article class="kpup-step"><span class="num">07 — FUTURE</span><h4>Introduce KPUP to The Den</h4><em>Future milestone</em><p>Launch in stages with an initial usable benefit, clear onboarding guidance, and community support. Publish the official token contract address and any approved purchase or distribution options.</p><strong>Milestone: KPUP is live and usable within its first Den experience.</strong></article>
          <article class="kpup-step"><span class="num">08 — ONGOING</span><h4>Expand Together</h4><em>Ongoing after launch</em><p>Use community feedback and actual participation to guide new benefits, artist collaborations, and ecosystem integrations. Share progress, challenges, and priorities as the project develops.</p><strong>Milestone: Sustainable growth supported by real community use.</strong></article>
        </div>
      </div>

      <div class="kpup-callout">
        <p class="eyebrow">SMALL PURCHASES. SIMPLE PARTICIPATION.</p>
        <h3>Exploring accessible participation.</h3>
        <p>One experience we want to explore is letting eligible supporters purchase a small amount of KPUP directly through our website. Our ambition includes purchases as low as <strong>$1</strong>, subject to payment-provider support, fees, and applicable requirements.</p>
        <p>Minimum purchase amounts, verification steps, supported locations, and token pricing remain under evaluation.</p>
      </div>

      <div class="kpup-subsection">
        <p class="eyebrow">HELP BUILD WHAT COMES NEXT</p>
        <h3>Investors, developers, creators, and strategic partners.</h3>
        <p>We welcome expressions of interest from potential investors, developers, creators, and strategic partners. As the project develops, we aim to share a clear proposal outlining what we are building, the resources required, and how funding would support each milestone.</p>
        <div class="kpup-actions">
          <a class="btn primary" href="https://www.pupkeyoti.com/" target="_blank" rel="noreferrer">Register Investor or Partner Interest ↗</a>
          <a class="btn secondary" href="https://discord.gg/9MyRPgbxvB" target="_blank" rel="noreferrer">Get Project Updates ↗</a>
          <a class="btn secondary" href="https://www.pupkeyoti.com/" target="_blank" rel="noreferrer">Join The Den ↗</a>
        </div>
        <p><small>Submitting interest does not commit you to participating. No investment terms are being offered on this page.</small></p>
      </div>

      <p class="kpup-signoff">Built with purpose. Shaped by The Pack.</p>
      <div class="kpup-disclaimer"><strong>Project status notice:</strong> KPUP is currently a concept-stage project. No token sale is open, and no launch date has been announced. Features, funding, and availability depend on research, review, and testing. This roadmap describes our intentions and may change; it does not promise financial returns, token value, or exchange listings.</div>
    </div>`;
  contactSection.parentNode.insertBefore(kpup, contactSection);
}

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
