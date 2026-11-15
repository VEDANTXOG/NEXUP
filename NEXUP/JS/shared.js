/* =========================================================
                      NEXUP SHARED
     Helpers used by every page: storage, favourites,
     user listings, formatting, escaping, toasts, images.
     Load order on every page:  data.js  →  shared.js  →  page script
========================================================= */

(function () {
    "use strict";

    if (!window.NEXUP_DATA) {
        console.error("NEXUP: data.js must be loaded before shared.js");
        return;
    }

    const KEYS = {
        favorites: "nexupFavorites",
        listings: "nexupListings",
        profile: "nexupProfile",
        pipeline: "nexupPipeline"
    };

    /* =====================================================
                          STORAGE
       Every read and write is guarded, so a blocked or full
       localStorage never breaks a page.
    ===================================================== */

    const storage = {
        read(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                return raw === null ? fallback : JSON.parse(raw);
            } catch (error) {
                return fallback;
            }
        },
        write(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error("NEXUP: could not save", key, error);
                return false;
            }
        }
    };

    /* =====================================================
                       ESCAPING AND FORMATS
    ===================================================== */

    const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

    /** Escape text before putting it into innerHTML. */
    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ESCAPES[char]);
    }

    const trimZero = number => number.toFixed(1).replace(/\.0$/, "");

    const fmt = {
        /** 185000 → "$185K" */
        money(value) {
            const number = Number(value) || 0;
            if (number >= 1000000) return "$" + trimZero(number / 1000000) + "M";
            if (number >= 1000) return "$" + trimZero(number / 1000) + "K";
            return "$" + number;
        },
        /** 18200 → "$18.2K/mo" */
        revenue(value) {
            return fmt.money(value) + "/mo";
        },
        /** 143 → "+143%" */
        growth(value) {
            return "+" + (Number(value) || 0) + "%";
        },
        /** 2400 → "2.4K" */
        views(value) {
            const number = Number(value) || 0;
            return number >= 1000 ? trimZero(number / 1000) + "K" : String(number);
        }
    };

    /* =====================================================
                          FAVOURITES
       One key, one format: an array of venture ids.
    ===================================================== */

    // Older builds saved Marketplace hearts under a separate key. Merge them once.
    (function migrateLegacyFavorites() {
        const legacy = storage.read("nexupMarketplaceFavorites", null);
        if (!Array.isArray(legacy)) return;
        const merged = new Set([...storage.read(KEYS.favorites, []), ...legacy].map(Number));
        storage.write(KEYS.favorites, [...merged].filter(Number.isFinite));
        try { localStorage.removeItem("nexupMarketplaceFavorites"); } catch (error) { /* ignore */ }
    })();

    const favorites = {
        ids() {
            const stored = storage.read(KEYS.favorites, []);
            return Array.isArray(stored) ? stored.map(Number).filter(Number.isFinite) : [];
        },
        has(id) {
            return favorites.ids().includes(Number(id));
        },
        count() {
            return favorites.ids().length;
        },
        /** Adds or removes the venture. Returns true when it is now saved. */
        toggle(id) {
            const target = Number(id);
            const current = favorites.ids();
            const saved = !current.includes(target);
            storage.write(KEYS.favorites, saved ? [...current, target] : current.filter(item => item !== target));
            updateBadges();
            return saved;
        },
        remove(id) {
            const target = Number(id);
            storage.write(KEYS.favorites, favorites.ids().filter(item => item !== target));
            updateBadges();
        },
        /** Calls back when favourites change in another tab or when this tab becomes visible again. */
        onChange(callback) {
            window.addEventListener("storage", event => {
                if (event.key === KEYS.favorites) callback();
            });
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") callback();
            });
        }
    };

    /* =====================================================
                        USER LISTINGS
       Ventures created on the Sell page. They live in this
       browser only and are merged into the catalogue.
    ===================================================== */

    const isListing = item => item && typeof item === "object" && Number.isFinite(Number(item.id)) && typeof item.name === "string";

    const listings = {
        all() {
            const stored = storage.read(KEYS.listings, []);
            return Array.isArray(stored) ? stored.filter(isListing) : [];
        },
        /** Saves a new listing and returns it with its id, or null if the browser refused to store it. */
        add(fields) {
            const current = listings.all();
            const id = Math.max(1000, ...current.map(item => Number(item.id))) + 1;
            const listing = { ...fields, id, listed: true };
            return storage.write(KEYS.listings, [...current, listing]) ? listing : null;
        },
        remove(id) {
            const target = Number(id);
            storage.write(KEYS.listings, listings.all().filter(item => Number(item.id) !== target));
        }
    };

    /* =====================================================
                          PROFILE
    ===================================================== */

    const profile = {
        name() {
            const stored = storage.read(KEYS.profile, {});
            return stored && typeof stored.name === "string" ? stored.name : "";
        },
        setName(name) {
            return storage.write(KEYS.profile, { name: String(name).trim().slice(0, 40) });
        },
        initial() {
            return (profile.name().charAt(0) || "N").toUpperCase();
        }
    };

    /* =====================================================
                          CATALOGUE
    ===================================================== */

    const ventures = [...NEXUP_DATA.ventures, ...listings.all()];

    function byId(id) {
        return ventures.find(venture => venture.id === Number(id));
    }

    /** Category name → number of ventures, in display order. */
    function categoryCounts() {
        return NEXUP_DATA.categories.map(name => ({
            name,
            count: ventures.filter(venture => venture.category === name).length
        }));
    }

    /* =====================================================
                          IMAGES
       Any <img> that fails to load (offline, blocked, bad
       URL) is swapped for a branded placeholder.
    ===================================================== */

    const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>" +
        "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
        "<stop offset='0' stop-color='#101313'/><stop offset='1' stop-color='#050606'/></linearGradient></defs>" +
        "<rect width='800' height='500' fill='url(#g)'/>" +
        "<text x='400' y='290' text-anchor='middle' font-family='sans-serif' font-size='160' font-weight='700' fill='#8FF5D1' fill-opacity='.35'>N</text></svg>"
    );

    document.addEventListener("error", event => {
        const image = event.target;
        if (image && image.tagName === "IMG" && image.dataset.fallback !== "1") {
            image.dataset.fallback = "1";
            image.src = PLACEHOLDER;
        }
    }, true);

    /* =====================================================
                           TOAST
    ===================================================== */

    let toastTimer = 0;

    function toast(message) {
        let element = document.querySelector(".nexup-toast");
        if (!element) {
            element = document.createElement("div");
            element.className = "nexup-toast";
            element.setAttribute("role", "status");
            element.setAttribute("aria-live", "polite");
            Object.assign(element.style, {
                position: "fixed", left: "50%", bottom: "30px", zIndex: "9999",
                transform: "translateX(-50%) translateY(20px)", opacity: "0",
                padding: "13px 20px", background: "#111313", color: "#dde3df",
                border: "1px solid rgba(255,255,255,.14)", font: "600 12px Manrope, sans-serif",
                letterSpacing: ".04em", transition: "opacity .3s ease, transform .3s ease",
                pointerEvents: "none", maxWidth: "90vw"
            });
            document.body.appendChild(element);
        }
        element.textContent = message;
        requestAnimationFrame(() => {
            element.style.opacity = "1";
            element.style.transform = "translateX(-50%) translateY(0)";
        });
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            element.style.opacity = "0";
            element.style.transform = "translateX(-50%) translateY(20px)";
        }, 2600);
    }

    /* =====================================================
                  SHARED NAVIGATION BADGES
       Keeps the "saved" counter and the profile letter
       correct on every page without page-specific code.
    ===================================================== */

    function updateBadges() {
        const count = document.getElementById("favoriteCount");
        if (count) count.textContent = favorites.count();
        document.querySelectorAll(".profile-letter").forEach(letter => {
            letter.textContent = profile.initial();
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        updateBadges();

        // The "Saved" button in the header opens the Favorites page.
        document.querySelectorAll(".favorites-nav").forEach(button => {
            button.addEventListener("click", () => {
                if (!/favorites\.html$/.test(window.location.pathname)) {
                    window.location.href = "favorites.html";
                }
            });
        });
    });
    favorites.onChange(updateBadges);

    /* =====================================================
                          PUBLIC API
    ===================================================== */

    window.NEXUP = Object.freeze({
        KEYS,
        storage,
        escapeHtml,
        fmt,
        favorites,
        listings,
        profile,
        ventures,
        categories: NEXUP_DATA.categories,
        pitchCards: NEXUP_DATA.pitchCards,
        byId,
        categoryCounts,
        placeholder: PLACEHOLDER,
        toast,
        prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
})();
