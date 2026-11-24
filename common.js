/* Shared behaviour for every page: layout, theme, menu, reveals, and page renderers. */
(() => {
  "use strict";
  const S = window.SITE || {};
  const D = window.PORTFOLIO || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page || "";
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked: ignore */ } },
  };
  if (store.get("theme")) root.dataset.theme = store.get("theme");

  // Toast
  let toastTimer;
  const toast = (msg) => {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  };

  // Shared chrome
  const LINKS = [
    ["index.html", "Home", "home"],
    ["about.html", "About", "about"],
    ["skills.html", "Skills", "skills"],
    ["projects.html", "Projects", "projects"],
    ["experience.html", "Experience", "experience"],
    ["contact.html", "Contact", "contact"],
  ];
  const active = page === "project" ? "projects" : page;
  const socials = Object.entries(S.socials || {}).filter(([, url]) => url);

  const skip = document.createElement("a");
  skip.className = "skip";
  skip.href = "#main";
  skip.textContent = "Skip to content";

  const progress = document.createElement("div");
  progress.className = "progress";
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");

  const header = document.createElement("header");
  header.className = "nav";
  header.id = "nav";
  header.innerHTML = `
    <a href="index.html" class="logo">${esc(S.initials)}<span>.</span></a>
    <nav aria-label="Main">
      <ul class="nav-links" id="navLinks">
        ${LINKS.map(([href, label, key]) => `<li><a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
      </ul>
    </nav>
    <div class="nav-actions">
      <button class="icon-btn" id="themeToggle" aria-label="Switch between light and dark theme" title="Switch theme">◐</button>
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span></button>
    </div>`;

  const year = new Date().getFullYear();
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo">${esc(S.initials)}<span>.</span></a>
        <p>${esc(S.footerLine)}</p>
        <a class="footer-mail" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
      </div>
      <nav class="footer-col" aria-label="Footer pages">
        <p class="foot-title">Pages</p>
        <ul>${LINKS.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
      </nav>
      <nav class="footer-col" aria-label="Social links">
        <p class="foot-title">Elsewhere</p>
        <ul>${socials.length
          ? socials.map(([k, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(k)} ↗</a></li>`).join("")
          : `<li class="muted">Add links in config.js</li>`}
        </ul>
      </nav>
      <div class="footer-col">
        <p class="foot-title">Quick links</p>
        <ul>
          <li><a href="projects.html?q=">Search projects</a></li>
          <li><a href="contact.html">Start a project</a></li>
          <li><a href="experience.html">Work history</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© ${year} ${esc(S.name)}. Built with HTML, CSS and JavaScript.</p>
      <a href="#top" class="to-top" id="toTop">Back to top ↑</a>
    </div>`;

  const toastEl = document.createElement("div");
  toastEl.id = "toast";
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");

  document.body.prepend(skip, progress, glow, header);
  document.body.append(footer, toastEl);

  // Theme toggle
  $("#themeToggle").addEventListener("click", () => {
    const dark = root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    root.dataset.theme = dark ? "light" : "dark";
    store.set("theme", root.dataset.theme);
  });

  // Mobile menu
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Scroll progress and nav shadow
  const nav = $("#nav");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    nav.classList.toggle("scrolled", scrollY > 20);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Back to top
  $("#toTop").addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  // Cursor glow (pointer devices only)
  if (matchMedia("(hover: hover)").matches && !reduce) {
    addEventListener("pointermove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  } else {
    glow.style.display = "none";
  }

  // Reveal on scroll, skill bars, counters
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (reduce) { el.textContent = target + "+"; return; }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + (t === 1 ? "+" : "");
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const reveal = (el) => {
    el.classList.add("in");
    if (el.classList.contains("skill")) el.querySelector(".bar i").style.width = el.dataset.level + "%";
    if (el.hasAttribute("data-count")) countUp(el);
    el.querySelectorAll("[data-count]").forEach(countUp);
  };
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal(entry.target);
      io.unobserve(entry.target);
    }
  }, { threshold: 0.15 });
  const observeAll = () => {
    $$(".reveal:not([data-obs]), .skill:not([data-obs])").forEach((el) => {
      el.dataset.obs = "1";
      if (reduce) reveal(el); else io.observe(el);
    });
  };

  // Renderers
  const card = (p) => `
    <article class="project reveal" data-cat="${esc(p.cat)}" data-search="${esc([p.title, p.summary, ...p.tags].join(" ").toLowerCase())}">
      <a class="project-visual" href="project.html?id=${esc(p.id)}" style="background:${p.gradient}" tabindex="-1" aria-hidden="true">
        <img src="${esc(p.image)}" alt="" width="800" height="500" loading="lazy" />
        <span>${esc(p.number)}</span>
      </a>
      <div class="project-info">
        <h3><a href="project.html?id=${esc(p.id)}">${esc(p.title)}</a></h3>
        <p>${esc(p.summary)}</p>
        <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="project-links">
          <a href="project.html?id=${esc(p.id)}">Read more →</a>
          ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">Live site ↗</a>` : ""}
          ${p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener noreferrer">Source ↗</a>` : ""}
        </div>
      </div>
    </article>`;

  const bars = (items) => items.map((s) => `
    <div class="skill reveal" data-level="${s.level}">
      <div class="skill-head"><span>${esc(s.name)}</span><b>${s.level}%</b></div>
      <div class="bar"><i></i></div>
    </div>`).join("");

  const statsHtml = () => D.stats.map((s) => `<div><b data-count="${s.value}">0</b><span>${esc(s.label)}</span></div>`).join("");

  function renderHome() {
    if (active !== "home") return;
    $("#heroIntro").innerHTML = `I'm <strong>${esc(S.name)}</strong>, ${esc(S.tagline)}`;
    if (S.resume) { const b = $("#resumeBtn"); b.hidden = false; b.href = S.resume; }
    $("#heroStats").innerHTML = statsHtml();
    $("#services").innerHTML = D.services.map((s, i) => `
      <article class="service reveal">
        <span class="service-num">0${i + 1}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </article>`).join("");
    $("#featured").innerHTML = D.projects.filter((p) => p.featured).slice(0, 3).map(card).join("");
    $("#homeSkills").innerHTML = bars(D.skillGroups.flatMap((g) => g.items).slice(0, 6));
    $("#testimonials").innerHTML = D.testimonials.map((t) => `
      <figure class="quote reveal">
        <blockquote>${esc(t.quote)}</blockquote>
        <figcaption><span class="avatar-init" aria-hidden="true">${esc(t.name.charAt(0))}</span><span><strong>${esc(t.name)}</strong><br /><span class="muted">${esc(t.role)}</span></span></figcaption>
      </figure>`).join("");
    const names = D.skillGroups.flatMap((g) => g.items.map((i) => i.name.split(" ")[0]));
    const track = names.map((n) => `<span>${esc(n)}</span>`).join("");
    $("#marquee").innerHTML = track + track;
    startTyping(S.roles || []);
  }

  function startTyping(phrases) {
    const el = $("#typed");
    if (!el || !phrases.length) return;
    if (reduce) { el.textContent = phrases[0]; return; }
    let p = 0, c = 0, deleting = false;
    const step = () => {
      const word = phrases[p];
      el.textContent = word.slice(0, c);
      let delay = deleting ? 45 : 95;
      if (!deleting && c === word.length) { delay = 1600; deleting = true; }
      else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 300; }
      c += deleting ? -1 : 1;
      setTimeout(step, delay);
    };
    step();
  }

  function renderAbout() {
    if (active !== "about") return;
    $("#aboutIntro").textContent = D.about.intro;
    $("#aboutParas").innerHTML = D.about.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("");
    $("#facts").innerHTML = D.about.facts.map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`).join("");
    $("#aboutStats").innerHTML = statsHtml();
    $("#education").innerHTML = D.education.map((e) => `
      <li class="reveal"><span class="year">${esc(e.period)}</span><h3>${esc(e.title)}</h3><p>${esc(e.place)}</p></li>`).join("");
    $("#certs").innerHTML = D.certifications.map((c) => `
      <li class="reveal"><span class="year">${esc(c.year)}</span><h3>${esc(c.name)}</h3><p>${esc(c.issuer)}</p></li>`).join("");
    $("#now").innerHTML = D.now.map((n) => `<li class="reveal">${esc(n)}</li>`).join("");
  }

  function renderSkills() {
    const host = $("#skillsList");
    if (!host) return;
    host.innerHTML = D.skillGroups.map((g) => `
      <div class="skill-group">
        <h2 class="reveal">${esc(g.title)}</h2>
        <div class="skills-grid">${bars(g.items)}</div>
      </div>`).join("");
  }

  function renderProjects() {
    const grid = $("#projectsGrid");
    if (!grid) return;
    let cat = "all";
    const cats = [{ id: "all", label: "All" }, ...D.categories];
    const filters = $("#filters");
    filters.innerHTML = cats.map((c) => `<button class="filter${c.id === cat ? " active" : ""}" data-filter="${c.id}" aria-pressed="${c.id === cat}">${esc(c.label)}</button>`).join("");
    grid.innerHTML = D.projects.map(card).join("");

    const search = $("#search");
    const empty = $("#noResults");
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      $$(".project", grid).forEach((el) => {
        const match = (cat === "all" || el.dataset.cat === cat) && (!q || el.dataset.search.includes(q));
        el.classList.toggle("hide", !match);
        if (match) shown++;
      });
      empty.classList.toggle("show", shown === 0);
    };
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      cat = btn.dataset.filter;
      $$(".filter", filters).forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      apply();
    });
    search.addEventListener("input", apply);
    // Footer link opens this page with ?q=, so pre-fill and focus the search box.
    const preset = new URLSearchParams(location.search).get("q");
    if (preset !== null) { search.value = preset; }
    $$("#clearSearch, #clearSearch2").forEach((btn) => btn.addEventListener("click", () => {
      search.value = "";
      filters.querySelector('[data-filter="all"]').click();
      search.focus();
    }));
    apply();
    if (preset !== null) search.focus();
  }

  function renderProject() {
    const body = $("#projectBody");
    if (!body) return;
    const id = new URLSearchParams(location.search).get("id");
    const n = D.projects.length;
    const i = D.projects.findIndex((p) => p.id === id);
    if (i < 0) {
      document.title = "Project not found · " + S.name;
      $("#projectHead").innerHTML = `
        <p class="label">Project</p>
        <h1>Project not found</h1>
        <p>That project does not exist or the link is wrong. <a class="link" href="projects.html">See all projects →</a></p>`;
      return;
    }
    const p = D.projects[i];
    const prev = D.projects[(i - 1 + n) % n];
    const next = D.projects[(i + 1) % n];
    const catLabel = (D.categories.find((c) => c.id === p.cat) || {}).label || "Project";
    document.title = `${p.title} · ${S.name}`;

    $("#projectHead").innerHTML = `
      <a class="back" href="projects.html">← All projects</a>
      <p class="label">${esc(p.year)} · ${esc(catLabel)}</p>
      <h1>${esc(p.title)}</h1>
      <p>${esc(p.summary)}</p>`;

    const links = [
      p.live ? `<a class="btn btn-primary" href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">Live site ↗</a>` : "",
      p.code ? `<a class="btn btn-ghost" href="${esc(p.code)}" target="_blank" rel="noopener noreferrer">Source code ↗</a>` : "",
      `<a class="btn btn-ghost" href="contact.html">Talk about a similar project</a>`,
    ].join("");

    body.innerHTML = `
      <figure class="detail-hero reveal" style="background:${p.gradient}"><img src="${esc(p.image)}" alt="" width="800" height="500" /></figure>
      <div class="detail-grid">
        <div class="reveal">
          <h2 class="sub">About this project</h2>
          ${p.description.map((t) => `<p>${esc(t)}</p>`).join("")}
          <h2 class="sub">What it does well</h2>
          <ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        </div>
        <aside class="meta-card reveal">
          <dl>
            <dt>Role</dt><dd>${esc(p.role)}</dd>
            <dt>Year</dt><dd>${esc(p.year)}</dd>
            <dt>Built with</dt><dd><div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div></dd>
          </dl>
          <div class="btn-row">${links}</div>
        </aside>
      </div>
      <nav class="pager reveal" aria-label="Other projects">
        <a href="project.html?id=${esc(prev.id)}">← ${esc(prev.title)}</a>
        <a href="project.html?id=${esc(next.id)}">${esc(next.title)} →</a>
      </nav>`;
  }

  function renderExperience() {
    const host = $("#timeline");
    if (!host) return;
    host.innerHTML = D.experience.map((e) => `
      <li class="reveal">
        <span class="year">${esc(e.period)}</span>
        <h3>${esc(e.role)} <em>at ${esc(e.company)}</em></h3>
        <p>${esc(e.summary)}</p>
      </li>`).join("");
  }

  function renderContact() {
    const form = $("#contactForm");
    if (!form) return;
    const mail = $("#contactEmail");
    mail.href = "mailto:" + S.email;
    mail.textContent = S.email;
    $("#socialList").innerHTML = socials.length
      ? socials.map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span>${esc(k)}</span><span aria-hidden="true">↗</span></a>`).join("")
      : `<p class="muted">Add your social links in <code>config.js</code>.</p>`;

    $("#copyEmail").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(S.email);
        toast("Email copied");
      } catch {
        toast("Could not copy. Email: " + S.email);
      }
    });

    const status = $("#formStatus");
    const fields = $$("input, textarea", form);
    fields.forEach((f) => f.addEventListener("input", () => f.classList.remove("invalid")));
    $("#resetForm").addEventListener("click", () => {
      form.reset();
      fields.forEach((f) => f.classList.remove("invalid"));
      status.textContent = "";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailValue = $("#email").value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
      let ok = true;
      fields.forEach((f) => {
        const valid = f.value.trim() !== "" && (f.type !== "email" || emailOk);
        f.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        status.textContent = "Please fill in every field. Check that the email address is valid.";
        return;
      }
      const name = $("#name").value.trim();
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${$("#message").value.trim()}\n\n${name} (${emailValue})`);
      location.href = `mailto:${S.email}?subject=${subject}&body=${body}`;
      status.textContent = "Your mail app should open now. If it does not, email me directly at the address above.";
      toast("Opening your mail app");
      form.reset();
    });
  }

  // Boot
  renderHome();
  renderAbout();
  renderSkills();
  renderProjects();
  renderProject();
  renderExperience();
  renderContact();
  observeAll();
})();
