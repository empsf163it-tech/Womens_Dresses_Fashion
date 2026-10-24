
const PRODUCTS = [
  { id: "midnight-midi", name: "Midnight Muse Midi", subtitle: "After-dark energy", price: 2499, tag: "BESTSELLER", category: "night", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85" },
  { id: "soft-romance", name: "Soft Focus Dress", subtitle: "A softer kind of statement", price: 1899, tag: "NEW DROP", category: "soft", img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=85" },
  { id: "city-after-dark", name: "City After Dark", subtitle: "The plan is the outfit", price: 2799, tag: "EDITOR'S PICK", category: "night", img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85" },
  { id: "weekend-state", name: "Weekend State of Mind", subtitle: "Easy all-day dressing", price: 1599, tag: "EVERYDAY", category: "everyday", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85" },
  { id: "main-character", name: "Main Character Maxi", subtitle: "For the entrance", price: 3299, tag: "STATEMENT", category: "occasion", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85" },
  { id: "daydream", name: "Daydream Slip Dress", subtitle: "Soft layers, strong mood", price: 2199, tag: "TRENDING", category: "soft", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85" }
];

const COLLECTION_PRODUCTS = [
  { id: "midnight-midi", name: "Midnight Muse Midi", subtitle: "After-dark energy", price: 2499, tag: "BESTSELLER", category: "night", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85" },
  { id: "soft-romance", name: "Soft Focus Dress", subtitle: "A softer kind of statement", price: 1899, tag: "NEW DROP", category: "soft", img: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85" },
  { id: "city-after-dark", name: "City After Dark", subtitle: "The plan is the outfit", price: 2799, tag: "EDITOR'S PICK", category: "night", img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85" },
  { id: "weekend-state", name: "Weekend State of Mind", subtitle: "Easy all-day dressing", price: 1599, tag: "EVERYDAY", category: "everyday", img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=85" },
  { id: "main-character", name: "Main Character Maxi", subtitle: "For the entrance", price: 3299, tag: "STATEMENT", category: "occasion", img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=85" },
  { id: "daydream", name: "Daydream Slip Dress", subtitle: "Soft layers, strong mood", price: 2199, tag: "TRENDING", category: "soft", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" }
];

const $ = (s, root = document) => root.querySelector(s), $$ = (s, root = document) => [...root.querySelectorAll(s)];
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } };
const write = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)) } catch { } };
function toast(message) { const el = $(".toast"); if (!el) return; el.textContent = message; el.classList.add("show"); clearTimeout(window._toastTimer); window._toastTimer = setTimeout(() => el.classList.remove("show"), 2600) }
function money(v) { return "₹" + Number(v).toLocaleString("en-IN") }
function renderProducts(grid, kind) {
  const existingComments = [...grid.childNodes]
    .filter(n => n.nodeType === 8)
    .map(c => `<!--${c.nodeValue}-->`)
    .join("\n");

  let list = kind === "featured" ? [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]] : kind === "recommended" ? [PRODUCTS[3], PRODUCTS[5], PRODUCTS[1], PRODUCTS[0]] : [...COLLECTION_PRODUCTS];
  if (kind === "all") {
    const active = $(".filter-pill.active")?.dataset.filter || "all";
    if (active !== "all") list = list.filter(p => p.category === active);
    const sort = $("#sortProducts")?.value || "featured";
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name))
  }
  const saved = read("mystylez_saved", read("forme_saved", []));
  const cardsHtml = list.map(p => `<article class="product-card"><div class="product-image-wrap"><a href="product.html?id=${p.id}" aria-label="View ${p.name}"><img loading="lazy" src="${p.img}" alt="${p.name}"></a><span class="product-badge">${p.tag}</span><button class="heart-btn ${saved.includes(p.id) ? "saved" : ""}" data-fav="${p.id}" aria-label="Save ${p.name}">${saved.includes(p.id) ? "♥" : "♡"}</button><button class="quick-add" data-add="${p.id}">Add to bag · ${money(p.price)}</button></div><div class="product-info"><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p>${money(p.price)}</p></div><div class="product-subtitle">${p.subtitle}</div></article>`).join("");
  grid.innerHTML = (existingComments ? existingComments + "\n" : "") + cardsHtml;
  applyDynamicTypography()
}
function renderBag() { const items = read("mystylez_bag", read("forme_bag", [])); $$(".bag-count").forEach(el => el.textContent = items.reduce((n, x) => n + x.qty, 0)); const container = $("#bagItems"); if (!container) return; $("#bagItemCount").textContent = `${items.reduce((n, x) => n + x.qty, 0)} PIECES`; $("#bagEmpty").hidden = items.length > 0; container.innerHTML = items.map(x => { const p = [...PRODUCTS, ...COLLECTION_PRODUCTS].find(p => p.id === x.id); if (!p) return ""; return `<article class="bag-item"><img src="${p.img}" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.subtitle}</p><p>Qty: ${x.qty}</p><button class="remove-item" data-remove="${p.id}">Remove</button></div><b>${money(p.price * x.qty)}</b></article>` }).join(""); const total = items.reduce((n, x) => n + ([...PRODUCTS, ...COLLECTION_PRODUCTS].find(p => p.id === x.id)?.price || 0) * x.qty, 0); $("#bagSubtotal").textContent = money(total); $("#bagTotal").textContent = money(total); applyDynamicTypography() }
function addToBag(id) { const bag = read("mystylez_bag", read("forme_bag", [])); const found = bag.find(x => x.id === id); if (found) found.qty++; else bag.push({ id, qty: 1 }); write("mystylez_bag", bag); renderBag(); toast("Added to your bag ✳") }
function openAccount(tab = "login") { const modal = $("#accountModal"); if (!modal) return; modal.hidden = false; document.body.style.overflow = "hidden"; setAuthTab(tab); applyDynamicTypography(); $(".modal-close")?.focus() }
function closeAccount() { const modal = $("#accountModal"); if (modal) { modal.hidden = true; document.body.style.overflow = "" } }
function setAuthTab(tab) {
  $$(".auth-tab").forEach(b => b.classList.toggle("active", b.dataset.auth === tab));
  const signup = tab === "signup";
  $$(".signup-only").forEach(el => {
    el.hidden = !signup;
    el.style.display = signup ? "" : "none";
  });
  $$(".login-only").forEach(el => {
    el.hidden = signup;
    el.style.display = signup ? "none" : "";
  });
  $("#authSubmit").textContent = signup ? "Create my account ↗" : "Log in ↗";
  $("#modalTitle").innerHTML = signup ? "Your style era<br><em>starts here.</em>" : "Good looks.<br><em>Good to see you.</em>";
  
  // Different visual side text for sign up vs login
  const vTitle = $("#modalVisualText");
  const vSub = $("#modalVisualSub");
  if (vTitle) {
    vTitle.innerHTML = signup ? "JOIN THE<br>MOVEMENT." : "YOUR STYLE<br>IS YOURS.";
  }
  if (vSub) {
    vSub.textContent = signup ? "EXCLUSIVE DROPS & VIP ACCESS." : "COME AS YOU ARE.";
  }
}

function initBackToTop() {
  const btn = $("#backToTop") || (() => {
    const b = document.createElement("button");
    b.id = "backToTop";
    b.className = "back-to-top";
    b.setAttribute("aria-label", "Back to top");
    b.setAttribute("title", "Back to top");
    b.innerHTML = '<span class="arrow-up" aria-hidden="true">↑</span><span class="btn-text">Top</span>';
    document.body.appendChild(b);
    return b;
  })();

  const toggleVisibility = () => {
    if (window.scrollY > 220) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
    const menu = $(".mobile-menu"), nav = $(".main-nav");
  menu?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(opened));
    menu.textContent = opened ? "×" : "☰";
  });
  $$(".main-nav a, .main-nav button").forEach(a => a.addEventListener("click", () => {
    if (nav?.classList.contains("open")) {
      nav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
      if (menu) menu.textContent = "☰";
    }
  }));
  document.addEventListener("click", (e) => {
    if (nav?.classList.contains("open") && !nav.contains(e.target) && !menu?.contains(e.target)) {
      nav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
      if (menu) menu.textContent = "☰";
    }
  });
  $$(".account-open").forEach(b => b.addEventListener("click", () => openAccount("login"))); $(".modal-close")?.addEventListener("click", closeAccount); $("#accountModal")?.addEventListener("click", e => { if (e.target.id === "accountModal") closeAccount() }); document.addEventListener("keydown", e => { if (e.key === "Escape") closeAccount() }); $$(".auth-tab").forEach(b => b.addEventListener("click", () => setAuthTab(b.dataset.auth)));
    // Password visibility toggle handlers
  $$(".pwd-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const input = $(`#${targetId}`);
      if (!input) return;
      const isPwd = input.type === "password";
      input.type = isPwd ? "text" : "password";
      const openEye = $(".eye-open", btn);
      const closedEye = $(".eye-closed", btn);
      if (openEye) openEye.style.display = isPwd ? "none" : "block";
      if (closedEye) closedEye.style.display = isPwd ? "block" : "none";
      btn.setAttribute("aria-label", isPwd ? "Hide password" : "Show password");
    });
  });

  // Forgot password handler
  $("#forgotPasswordBtn")?.addEventListener("click", () => {
    const email = $("#authEmail")?.value.trim();
    if (email) {
      toast(`Password reset link sent to ${email} ✳`);
    } else {
      toast("Please enter your email to receive a reset link ✳");
      $("#authEmail")?.focus();
    }
  });

  // Terms & Privacy Policy link handlers
  $$(".terms-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      toast("Opening MyStyleZ Terms & Privacy Policy ✳");
    });
  });

  $("#authForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const isSignup = $(".auth-tab.active")?.dataset.auth === "signup";
    
    if (isSignup) {
      const name = $("#authName")?.value.trim();
      if (!name) {
        toast("Please enter your name ✳");
        $("#authName")?.focus();
        return;
      }
      const pwd = $("#authPassword")?.value;
      const confirmPwd = $("#authConfirmPassword")?.value;
      if (!confirmPwd) {
        toast("Please confirm your password ✳");
        $("#authConfirmPassword")?.focus();
        return;
      }
      if (pwd !== confirmPwd) {
        toast("Passwords do not match. Please re-enter ✳");
        $("#authConfirmPassword")?.focus();
        return;
      }
      const agreed = $("#agreeTerms")?.checked;
      if (!agreed) {
        toast("Please accept the Terms & Conditions to sign up ✳");
        $("#agreeTerms")?.focus();
        return;
      }
    }

    toast(isSignup ? "Account created successfully! Welcome to MyStyleZ ✳" : "Logged in successfully! Welcome back to MyStyleZ ✳");
    setTimeout(closeAccount, 500);
  });
  $$("[data-product-grid]").forEach(grid => renderProducts(grid, grid.dataset.productGrid));
  document.addEventListener("click", e => { const add = e.target.closest("[data-add]"); if (add) addToBag(add.dataset.add); const fav = e.target.closest("[data-fav]"); if (fav) { const saved = read("mystylez_saved", read("forme_saved", [])), id = fav.dataset.fav; const next = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id]; write("mystylez_saved", next); fav.classList.toggle("saved", next.includes(id)); fav.textContent = next.includes(id) ? "♥" : "♡"; toast(next.includes(id) ? "Saved to your style list" : "Removed from saved looks") } const remove = e.target.closest("[data-remove]"); if (remove) { write("mystylez_bag", read("mystylez_bag", read("forme_bag", [])).filter(x => x.id !== remove.dataset.remove)); renderBag(); toast("Removed from your bag") } });
  $$(".filter-pill").forEach(b => b.addEventListener("click", () => { $$(".filter-pill").forEach(x => x.classList.toggle("active", x === b)); const grid = $('[data-product-grid="all"]'); if (grid) renderProducts(grid, "all") }));
  $("#sortProducts")?.addEventListener("change", () => { const grid = $('[data-product-grid="all"]'); if (grid) renderProducts(grid, "all") });
  renderBag(); $("#checkoutBtn")?.addEventListener("click", () => toast("Checkout is a demo only — no payment was taken."));
  $$("[data-save-story]").forEach(b => { const saved = read("mystylez_stories", read("forme_stories", [])); if (saved.includes(b.dataset.saveStory)) { b.classList.add("saved"); b.textContent = "♥ Saved" } b.addEventListener("click", () => { let current = read("mystylez_stories", read("forme_stories", [])); const id = b.dataset.saveStory; current = current.includes(id) ? current.filter(x => x !== id) : [...current, id]; write("mystylez_stories", current); b.classList.toggle("saved", current.includes(id)); b.textContent = current.includes(id) ? "♥ Saved" : "♡ Save this idea"; const out = $("#savedStories"); if (out) out.textContent = current.length ? `Saved ideas: ${current.map(x => ({ layering: "Layer it like you meant it", colour: "Color that changes the mood", repeat: "Repeat outfits, repeat confidence" }[x])).join(" · ")}` : "No saved ideas yet. Tap “Save this idea” to keep one here on this device." }) });
  $$(".newsletter-form").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); $(".form-feedback", f).textContent = "Welcome to the MyStyleZ inner circle!"; f.reset(); toast("Subscribed to MyStyleZ Newsletter ✳") }));
  $$(".social-login-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const provider = btn.getAttribute("aria-label") || "Social Account";
      openAccount("login");
      toast(`Connecting with ${provider.replace("Sign in with ", "")}... (Demo mode)`);
    });
  });
  initBackToTop();
  highlightActiveNav();
  applyDynamicTypography();
