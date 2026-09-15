(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     Data
     ------------------------------------------------------------------------ */

  const MODES = {
    educacion: { label: "Educación", color: "var(--mint)" },
    negocios: { label: "Negocios", color: "var(--coin)" },
    lab: { label: "Laboratorio", color: "var(--laser)" },
  };

  // 9x9 sprites. a = color del modo, b = claro, c = tenue, . = vacío
  const SPRITES = {
    tent: ["....b....", "...aaa...", "..ababa..", ".abababa.", "ababababa", ".bbbcbbb.", ".bbcccbb.", ".bbcccbb.", "ccccccccc"],
    bulb: ["...aaa...", "..abbba..", ".abbbbba.", ".abbabba.", ".abbabba.", "..aabaa..", "...ccc...", "...ccc...", "....c...."],
    trophy: ["aaaaaaaaa", "a.abbba.a", ".aaabaaa.", "..aaaaa..", "...aaa...", "....a....", "....a....", "..ccccc..", "..ccccc.."],
    carnation: ["..b.b.b..", ".bababab.", "..aaaaa..", ".aabaaba.", "..aaaaa..", "....c....", "..c.c....", "...cc....", "....c...."],
    chili: [".......c.", "......c..", "....aac..", "...aaaa..", "..aabaa..", ".aabaa...", ".aaaa....", "aaa......", "a........"],
    rose: ["...aba...", "..aaaaa..", "...aaa...", "....c....", "ccccccccc", "c.bbbbb.c", "c.......c", "c.bbb...c", "ccccccccc"],
    ticket: [".........", ".........", "aaaaaaaaa", "ab.c.bbba", ".b.c.bba.", "ab.c.bbba", "aaaaaaaaa", ".........", "........."],
    antenna: ["..aaaaa..", ".a.....a.", "a..bbb..a", "..b...b..", "....c....", "....c....", "...ccc...", "..ccccc..", "ccccccccc"],
    coin: ["..aaaaa..", ".aaaaaaa.", "aaabbbaaa", "aabaaaaaa", "aaabbbaaa", "aaaaaabaa", "aaabbbaaa", ".aaaaaaa.", "..aaaaa.."],
    chat: ["aaaaaaaaa", "a.......a", "a.b.b.b.a", "a.......a", "aaaaaaaaa", ".aa......", ".a.cccccc", "...c.b.bc", "...cccccc"],
    letter: [".........", "aaaaaaaaa", "aa.....aa", "a.a...a.a", "a..aba..a", "a..bbb..a", "a...b...a", "aaaaaaaaa", "........."],
    eye: [".........", "..aaaaa..", ".a.....a.", "a..bbb..a", "a.bbcbb.a", "a..bbb..a", ".a.....a.", "..aaaaa..", "........."],
  };

  const PROJECTS = [
    {
      id: "carpa", short: "Carpa", title: "Carpa de Saberes", mode: "educacion", sprite: "tent", year: 2026,
      desc: "Escuela de pista para los niños del circo: 6 materias, 36 lecciones y 216 ejercicios que se califican solos. Funciona sin internet y guarda el avance en el propio aparato.",
      stack: ["HTML", "CSS", "JavaScript", "Python"],
      shot: "assets/shots/carpa-de-saberes.jpg",
      live: "https://carpa-de-saberes.vercel.app", code: "https://github.com/alexisrja/carpa-de-saberes",
    },
    {
      id: "visionarti", short: "VisionArti", title: "VisionArti", mode: "educacion", sprite: "bulb", year: 2025,
      desc: "Aprendizaje gamificado con IA para secundaria: siete materias con puntos, niveles, insignias, rachas y ranking, y un asistente que resuelve dudas.",
      stack: ["JavaScript", "HTML", "CSS", "IA"],
      shot: "assets/shots/EduClick.jpg",
      live: null, code: "https://github.com/alexisrja/EduClick",
    },
    {
      id: "hackumb", short: "HackUMB", title: "HackUMB 26", mode: "educacion", sprite: "trophy", year: 2026,
      desc: "Registro del hackathon de la UMB en Almoloya de Alquisiras: acceso con GitHub, pase con folio, equipos, panel del participante y panel de la organización.",
      stack: ["HTML", "CSS", "JavaScript", "PostgreSQL"],
      shot: "assets/shots/hackumb26.jpg",
      live: "https://hackumb26.vercel.app", code: null,
    },
    {
      id: "plamari", short: "Mar y Sol", title: "Mar y Sol Floral", mode: "negocios", sprite: "carnation", year: 2026,
      desc: "Folleto web de una distribuidora de claveles: catálogo de colores, precios de mayoreo y menudeo, y cotización directa por WhatsApp.",
      stack: ["Next.js 16", "Tailwind 4", "TypeScript"],
      shot: "assets/shots/plamari.jpg",
      live: "https://plamari.vercel.app", code: "https://github.com/alexisrja/plamari",
    },
    {
      id: "dragonzitos", short: "Dragón", title: "Dragonzitos", mode: "negocios", sprite: "chili", year: 2026,
      desc: "Sitio de una golosina acidita y picosita: el sobrecito se rompe para mostrar el sabor, con Acidómetro, Picosímetro y formulario de contacto.",
      stack: ["Next.js 16", "React 19", "CSS Modules"],
      shot: "assets/shots/dragonzitos.jpg",
      live: "https://dragonzitos-web.vercel.app", code: null,
    },
    {
      id: "vitaly", short: "Vitaly", title: "Floral Vitaly · Inventario", mode: "negocios", sprite: "rose", year: 2026,
      desc: "Sistema de inventario de rosas para una productora floral: acceso con contraseña, panel de control y búsqueda de existencias.",
      stack: ["JavaScript", "HTML", "CSS"],
      shot: "assets/shots/invaccy.jpg",
      live: "https://inv-accy.vercel.app", code: "https://github.com/alexisrja/InvAccy",
    },
    {
      id: "rifas", short: "Rifas", title: "Rifas JAPS", mode: "negocios", sprite: "ticket", year: 2026,
      desc: "Plataforma de rifas en línea: premios, venta de boletos y elección de números desde el celular.",
      stack: ["Next.js", "TypeScript", "PostgreSQL"],
      shot: "assets/shots/rifas.jpg",
      live: "https://apuestacar.vercel.app", code: "https://github.com/alexisrja/Apuestacar",
    },
    {
      id: "sisginet", short: "Sisginet", title: "SISGINET", mode: "negocios", sprite: "antenna", year: 2026,
      desc: "Gestión de clientes y servicios para un proveedor de internet: dashboard con estadísticas, control de ingresos mensuales y acceso de administrador.",
      stack: ["Python", "Flask", "SQLite"],
      shot: "assets/shots/gestor.jpg",
      live: null, code: "https://github.com/alexisrja/gestor",
    },
    {
      id: "remitpay", short: "RemitPay", title: "RemitPay", mode: "lab", sprite: "coin", year: 2025,
      desc: "Remesas internacionales sobre el protocolo Interledger: envíos rápidos y multi-moneda entre wallets compatibles con Open Payments.",
      stack: ["Node.js", "Express", "Interledger"],
      shot: "assets/shots/RemitPay.jpg",
      live: null, code: "https://github.com/alexisrja/RemitPay",
    },
    {
      id: "chat", short: "Chat", title: "Chat en tiempo real", mode: "lab", sprite: "chat", year: 2026,
      desc: "Chat con Socket.IO: login con JWT, historial en MongoDB, aviso de quién está escribiendo y contador de usuarios en línea.",
      stack: ["Node.js", "Socket.IO", "MongoDB", "JWT"],
      shot: "assets/shots/wepsa.jpg",
      live: "https://wepsa.vercel.app", code: "https://github.com/alexisrja/wepsa",
    },
    {
      id: "buzon", short: "Buzón", title: "Buzón de cumpleaños", mode: "lab", sprite: "letter", year: 2026,
      desc: "Buzón pixelado para dejar cartas de cumpleaños que solo la festejada puede abrir. Pixel art hecho a mano y chiptune generado en el navegador.",
      stack: ["React", "Vite", "Node.js", "Express"],
      shot: "assets/shots/fest.jpg",
      live: "https://fest-gamma.vercel.app", code: null,
    },
    {
      id: "emociones", short: "Emociones", title: "Reconocimiento de emociones", mode: "lab", sprite: "eye", year: 2024,
      desc: "Visión artificial que detecta la emoción de un rostro frente a la cámara.",
      stack: ["Python", "OpenCV", "DeepFace", "MediaPipe"],
      shot: null,
      live: null, code: "https://github.com/alexisrja/reconocimiento-de-emociones",
    },
  ];

  const VITALS = [["Café", 0.85, "var(--coin)"], ["Código", 0.95, "var(--mint)"], ["Sueño", 0.3, "var(--laser)"]];
  const POWERS = [["Frontend", 8], ["Backend", 7], ["UI/UX", 7], ["Deploy", 7], ["Datos", 6], ["Python/IA", 5], ["Móvil", 4]];

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */

  const $ = (sel) => document.querySelector(sel);
  const pad = (n) => String(n).padStart(2, "0");

  function spriteSVG(name) {
    const rows = SPRITES[name];
    let rects = "";
    rows.forEach((row, y) => {
      [...row].forEach((ch, x) => {
        if (ch !== ".") rects += `<rect class="px-${ch}" x="${x}" y="${y}" width="1" height="1"/>`;
      });
    });
    return `<svg viewBox="0 0 9 9" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
  }

  let audio = null;
  let soundOn = false;
  function blip(freqs, step = 0.07) {
    if (!soundOn) return;
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = audio.currentTime;
    freqs.forEach((f, i) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "square";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.05, t0 + i * step);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (i + 1) * step);
      osc.connect(gain).connect(audio.destination);
      osc.start(t0 + i * step);
      osc.stop(t0 + (i + 1) * step);
    });
  }

  /* ------------------------------------------------------------------------
     Horizon peaks (Nevado-style volcano over stepped hills)
     ------------------------------------------------------------------------ */

  function drawPeaks() {
    const svg = $("#peaks");
    if (!svg) return;
    const W = 160, H = 30, COL = 2;
    const cols = W / COL;
    const far = [], near = [];
    for (let i = 0; i < cols; i++) {
      far.push(Math.round(9 + 5 * Math.sin(i * 0.19) + 3 * Math.sin(i * 0.53 + 1)));
      const d = Math.abs(i - 52);
      let h = Math.max(0, 25 - d * 0.95);
      if (d < 2) h -= 2; // cráter
      h = Math.max(h, Math.round(4 + 2 * Math.sin(i * 0.4)));
      near.push(Math.round(h));
    }
    const path = (hs) => {
      let d = `M0 ${H}`;
      hs.forEach((h, i) => { d += `V${H - h}H${(i + 1) * COL}`; });
      return d + `V${H}Z`;
    };
    let snow = "";
    near.forEach((h, i) => {
      if (h > 17) snow += `<rect class="pk-snow" x="${i * COL}" y="${H - h}" width="${COL}" height="${Math.min(3, h - 17)}"/>`;
    });
    svg.innerHTML = `<path class="pk-far" d="${path(far)}"/><path class="pk-near" d="${path(near)}"/>${snow}`;
  }

  /* ------------------------------------------------------------------------
     Select screen
     ------------------------------------------------------------------------ */

  const tilesEl = $("#tiles");
  const monitor = $("#monitor");
  const crt = monitor.querySelector(".crt");
  const narrow = window.matchMedia("(max-width: 900px)");
  let current = 0;
  let activeMode = "todas";

  function renderTiles() {
    tilesEl.innerHTML = PROJECTS.map((p, i) => `
      <button class="tile" type="button" data-index="${i}" style="--cat:${MODES[p.mode].color}"
        aria-label="${p.title} · ${MODES[p.mode].label}" aria-pressed="false">
        ${spriteSVG(p.sprite)}
        <span class="tile__name">${p.short}</span>
      </button>`).join("");
  }

  function tiles() { return [...tilesEl.querySelectorAll(".tile")]; }

  function select(index, { fromUser = false } = {}) {
    const p = PROJECTS[index];
    current = index;

    tiles().forEach((t, i) => {
      t.classList.toggle("is-selected", i === index);
      t.setAttribute("aria-pressed", String(i === index));
    });

    monitor.style.setProperty("--cat", MODES[p.mode].color);
    $("#mNum").textContent = `Misión ${pad(index + 1)}/${pad(PROJECTS.length)}`;
    $("#mMode").textContent = MODES[p.mode].label;
    $("#mTitle").textContent = p.title;
    $("#mDesc").textContent = p.desc;
    $("#mYear").textContent = p.year;

    const img = $("#mShot");
    const spr = $("#mSprite");
    if (p.shot) {
      img.src = p.shot;
      img.alt = `Captura de ${p.title}`;
      img.hidden = false;
      spr.hidden = true;
    } else {
      img.hidden = true;
      img.removeAttribute("src");
      spr.innerHTML = spriteSVG(p.sprite);
      spr.hidden = false;
    }

    $("#mStack").innerHTML = p.stack.map((s) => `<li>${s}</li>`).join("");
    $("#mLive").innerHTML = p.live ? `<span class="is-yes">En línea</span>` : `<span class="is-no">Sin demo</span>`;
    $("#mCode").innerHTML = p.code ? `<span class="is-yes">Abierto</span>` : `<span class="is-no">Privado</span>`;

    const actions = [];
    if (p.live) actions.push(`<a class="btn btn--cat" href="${p.live}" target="_blank" rel="noopener">▶ Jugar demo</a>`);
    if (p.code) actions.push(`<a class="btn" href="${p.code}" target="_blank" rel="noopener">&lt;/&gt; Ver código</a>`);
    else actions.push(`<span class="btn btn--off">Código privado</span>`);
    $("#mActions").innerHTML = actions.join("");

    if (!reduceMotion) {
      crt.classList.remove("is-switching");
      void crt.offsetWidth;
      crt.classList.add("is-switching");
    }

    if (fromUser) {
      blip([660, 990], 0.05);
      if (narrow.matches) {
        const r = monitor.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight * 0.4) {
          monitor.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }
      }
    }
  }

  function setMode(mode) {
    activeMode = mode;
    document.querySelectorAll(".mode").forEach((b) => {
      const on = b.dataset.mode === mode;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    tiles().forEach((t, i) => {
      const locked = mode !== "todas" && PROJECTS[i].mode !== mode;
      t.classList.toggle("is-locked", locked);
      t.disabled = locked;
    });
    if (mode !== "todas" && PROJECTS[current].mode !== mode) {
      select(PROJECTS.findIndex((p) => p.mode === mode));
    }
    blip([440], 0.06);
  }

  function columnCount() {
    return getComputedStyle(tilesEl).gridTemplateColumns.split(" ").length;
  }

  function onTileKey(e) {
    const keys = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: "up", ArrowDown: "down" };
    if (!(e.key in keys)) return;
    const tile = e.target.closest(".tile");
    if (!tile) return;
    e.preventDefault();

    const all = tiles();
    const cols = columnCount();
    let i = Number(tile.dataset.index);
    const step = keys[e.key] === "up" ? -cols : keys[e.key] === "down" ? cols : keys[e.key];

    // avanza hasta la siguiente casilla desbloqueada en esa dirección
    for (let n = i + step; n >= 0 && n < all.length; n += step) {
      if (!all[n].disabled) { i = n; break; }
    }
    if (i !== Number(tile.dataset.index)) {
      all[i].focus();
      select(i, { fromUser: true });
    }
  }

  /* ------------------------------------------------------------------------
     Player meters
     ------------------------------------------------------------------------ */

  function meter(label, filled, valText, color) {
    const cells = Array.from({ length: 10 }, (_, i) => `<span class="${i < filled ? "on" : ""}"></span>`).join("");
    return `<div class="meter" style="--cat:${color}">
      <span class="meter__label">${label}</span>
      <span class="meter__cells" role="img" aria-label="${label}: ${valText}">${cells}</span>
      <span class="meter__val">${valText}</span>
    </div>`;
  }

  function renderMeters() {
    $("#vitals").innerHTML = VITALS.map(([l, v, c]) => meter(l, Math.round(v * 10), `${Math.round(v * 100)}%`, c)).join("");
    $("#powers").innerHTML = POWERS.map(([l, v]) => meter(l, v, `${v}/10`, "var(--mint)")).join("");
  }

  /* ------------------------------------------------------------------------
     Coin, sound, countdown
     ------------------------------------------------------------------------ */

  let credits = 0;
  function insertCoin() {
    credits = Math.min(99, credits + 1);
    $("#credits").textContent = pad(credits);
    const btn = $("#coinBtn");
    btn.classList.remove("is-dropped");
    void btn.offsetWidth;
    btn.classList.add("is-dropped");
    blip([988, 1319], 0.08);
    setTimeout(() => {
      $("#misiones").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      const sel = tilesEl.querySelector(".tile.is-selected");
      if (sel) sel.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 320);
  }

  function startCountdown() {
    const el = $("#countdown");
    const section = $("#continuar");
    if (!el || !section || reduceMotion || !("IntersectionObserver" in window)) return;
    let n = 9;
    let timer = null;
    const tick = () => {
      n = n <= 0 ? 9 : n - 1;
      el.textContent = n;
      if (n === 0) blip([220, 165], 0.12);
    };
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) timer = setInterval(tick, 1000);
      else if (!entry.isIntersecting && timer) { clearInterval(timer); timer = null; n = 9; el.textContent = n; }
    }, { threshold: 0.4 }).observe(section);
  }

  /* ------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------ */

  drawPeaks();
  renderTiles();
  renderMeters();
  select(0);

  tilesEl.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (tile && !tile.disabled) select(Number(tile.dataset.index), { fromUser: true });
  });
  tilesEl.addEventListener("keydown", onTileKey);
  document.querySelectorAll(".mode").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
  $("#coinBtn").addEventListener("click", insertCoin);

  $("#soundToggle").addEventListener("click", (e) => {
    soundOn = !soundOn;
    e.currentTarget.setAttribute("aria-pressed", String(soundOn));
    e.currentTarget.textContent = `Sonido: ${soundOn ? "sí" : "no"}`;
    blip([523, 784], 0.06);
  });

  startCountdown();
})();
