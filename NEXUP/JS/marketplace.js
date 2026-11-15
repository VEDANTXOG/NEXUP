/* ======================================================
                    NEXUP MARKETPLACE
====================================================== */

/* ======================================================
                    VENTURE DATA
====================================================== */
const ventures = NEXUP.ventures;
const esc = NEXUP.escapeHtml;

/* ======================================================
                       STATE
====================================================== */
let activeCategory = "All";
let activeFilter = "all";
let searchTerm = "";
let featuredIndex = 0;

/* ======================================================
                       ELEMENTS
====================================================== */
const ventureGrid = document.getElementById("ventureGrid");
const searchInput = document.getElementById("searchInput");
const ventureCount = document.getElementById("ventureCount");
const resultCount = document.getElementById("resultCount");
const resultEmpty = document.getElementById("emptyState");
const resetButton = document.getElementById("resetButton");
const sortSelect = document.getElementById("sortSelect");
const categoryRow = document.getElementById("categoryRow");

/* The Sell page can list Fintech, Health and Other, so the filter bar offers them too. */
NEXUP.categories.forEach(name => {
    const exists = [...categoryRow.children].some(pill => pill.dataset.category === name);
    if (exists) return;

    const pill = document.createElement("button");
    pill.className = "category-pill";
    pill.type = "button";
    pill.dataset.category = name;
    pill.textContent = name;
    categoryRow.appendChild(pill);
});

const categoryButtons = document.querySelectorAll(".category-pill");
const filterButtons = document.querySelectorAll(".filter-button");
const featuredName = document.getElementById("featuredName");
const featuredDescription = document.getElementById("featuredDescription");
const featuredRevenue = document.getElementById("featuredRevenue");
const featuredGrowth = document.getElementById("featuredGrowth");
const featuredPrice = document.getElementById("featuredPrice");
const featuredImage = document.getElementById("featuredImage");
const featuredDots = document.getElementById("featuredDots");

/* ======================================================
                     FORMAT MONEY
====================================================== */

const money = NEXUP.fmt.money;
const revenue = NEXUP.fmt.revenue;
const formatViews = NEXUP.fmt.views;

/* ======================================================
                      FAVORITES
====================================================== */
function toggleFavorite(id) {
    NEXUP.favorites.toggle(id);
    renderVentures();
    updateFeaturedHeart();
}

/* ======================================================
                    CREATE CARD
====================================================== */

function createCard(venture) {
    const favorite = NEXUP.favorites.has(venture.id);
    return `

        <article
            class="venture-card reveal-card"
            data-venture-id="${venture.id}"
            tabindex="0"
            role="link"
            aria-label="Open ${esc(venture.name)}"
        >

            <div class="card-image">

                <img
                    src="${esc(venture.image || NEXUP.placeholder)}"
                    alt="${esc(venture.name)}"
                    loading="lazy"
                >

                <span class="card-category">
                    ${esc(venture.category)}
                </span>

                <div class="pitch-overlay">

                    <div class="pitch-label">
                        THE PITCH
                    </div>

                    <div class="pitch-text">
                        ${esc(venture.pitch)}
                    </div>

                    <button
                        class="pitch-action"
                        data-pitch="${venture.id}"
                        type="button"
                    >
                        READ THE PITCH
                        <span>↗</span>
                    </button>

                </div>

            </div>

            <div class="card-info">

                <div class="card-verified">

                    ${venture.verified
        ?
            `<span>✓</span> Verified`
        :
            ""}

                </div>

                <h3>
                    ${esc(venture.name)}
                </h3>

                <p class="card-description">
                    ${esc(venture.description)}
                </p>

                <div class="card-stats">

                    <div class="card-stat">

                        <span>
                            Revenue
                        </span>

                        <strong>
                            ${revenue(venture.revenue)}
                        </strong>

                    </div>

                    <div class="card-stat">

                        <span>
                            Growth
                        </span>

                        <strong class="mint">
                            +${venture.growth}%
                        </strong>

                    </div>

                    <div class="card-stat">

                        <span>
                            Asking Price
                        </span>

                        <strong>
                            ${money(venture.price)}
                        </strong>

                    </div>

                </div>

                <div class="card-footer">

                    <div class="seller">

                        <div class="seller-avatar">
                            ${esc(venture.icon)}
                        </div>

                        ${esc(venture.seller)}

                    </div>

                    <div class="card-meta">

                        <span>
                            ◉
                            ${formatViews(venture.views)}
                            views
                        </span>

                        <button
                            class="card-favorite ${favorite ? "active" : ""}"
                            data-favorite="${venture.id}"
                            aria-label="Favorite ${esc(venture.name)}"
                            type="button"
                        >
                            ${favorite ? "♥" : "♡"}
                        </button>

                    </div>

                </div>

            </div>

        </article>

    `;
}

