
const PRODUCTS = [
  { id: "midnight-midi", name: "Midnight Muse Midi", subtitle: "After-dark energy", price: 2499, tag: "BESTSELLER", category: "night", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=82" },
  { id: "soft-romance", name: "Soft Focus Dress", subtitle: "A softer kind of statement", price: 1899, tag: "NEW DROP", category: "soft", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=82" },
  { id: "city-after-dark", name: "City After Dark", subtitle: "The plan is the outfit", price: 2799, tag: "EDITOR'S PICK", category: "night", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=82" },
  { id: "weekend-state", name: "Weekend State of Mind", subtitle: "Easy all-day dressing", price: 1599, tag: "EVERYDAY", category: "everyday", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=82" },
  { id: "main-character", name: "Main Character Maxi", subtitle: "For the entrance", price: 3299, tag: "STATEMENT", category: "occasion", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=82" },
  { id: "daydream", name: "Daydream Slip Dress", subtitle: "Soft layers, strong mood", price: 2199, tag: "TRENDING", category: "soft", img: "https://images.unsplash.com/photo-1496744429379-4d8e6b8e6b9d?auto=format&fit=crop&w=700&q=82" }
];
const $ = (s, root = document) => root.querySelector(s), $$ = (s, root = document) => [...root.querySelectorAll(s)];
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } };
const write = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)) } catch { } };
function toast(message) { const el = $(".toast"); if (!el) return; el.textContent = message; el.classList.add("show"); clearTimeout(window._toastTimer); window._toastTimer = setTimeout(() => el.classList.remove("show"), 2600) }
function money(v) { return "₹" + Number(v).toLocaleString("en-IN") }
function renderProducts(grid, kind) {
  let list = kind === "featured" ? [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]] : kind === "recommended" ? [PRODUCTS[3], PRODUCTS[5], PRODUCTS[1], PRODUCTS[0]] : [...PRODUCTS]; if (kind === "all") { const active = $(".filter-pill.active")?.dataset.filter || "all"; if (active !== "all") list = list.filter(p => p.category === active); const sort = $("#sortProducts")?.value || "featured"; if (sort === "price-low") list.sort((a, b) => a.price - b.price); if (sort === "price-high") list.sort((a, b) => b.price - a.price); if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name)) }
  const saved = read("forme_saved", []); grid.innerHTML = list.map(p => `<article class="product-card"><div class="product-image-wrap"><a href="product.html?id=${p.id}" aria-label="View ${p.name}"><img loading="lazy" src="${p.img}" alt="${p.name}"></a><span class="product-badge">${p.tag}</span><button class="heart-btn ${saved.includes(p.id) ? "saved" : ""}" data-fav="${p.id}" aria-label="Save ${p.name}">${saved.includes(p.id) ? "♥" : "♡"}</button><button class="quick-add" data-add="${p.id}">Add to bag · ${money(p.price)}</button></div><div class="product-info"><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p>${money(p.price)}</p></div><div class="product-subtitle">${p.subtitle}</div></article>`).join(""); applyDynamicTypography()
}
function renderBag() { const items = read("forme_bag", []); $$(".bag-count").forEach(el => el.textContent = items.reduce((n, x) => n + x.qty, 0)); const container = $("#bagItems"); if (!container) return; $("#bagItemCount").textContent = `${items.reduce((n, x) => n + x.qty, 0)} PIECES`; $("#bagEmpty").hidden = items.length > 0; container.innerHTML = items.map(x => { const p = PRODUCTS.find(p => p.id === x.id); if (!p) return ""; return `<article class="bag-item"><img src="${p.img}" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.subtitle}</p><p>Qty: ${x.qty}</p><button class="remove-item" data-remove="${p.id}">Remove</button></div><b>${money(p.price * x.qty)}</b></article>` }).join(""); const total = items.reduce((n, x) => n + (PRODUCTS.find(p => p.id === x.id)?.price || 0) * x.qty, 0); $("#bagSubtotal").textContent = money(total); $("#bagTotal").textContent = money(total); applyDynamicTypography() }
function addToBag(id) { const bag = read("forme_bag", []); const found = bag.find(x => x.id === id); if (found) found.qty++; else bag.push({ id, qty: 1 }); write("forme_bag", bag); renderBag(); toast("Added to your bag ✳") }
function openAccount(tab = "login") { const modal = $("#accountModal"); if (!modal) return; modal.hidden = false; document.body.style.overflow = "hidden"; setAuthTab(tab); applyDynamicTypography(); $(".modal-close")?.focus() }
function closeAccount() { const modal = $("#accountModal"); if (modal) { modal.hidden = true; document.body.style.overflow = "" } }
function setAuthTab(tab) { $$(".auth-tab").forEach(b => b.classList.toggle("active", b.dataset.auth === tab)); const signup = tab === "signup"; $(".signup-only").hidden = !signup; $("#authSubmit").textContent = signup ? "Create my account ↗" : "Log in ↗"; $("#modalTitle").innerHTML = signup ? "Your style era<br><em>starts here.</em>" : "Good looks.<br><em>Good to see you.</em>"; $("#authFeedback").textContent = "Demo only — no password is stored or sent." }
document.addEventListener("DOMContentLoaded", () => {
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  const menu = $(".mobile-menu"), nav = $(".main-nav"); menu?.addEventListener("click", () => { const opened = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(opened)); menu.textContent = opened ? "×" : "☰" });
  $$(".account-open").forEach(b => b.addEventListener("click", () => openAccount("login"))); $(".modal-close")?.addEventListener("click", closeAccount); $("#accountModal")?.addEventListener("click", e => { if (e.target.id === "accountModal") closeAccount() }); document.addEventListener("keydown", e => { if (e.key === "Escape") closeAccount() }); $$(".auth-tab").forEach(b => b.addEventListener("click", () => setAuthTab(b.dataset.auth)));
  $("#authForm")?.addEventListener("submit", e => { e.preventDefault(); const tab = $(".auth-tab.active").dataset.auth; $("#authFeedback").textContent = tab === "signup" ? "Signup form validated for demo. No account was created." : "Login form validated for demo. No authentication was performed."; toast(tab === "signup" ? "Demo signup validated" : "Demo login validated") });
  $$("[data-product-grid]").forEach(grid => renderProducts(grid, grid.dataset.productGrid));
  document.addEventListener("click", e => { const add = e.target.closest("[data-add]"); if (add) addToBag(add.dataset.add); const fav = e.target.closest("[data-fav]"); if (fav) { const saved = read("forme_saved", []), id = fav.dataset.fav; const next = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id]; write("forme_saved", next); fav.classList.toggle("saved", next.includes(id)); fav.textContent = next.includes(id) ? "♥" : "♡"; toast(next.includes(id) ? "Saved to your style list" : "Removed from saved looks") } const remove = e.target.closest("[data-remove]"); if (remove) { write("forme_bag", read("forme_bag", []).filter(x => x.id !== remove.dataset.remove)); renderBag(); toast("Removed from your bag") } });
  $$(".filter-pill").forEach(b => b.addEventListener("click", () => { $$(".filter-pill").forEach(x => x.classList.toggle("active", x === b)); const grid = $('[data-product-grid="all"]'); if (grid) renderProducts(grid, "all") }));
  $("#sortProducts")?.addEventListener("change", () => { const grid = $('[data-product-grid="all"]'); if (grid) renderProducts(grid, "all") });
  renderBag(); $("#checkoutBtn")?.addEventListener("click", () => toast("Checkout is a demo only — no payment was taken."));
  $$("[data-save-story]").forEach(b => { const saved = read("forme_stories", []); if (saved.includes(b.dataset.saveStory)) { b.classList.add("saved"); b.textContent = "♥ Saved" } b.addEventListener("click", () => { let current = read("forme_stories", []); const id = b.dataset.saveStory; current = current.includes(id) ? current.filter(x => x !== id) : [...current, id]; write("forme_stories", current); b.classList.toggle("saved", current.includes(id)); b.textContent = current.includes(id) ? "♥ Saved" : "♡ Save this idea"; const out = $("#savedStories"); if (out) out.textContent = current.length ? `Saved ideas: ${current.map(x => ({ layering: "Layer it like you meant it", colour: "Color that changes the mood", repeat: "Repeat outfits, repeat confidence" }[x])).join(" · ")}` : "No saved ideas yet. Tap “Save this idea” to keep one here on this device." }) });
  $$(".newsletter-form").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); $(".form-feedback", f).textContent = "You're on the demo list — no email was sent."; f.reset() }));
  applyDynamicTypography();
});

function applyDynamicTypography() {
  document.querySelectorAll('body, body *').forEach(el => {
    if (['SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD', 'BR', 'WBR'].includes(el.tagName)) return;
    const fs = parseFloat(window.getComputedStyle(el).fontSize);
    if (!isNaN(fs) && fs > 0) {
      if (fs < 12) {
        el.style.fontSize = "12px";
      }
      el.style.fontFamily = "'Kaushan Script', cursive";
      if (fs > 20) {
        el.style.fontStyle = "italic";
      } else {
        el.style.fontStyle = "normal";
      }
    }
  });
}

