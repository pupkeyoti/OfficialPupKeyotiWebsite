window.PUP_KEYOTI_NEWS = [
  {
    date: "Sep 21, 2026",
    category: "Milestone",
    headline: "Pup Keyoti reaches 43+ countries worldwide",
    summary: "The Den continues expanding globally as Pup Keyoti's music reaches listeners across more than 43 countries.",
    link: "https://www.pupkeyoti.com/#top",
    linkText: "Official site"
  },
  {
    date: "Sep 21, 2026",
    category: "Audition",
    headline: "Skunk Radio Live audition continues",
    summary: "Supporters can listen, share, and follow Pup Keyoti's current Skunk Radio Live audition run.",
    link: "https://auditions.skunkradiolive.com/p/pls.html?artist=Pup%20Keyoti",
    linkText: "Support the audition"
  },
  {
    date: "Sep 21, 2026",
    category: "Music",
    headline: "Album #5 and Halloween tracks are coming",
    summary: "The next era of Pup Keyoti is already taking shape, with new music and seasonal Halloween material in development.",
    link: "https://bio.site/PupKeyoti",
    linkText: "Follow updates"
  }
];

// Add Pursision to the Den Artists roster.
(() => {
  const artistsSection = document.getElementById("artists");
  const artistGrid = artistsSection?.querySelector(".artist-grid");
  if (!artistGrid || artistGrid.querySelector('[data-den-artist="pursision"]')) return;

  const heading = artistsSection.querySelector(".section-heading h2");
  if (heading) heading.textContent = "Five artists. One creative ecosystem.";

  const intro = artistsSection.querySelector(".section-heading p:last-child");
  if (intro) intro.textContent = "Pup Keyoti, Rainbow Squittles, DJFox301, Luna Moonstone, and Pursision — available across major music platforms worldwide.";

  const card = document.createElement("a");
  card.className = "artist-link";
  card.dataset.denArtist = "pursision";
  card.href = "https://open.spotify.com/artist/2fsWyvNJiHrhIGwp2LbkbH?si=HkhkaNjdSLSFfI4nw1WhkA";
  card.target = "_blank";
  card.rel = "noreferrer";
  card.setAttribute("aria-label", "Listen to Pursision on Spotify");
  card.innerHTML = `
    <article class="artist-card">
      <div class="pursision-art" role="img" aria-label="Pursision On the Radar coming soon artwork"></div>
      <div class="card-body"><span>DEN ARTIST</span><h3>Pursision</h3><p>Independent artist in The Den ecosystem.</p><strong class="artist-cta">Listen / Follow ↗</strong></div>
    </article>`;
  artistGrid.appendChild(card);

  const style = document.createElement("style");
  style.textContent = `.pursision-art{width:100%;aspect-ratio:1/1;background-image:url('https://i.scdn.co/image/ab6761610000e5ebd6a76c2ddfdb8f514e505f3d');background-size:cover;background-position:center;background-color:#08090d}`;
  document.head.appendChild(style);
})();