/* ======================================================
                   FILTER ENGINE
====================================================== */

function getResults() {
    let results = [...ventures];
    if (activeCategory !== "All") {
        results =
            results.filter(venture => venture.category === activeCategory);
    }
    if (searchTerm.trim()) {
        const query = searchTerm
            .toLowerCase()
            .trim();
        results =
            results.filter(venture => {
                return (venture.name
                    .toLowerCase()
                    .includes(query)
                    ||
                        venture.category
                            .toLowerCase()
                            .includes(query)
                    ||
                        venture.description
                            .toLowerCase()
                            .includes(query)
                    ||
                        venture.pitch
                            .toLowerCase()
                            .includes(query)
                    ||
                        venture.seller
                            .toLowerCase()
                            .includes(query));
            });
    }
    if (activeFilter === "growth") {
        results =
            results.filter(venture => venture.growth >= 100);
    }
    if (activeFilter === "under50") {
        results =
            results.filter(venture => venture.price < 50000);
    }
    if (activeFilter === "verified") {
        results =
            results.filter(venture => venture.verified);
    }
    switch (sortSelect.value) {
        case "growth":
            results.sort((a, b) => b.growth - a.growth);
            break;
        case "price-low":
            results.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            results.sort((a, b) => b.price - a.price);
            break;
        default:
            results.sort((a, b) => Number(b.featured) -
                Number(a.featured));
    }
    return results;
}

/* ======================================================
                       RENDER
====================================================== */

function renderVentures() {
    const results = getResults();
    ventureGrid.innerHTML =
        results
            .map(createCard)
            .join("");
    resultCount.textContent =
        results.length;
    ventureCount.textContent =
        ventures.length;
    if (!results.length) {
        resultEmpty.classList.add("visible");
        ventureGrid.style.display =
            "none";
    }
    else {
        resultEmpty.classList.remove("visible");
        ventureGrid.style.display =
            "grid";
    }
    attachFavoriteButtons();
    setupCardInteractions();
    setupCardReveal();
}

/* ======================================================
                 FAVORITE BUTTONS
====================================================== */

function attachFavoriteButtons() {
    document
        .querySelectorAll("[data-favorite]")
        .forEach(button => {
        button.addEventListener("click", event => {
            event.stopPropagation();
            toggleFavorite(Number(button.dataset.favorite));
        });
    });
}

/* ======================================================
                CARD INTERACTIONS
====================================================== */

function setupCardInteractions() {
    document
        .querySelectorAll(".venture-card")
        .forEach(card => {
        /*
         * WHOLE CARD → VENTURE
         */
        card.addEventListener("click", event => {
            if (event.target.closest(".card-favorite")) {
                return;
            }
            if (event.target.closest(".pitch-action")) {
                return;
            }
            const ventureId = Number(card.dataset.ventureId);
            if (!ventureId)
                return;
            window.location.href =
                `venture.html?id=${encodeURIComponent(ventureId)}`;
        });
        /* Keyboard: Enter or Space on the card itself opens the venture */
        card.addEventListener("keydown", event => {
            if (event.target !== card || (event.key !== "Enter" && event.key !== " ")) {
                return;
            }

            event.preventDefault();
            window.location.href = `venture.html?id=${encodeURIComponent(card.dataset.ventureId)}`;
        });
        /*
         * READ THE PITCH → CORRECT PITCH
         */
        const pitchButton = card.querySelector(".pitch-action");
        if (pitchButton) {
            pitchButton.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                const pitchId = Number(pitchButton.dataset.pitch);
                if (!pitchId)
                    return;
                /*
                 * IMPORTANT:
                 * The ID comes directly from
                 * the venture card that was clicked.
                 */
                const pitchURL = `pitch.html?id=${encodeURIComponent(pitchId)}`;
                window.location.href =
                    pitchURL;
            });
        }
    });
}

/* ======================================================
                       SEARCH
====================================================== */
searchInput.addEventListener("input", event => {
    searchTerm =
        event.target.value;
    renderVentures();
});

/* ======================================================
                    CATEGORIES
====================================================== */
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        activeCategory =
            button.dataset.category;
        renderVentures();
        document
            .getElementById("ventures")
            .scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* ======================================================
                     FILTERS
