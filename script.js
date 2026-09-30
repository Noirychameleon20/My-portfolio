// ---------- Theme toggle (light / dark) ----------
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Hex dump of my name (hero) ----------
const NAME = "SUPRIYA THAPA | cyber security | Kathmandu";
const dumpBody = document.getElementById("dumpBody");
const dumpSize = document.getElementById("dumpSize");

function buildDump(text) {
  const bytes = Array.from(new TextEncoder().encode(text));
  dumpSize.textContent = bytes.length + " bytes";
  const perRow = 8;
  const rows = [];

  for (let i = 0; i < bytes.length; i += perRow) {
    const slice = bytes.slice(i, i + perRow);
    const offset = i.toString(16).padStart(4, "0");

    const hex = slice
      .map((b, j) => `<span class="byte" data-i="${i + j}">${b.toString(16).padStart(2, "0")}</span>`)
      .join(" ");

    const pad = "   ".repeat(perRow - slice.length); // keeps the ASCII column aligned

    const ascii = slice
      .map((b, j) => {
        const ch = b >= 32 && b < 127 ? String.fromCharCode(b) : ".";
        const safe = ch === "<" ? "&lt;" : ch === "&" ? "&amp;" : ch;
        return `<span class="byte asc" data-i="${i + j}">${safe}</span>`;
      })
      .join("");

    // rows fade in one after another on page load
    const delay = (i / perRow) * 0.12 + 0.2;
    rows.push(
      `<span class="row" style="animation-delay:${delay}s"><span class="off">${offset}</span>  ${hex}${pad}  ${ascii}</span>`
    );
  }
  dumpBody.innerHTML = rows.join("");
}
buildDump(NAME);

// hovering a hex byte highlights its ASCII twin (and vice versa)
function toggleTwin(e, on) {
  const el = e.target.closest(".byte");
  if (!el) return;
  dumpBody
    .querySelectorAll(`.byte[data-i="${el.dataset.i}"]`)
    .forEach((n) => n.classList.toggle("on", on));
}
dumpBody.addEventListener("mouseover", (e) => toggleTwin(e, true));
dumpBody.addEventListener("mouseout", (e) => toggleTwin(e, false));

// ---------- Contact form: opens the visitor's email app ----------
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent("Portfolio message from " + data.get("name"));
  const body = encodeURIComponent(
    data.get("message") + "\n\nFrom: " + data.get("name") + " (" + data.get("email") + ")"
  );
  window.location.href = `mailto:supriyathapa115@gmail.com?subject=${subject}&body=${body}`;
  note.textContent = "Opening your email app. If nothing happens, email me directly.";
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();