// Interactive Vibe Matcher Logic (index.html)
  const vibeMatrix = {
    "electric-night": {
      title: "The Midnight Muse Bias Cut",
      desc: "A fluid liquid-cupro midi with subtle side ruche and an open square neckline. Pair with pointed kitten heels and molten brass cuffs.",
      badge: "RECOMMENDED SILHOUETTE · AFTER-HOURS ENERGY",
      colors: ["#1f1d1d", "#a4422e", "#e8ded4"]
    },
    "electric-dinner": {
      title: "Sculptural Velvet Halter",
      desc: "Deep-toned architectural halter dress with delicate micro-rib tension that molds gently to your movement.",
      badge: "RECOMMENDED SILHOUETTE · STATEMENT DINING",
      colors: ["#2d1b26", "#c27557", "#d8cbbe"]
    },
    "electric-weekend": {
      title: "Asymmetrical Slip Dress",
      desc: "Diagonal drape hemline with contrasting raw edge finish. Effortless when worn with heavy combat boots or low sneakers.",
      badge: "RECOMMENDED SILHOUETTE · URBAN CULTURE",
      colors: ["#38241d", "#7a2c20", "#f2eae2"]
    },
    "effortless-night": {
      title: "City After Dark Minimal Column",
      desc: "An ankle-grazing column dress crafted in matte Japanese crepe. High center split for unhindered stride.",
      badge: "RECOMMENDED SILHOUETTE · ELEVATED NOIR",
      colors: ["#181615", "#4a423a", "#c7bbae"]
    },
    "effortless-dinner": {
      title: "The Pleated Midi Chemise",
      desc: "Air-crepe relaxed silhouette with an optional self-tie sash. Floats through candle-lit bistros and terrace dinners.",
      badge: "RECOMMENDED SILHOUETTE · EFFORTLESS CHIC",
      colors: ["#8f3e2e", "#c49a6c", "#fcf8f3"]
    },
    "effortless-weekend": {
      title: "Daydream Weekend Shirt-Dress",
      desc: "Crisp sand-washed cotton-rayon with rolled sleeves and mother-of-pearl buttons. From farmer's market to late afternoon wine.",
      badge: "RECOMMENDED SILHOUETTE · ALL-DAY EASE",
      colors: ["#dfd2c4", "#8a5840", "#ffffff"]
    },
    "romantic-night": {
      title: "Sheer Layering Evening Slip",
      desc: "Ethereal double-layer translucent viscose over an opaque silk inner slip. Dramatic movement under city streetlamps.",
      badge: "RECOMMENDED SILHOUETTE · POETIC NOIR",
      colors: ["#332029", "#a85d70", "#eae1df"]
    },
    "romantic-dinner": {
      title: "Soft Focus Tiered Midi",
      desc: "Gathered sweetheart neckline with gentle balloon sleeves. Evokes timeless nostalgia with modern ease.",
      badge: "RECOMMENDED SILHOUETTE · CANDLELIGHT GLOW",
      colors: ["#b55845", "#e2a98f", "#f8ede5"]
    },
    "romantic-weekend": {
      title: "Poetic Meadow Linen-Viscose",
      desc: "Smocked flexible bodice with a cascading ruffled hem that catches the light and breeze naturally.",
      badge: "RECOMMENDED SILHOUETTE · SUNDAY ESCAPE",
      colors: ["#63735e", "#d6c1b4", "#f7f1e9"]
    }
  };

  let activeMood = "electric";
  let activeOcc = "night";

  function updateVibeResult() {
    const key = `${activeMood}-${activeOcc}`;
    const data = vibeMatrix[key] || vibeMatrix["electric-night"];
    const t = $("#vibeResultTitle");
    const d = $("#vibeResultDesc");
    const b = $("#vibeResultBadge");
    const swatches = $("#vibeSwatches");
    
    if (t) t.textContent = data.title;
    if (d) d.textContent = data.desc;
    if (b) b.textContent = data.badge;
    if (swatches) {
      swatches.innerHTML = data.colors.map(c => `<span class="swatch" style="background:${c};"></span>`).join("");
    }
  }

  $$("#moodChips .vibe-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      $$("#moodChips .vibe-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeMood = btn.dataset.mood;
      updateVibeResult();
    });
  });

  $$("#occasionChips .vibe-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      $$("#occasionChips .vibe-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeOcc = btn.dataset.occ;
      updateVibeResult();
    });
  });
});


function highlightActiveNav() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const page = document.body.dataset.page;
  $$(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");
    const isCurrent = (currentFile === href) ||
      (currentFile === "" && href === "index.html") ||
      (page === "home" && href === "index.html") ||
      (page === "collections" && href === "collections.html") ||
      (page === "trending" && href === "trending.html") ||
      (page === "journal" && href === "style-journal.html") ||
      (page === "about" && href === "about.html");
    if (isCurrent) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function applyDynamicTypography() {
  document.querySelectorAll('body, body *').forEach(el => {
    if (['SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD', 'BR', 'WBR', 'svg', 'path'].includes(el.tagName.toLowerCase())) return;
    const fs = parseFloat(window.getComputedStyle(el).fontSize);
    if (!isNaN(fs) && fs > 0) {
      if (fs < 14) {
        el.style.fontSize = "14px";
      }
      if (fs > 20) {
        el.style.fontFamily = "'Kaushan Script', cursive";
        el.style.fontStyle = "italic";
      } else {
        el.style.fontFamily = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        el.style.fontStyle = "normal";
      }
    }
  });
}