====================================================== */
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        activeFilter =
            button.dataset.filter;
        renderVentures();
    });
});

/* ======================================================
                       SORT
====================================================== */
sortSelect.addEventListener("change", renderVentures);

/* ======================================================
                       RESET
====================================================== */
resetButton.addEventListener("click", () => {
    searchTerm = "";
    activeCategory = "All";
    activeFilter = "all";
    searchInput.value = "";
    sortSelect.value = "featured";
    categoryButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.category === "All");
    });
    filterButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === "all");
    });
    renderVentures();
});

/* ======================================================
                 FEATURED CAROUSEL
====================================================== */
const featuredVentures = ventures.filter(venture => venture.featured);

function renderFeatured() {
    const venture = featuredVentures[featuredIndex];
    if (!venture)
        return;
    featuredName.textContent =
        venture.name;
    featuredDescription.textContent =
        venture.description;
    featuredRevenue.textContent =
        revenue(venture.revenue);
    featuredGrowth.textContent =
        "+" + venture.growth + "%";
    featuredPrice.textContent =
        money(venture.price);
    featuredImage.src =
        venture.image;
    featuredImage.alt =
        venture.name;
    renderDots();
    updateFeaturedHeart();
}

function renderDots() {
    featuredDots.innerHTML =
        featuredVentures
            .map((_, index) => `

                    <span
                        class="featured-dot ${index === featuredIndex
            ? "active"
            : ""}"
                    ></span>

                `)
            .join("");
}
document
    .getElementById("featuredNext")
    .addEventListener("click", () => {
    featuredIndex++;
    if (featuredIndex >=
        featuredVentures.length) {
        featuredIndex = 0;
    }
    renderFeatured();
});
document
    .getElementById("featuredPrev")
    .addEventListener("click", () => {
    featuredIndex--;
    if (featuredIndex < 0) {
        featuredIndex =
            featuredVentures.length - 1;
    }
    renderFeatured();
});

/* ======================================================
                 FEATURED VENTURE BUTTON
====================================================== */
document
    .querySelector(".view-button")
    .addEventListener("click", event => {
    event.preventDefault();
    const venture = featuredVentures[featuredIndex];
    if (!venture)
        return;
    window.location.href =
        `venture.html?id=${encodeURIComponent(venture.id)}`;
});

/* ======================================================
                 FEATURED FAVORITE
====================================================== */

function updateFeaturedHeart() {
    const venture = featuredVentures[featuredIndex];
    if (!venture)
        return;
    document
        .getElementById("featuredHeart")
        .textContent =
        NEXUP.favorites.has(venture.id)
            ? "♥"
            : "♡";
}
document
    .getElementById("featuredHeart")
    .addEventListener("click", event => {
    event.stopPropagation();
    const venture = featuredVentures[featuredIndex];
    if (!venture)
        return;
    toggleFavorite(venture.id);
});

/* ======================================================
                    SCROLL REVEAL
====================================================== */

function setupCardReveal() {
    const cards = document.querySelectorAll(".reveal-card");

    if (NEXUP.prefersReducedMotion) {
        cards.forEach(card => card.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = [...cards]
                    .indexOf(card)
                    * 70;
                setTimeout(() => {
                    card.classList.add("visible");
                }, delay);
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.12
    });
    cards.forEach(card => observer.observe(card));
}
const revealSections = document.querySelectorAll(".reveal");
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});
revealSections.forEach(section => sectionObserver.observe(section));

/* ======================================================
                    KEYBOARD SEARCH
====================================================== */
document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.focus();
    }
    if (event.key === "/" &&
        document.activeElement !== searchInput) {
        event.preventDefault();
        searchInput.focus();
    }
});

/* ======================================================
                     NAV SEARCH
====================================================== */
document
    .getElementById("navSearch")
    .addEventListener("click", () => {
    searchInput.focus();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ======================================================
                       INIT
====================================================== */
/* Deep links: marketplace.html?category=AI&q=flow */
(function applyUrlFilters() {
    const params = new URLSearchParams(window.location.search);
    const category = (params.get("category") || "").toLowerCase();
    const query = params.get("q") || "";

    const match = [...categoryButtons].find(button => button.dataset.category.toLowerCase() === category);

    if (match) {
        categoryButtons.forEach(button => button.classList.toggle("active", button === match));
        activeCategory = match.dataset.category;
    }

    if (query) {
        searchTerm = query;
        searchInput.value = query;
    }

    if (params.get("focus") === "search") {
        searchInput.focus();
    }
})();

renderVentures();
renderFeatured();
