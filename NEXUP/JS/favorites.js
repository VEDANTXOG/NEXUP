/* =========================================================
                    NEXUP FAVORITES
                  Saved ventures page
========================================================= */

const esc = NEXUP.escapeHtml;

/* =========================================================
                       DATA
========================================================= */

function getSavedVentures() {
    return NEXUP.favorites
        .ids()
        .map(id => NEXUP.byId(id))
        .filter(Boolean);
}

/* =========================================================
                    COUNTERS + EMPTY STATE
========================================================= */

function updateCounters(count) {
    const heroCount = document.getElementById("heroCount");
    const sectionCount = document.getElementById("sectionCount");

    if (heroCount) heroCount.textContent = count;
    if (sectionCount) sectionCount.textContent = String(count).padStart(2, "0");
}

function updateEmptyState(count) {
    const emptyState = document.getElementById("emptyState");
    if (!emptyState) return;

    emptyState.classList.toggle("show", count === 0);
    emptyState.style.display = count === 0 ? "grid" : "none";
}

/* =========================================================
                    CARD CREATION
========================================================= */

function createFavoriteCard(venture, index) {
    return `
        <article
            class="favorite-card"
            data-venture-id="${venture.id}"
            tabindex="0"
            role="link"
            aria-label="Open ${esc(venture.name)}"
        >
            <div class="favorite-card-top">
                <span class="favorite-number">SAVED / ${String(index + 1).padStart(2, "0")}</span>
                <span class="favorite-category">${esc(venture.category)}</span>
            </div>

            <div class="favorite-main">
                <h3>${esc(venture.name)}</h3>
                <p class="favorite-description">${esc(venture.description)}</p>
            </div>

            <div class="favorite-footer">
                <div class="favorite-seller">
                    <span>FOUNDER</span>
                    <span>${esc(venture.seller)}</span>
                </div>

                <div class="favorite-actions">
                    <span class="view-venture">VIEW VENTURE ↗</span>
                    <button
                        class="remove-favorite"
                        type="button"
                        data-remove-id="${venture.id}"
                        aria-label="Remove ${esc(venture.name)} from favorites"
                    >♥</button>
                </div>
            </div>
        </article>
    `;
}

/* =========================================================
                    RENDER
========================================================= */

function renderFavorites() {
    const grid = document.getElementById("favoritesGrid");
    if (!grid) return;

    const saved = getSavedVentures();

    updateCounters(saved.length);
    updateEmptyState(saved.length);

    grid.innerHTML = saved.map(createFavoriteCard).join("");

    if (saved.length) {
        setupReveal();
    }
}

/* =========================================================
                    EVENTS (one delegated listener)
========================================================= */

function openVenture(id) {
    if (id) window.location.href = `venture.html?id=${encodeURIComponent(id)}`;
}

function setupGridEvents() {
    const grid = document.getElementById("favoritesGrid");
    if (!grid) return;

    grid.addEventListener("click", event => {
        const removeButton = event.target.closest(".remove-favorite");

        if (removeButton) {
            event.stopPropagation();
            NEXUP.favorites.remove(removeButton.dataset.removeId);
            renderFavorites();
            return;
        }

        const card = event.target.closest(".favorite-card");
        if (card) openVenture(card.dataset.ventureId);
    });

    grid.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;

        const card = event.target.closest(".favorite-card");
        if (card && event.target === card) {
            event.preventDefault();
            openVenture(card.dataset.ventureId);
        }
    });
}

/* =========================================================
                    REVEAL
========================================================= */

function setupReveal() {
    const cards = document.querySelectorAll(".favorite-card");

    if (!("IntersectionObserver" in window) || NEXUP.prefersReducedMotion) {
        cards.forEach(card => card.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    cards.forEach(card => observer.observe(card));
}

/* =========================================================
                    INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
    setupGridEvents();

    document.getElementById("profileBtn")?.addEventListener("click", () => {
        window.location.href = "profile.html";
    });

    NEXUP.favorites.onChange(renderFavorites);
});
