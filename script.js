/* ===================== Scuderia Bambini — Script ===================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 0. Echtes Logo verwenden, sobald assets/logo.* existiert ---------- */
  (function realLogo() {
    const candidates = ["assets/logo.png", "assets/logo.svg", "assets/logo.jpg", "assets/logo.webp"];
    function tryNext(i) {
      if (i >= candidates.length) return; // kein File -> SVG-Platzhalter bleibt
      const probe = new Image();
      probe.onload = () => {
        document.querySelectorAll("[data-logo]").forEach((slot) => {
          const img = document.createElement("img");
          img.src = candidates[i];
          img.alt = "Scuderia Bambini";
          img.className = slot.getAttribute("class") || "";
          slot.replaceWith(img);
        });
      };
      probe.onerror = () => tryNext(i + 1);
      probe.src = candidates[i] + "?v=" + Date.now();
    }
    tryNext(0);
  })();

  /* ---------- 1. Karo-Band im Wappen erzeugen ---------- */
  (function buildCrestChecker() {
    const g = document.getElementById("crest-checker");
    if (!g) return;
    const x0 = 26, y0 = 92, w = 148, h = 44, cols = 12, rows = 4;
    const cw = w / cols, ch = h / rows;
    let s = "";
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if ((r + c) % 2 === 0)
          s += `<rect x="${(x0 + c * cw).toFixed(2)}" y="${(y0 + r * ch).toFixed(2)}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="#F7F7F2"/>`;
    g.innerHTML = s;
  })();

  /* ---------- 2. Startampel (rot -> grün) ---------- */
  (function lights() {
    const reds = [...document.querySelectorAll(".light--red")];
    const greens = [...document.querySelectorAll(".light--green")];
    const label = document.getElementById("lightsLabel");
    if (!reds.length) return;
    const clear = () => [...reds, ...greens].forEach((l) => l.classList.remove("on"));

    if (reduce) { greens.forEach((l) => l.classList.add("on")); if (label) label.textContent = "GO!"; return; }

    function run() {
      clear();
      if (label) label.textContent = "Achtung …";
      reds.forEach((l, i) => setTimeout(() => l.classList.add("on"), 500 + i * 550));
      setTimeout(() => {
        reds.forEach((l) => l.classList.remove("on"));
        greens.forEach((l) => l.classList.add("on"));
        if (label) label.textContent = "GO!  🟢";
      }, 500 + reds.length * 550 + 500);
      setTimeout(run, 500 + reds.length * 550 + 500 + 3000);
    }
    run();
  })();

  /* ---------- 3. Sticky-Navigation ---------- */
  (function nav() {
    const el = document.getElementById("nav");
    const onScroll = () => el.classList.toggle("is-stuck", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  })();

  /* ---------- 4. Kontaktformular (Prototyp) ---------- */
  (function form() {
    const f = document.getElementById("contactForm");
    const note = document.getElementById("formNote");
    if (!f) return;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      note.textContent = "Danke! 🏁 (Im Prototyp wird noch nichts verschickt — Backend folgt in Phase 3.)";
      note.classList.add("ok");
      f.reset();
    });
  })();

  /* ---------- 5. Strecke + Auto-Animation (GSAP) ---------- */
  function catmullRomPath(pts) {
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} `;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
    }
    return d;
  }

  function start() {
    const hasGSAP = window.gsap && window.ScrollTrigger && window.MotionPathPlugin;
    if (hasGSAP) gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const track = document.getElementById("track");
    const road = document.getElementById("road");
    const car = document.getElementById("car");
    if (!track || !road || !car) return;

    let tween = null;

    function build() {
      const W = track.clientWidth;
      const H = track.offsetHeight;
      const cx = W / 2;
      const amp = Math.min(W * 0.27, 360);
      const segs = 14;
      const pts = [];
      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        pts.push({ x: cx + amp * Math.sin(t * Math.PI * 5), y: t * H });
      }
      const d = catmullRomPath(pts);
      const rw = Math.max(90, Math.min(W * 0.12, 150));

      road.setAttribute("viewBox", `0 0 ${W} ${H}`);
      road.innerHTML =
        `<path d="${d}" fill="none" stroke="#C7A24C" stroke-width="${rw + 16}" stroke-linecap="round" stroke-linejoin="round" opacity="0.18"/>` +
        `<path d="${d}" fill="none" stroke="#C7A24C" stroke-width="${rw + 6}" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>` +
        `<path id="racePath" d="${d}" fill="none" stroke="#222a3d" stroke-width="${rw}" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path d="${d}" fill="none" stroke="#0b0d15" stroke-width="${rw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>` +
        `<path d="${d}" fill="none" stroke="#E4C266" stroke-width="4" stroke-linecap="round" stroke-dasharray="34 30" opacity="0.85"/>`;

      if (!hasGSAP) {
        // Fallback: Auto an den Anfang der Strecke setzen
        car.style.left = (pts[0].x - 60) + "px";
        car.style.top = "0px";
        return;
      }
      if (tween) tween.scrollTrigger && tween.scrollTrigger.kill(), tween.kill();
      gsap.set(car, { xPercent: 0, yPercent: 0 });
      tween = gsap.to(car, {
        motionPath: { path: "#racePath", align: "#racePath", alignOrigin: [0.5, 0.5], autoRotate: true },
        ease: "none",
        immediateRender: true,
        scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 1 },
      });
    }

    build();
    if (hasGSAP) ScrollTrigger.refresh();

    let to;
    window.addEventListener("resize", () => {
      clearTimeout(to);
      to = setTimeout(() => { build(); if (hasGSAP) ScrollTrigger.refresh(); }, 200);
    });
  }

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
