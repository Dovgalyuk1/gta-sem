// ============ GTA SEM ($GTASEM) ============
// Fill these in once the token is minted / socials exist — everything below
// (copy button, contract display, links, live chart) picks them up automatically.
const CONFIG = {
  CA: "", // e.g. "AVLHDtkj5K1zPxACnUbGybWQACBq9H9uatF42h7Kpump" — leave "" until minted
  PUMPSWAP_URL: "", // e.g. "https://pumpswap.fun/..." — placeholder link until set
  DEXSCREENER_URL: "", // e.g. "https://dexscreener.com/solana/..."
  TWITTER_URL: "", // e.g. "https://x.com/gtasem"
  TELEGRAM_URL: "", // e.g. "https://t.me/gtasem"
};

document.addEventListener("DOMContentLoaded", () => {
  const hasCA = Boolean(CONFIG.CA);

  // ---- contract address display ----
  const caValueEl = document.getElementById("ca-value");
  if (caValueEl) {
    caValueEl.textContent = hasCA ? CONFIG.CA : "NOT MINTED YET";
  }

  // ---- copy CA button ----
  const copyBtn = document.getElementById("copy-ca");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      if (!hasCA) return;
      try {
        await navigator.clipboard.writeText(CONFIG.CA);
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove("copied");
        }, 1500);
      } catch (err) {
        console.warn("Clipboard copy failed", err);
      }
    });
    if (!hasCA) {
      copyBtn.disabled = true;
      copyBtn.style.opacity = "0.5";
      copyBtn.style.cursor = "not-allowed";
    }
  }

  // ---- wire up every placeholder link from CONFIG ----
  const linkMap = {
    "link-pumpswap": CONFIG.PUMPSWAP_URL,
    "footer-pumpswap": CONFIG.PUMPSWAP_URL,
    "link-dexscreener": CONFIG.DEXSCREENER_URL,
    "footer-dexscreener": CONFIG.DEXSCREENER_URL,
    "link-x": CONFIG.TWITTER_URL,
    "footer-x": CONFIG.TWITTER_URL,
    "join-x": CONFIG.TWITTER_URL,
    "join-telegram": CONFIG.TELEGRAM_URL,
  };

  Object.entries(linkMap).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      // still a stub link — no destination set yet, just keep it inert
      el.href = "#";
      el.addEventListener("click", (e) => e.preventDefault());
      el.style.opacity = "0.7";
    }
  });

  // ---- "Buy" CTAs point at PumpSwap once set, otherwise scroll to contract bar ----
  document.querySelectorAll('a[href="#buy"]').forEach((btn) => {
    // leave nav "How to Buy" links alone; only the hero/primary CTA behaves specially
  });

  // ---- live chart embed ----
  const placeholder = document.getElementById("chart-placeholder");
  const iframe = document.getElementById("chart-iframe");
  if (hasCA && CONFIG.CA && placeholder && iframe) {
    iframe.src = `https://dexscreener.com/solana/${CONFIG.CA}?embed=1&theme=dark`;
    iframe.style.display = "block";
    placeholder.style.display = "none";
  }
});

