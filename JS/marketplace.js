/* ======================================================
                    NEXUP MARKETPLACE
====================================================== */


/* ======================================================
                    VENTURE DATA
====================================================== */

const ventures = [

    {
        id: 1,
        name: "NovaMind AI",
        category: "AI",
        description:
            "AI automation platform helping modern businesses eliminate repetitive work.",
        pitch:
            "We're building the operating layer for businesses that are tired of repetitive work.",
        revenue: 18200,
        growth: 143,
        price: 185000,
        views: 2400,
        seller: "Alex Carter",
        verified: true,
        featured: true,
        icon: "N",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 2,
        name: "FlowDesk",
        category: "SaaS",
        description:
            "A lightweight workspace built for fast-moving teams.",
        pitch:
            "The simpler your workspace becomes, the faster your team can actually move.",
        revenue: 9200,
        growth: 87,
        price: 78000,
        views: 1800,
        seller: "Daniel Ross",
        verified: true,
        featured: true,
        icon: "F",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 3,
        name: "GameForge",
        category: "Gaming",
        description:
            "Community-driven tools for independent game creators.",
        pitch:
            "Independent creators shouldn't need a massive studio to build something people remember.",
        revenue: 4300,
        growth: 121,
        price: 42000,
        views: 3100,
        seller: "Ryan Cole",
        verified: true,
        featured: true,
        icon: "G",
        image:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 4,
        name: "UrbanCart",
        category: "E-Commerce",
        description:
            "A curated marketplace connecting local brands with buyers.",
        pitch:
            "The next generation of commerce won't feel like a catalogue. It'll feel curated.",
        revenue: 12600,
        growth: 96,
        price: 115000,
        views: 2700,
        seller: "Maya Singh",
        verified: true,
        featured: true,
        icon: "U",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 5,
        name: "LearnMate",
        category: "Apps",
        description:
            "Personalized learning companion for ambitious students.",
        pitch:
            "Learning shouldn't stop when the lesson ends. LearnMate follows the learner.",
        revenue: 6700,
        growth: 156,
        price: 49000,
        views: 4200,
        seller: "Arjun Mehta",
        verified: true,
        featured: true,
        icon: "L",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 6,
        name: "EcoDrive",
        category: "Startup",
        description:
            "Technology helping cities transition toward cleaner mobility.",
        pitch:
            "Cleaner cities won't be built by tomorrow. They'll be built by better decisions today.",
        revenue: 15400,
        growth: 112,
        price: 240000,
        views: 3800,
        seller: "Noah Wilson",
        verified: true,
        featured: true,
        icon: "E",
        image:
            "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 7,
        name: "PixelPilot",
        category: "AI",
        description:
            "AI-powered creative workflow for modern design teams.",
        pitch:
            "Creative teams don't need more tools. They need fewer things standing between an idea and the final frame.",
        revenue: 5300,
        growth: 134,
        price: 36000,
        views: 1600,
        seller: "Leo Martin",
        verified: false,
        featured: false,
        icon: "P",
        image:
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 8,
        name: "TaskOrbit",
        category: "SaaS",
        description:
            "Simple project intelligence without the clutter.",
        pitch:
            "Project management should tell you what matters next — not bury you in another dashboard.",
        revenue: 8100,
        growth: 105,
        price: 62000,
        views: 2200,
        seller: "Chris Evans",
        verified: true,
        featured: false,
        icon: "T",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 9,
        name: "QuickBite",
        category: "E-Commerce",
        description:
            "A fast-growing discovery platform for independent food brands.",
        pitch:
            "The best food brands are already out there. We're building the place where people finally discover them.",
        revenue: 3900,
        growth: 178,
        price: 28000,
        views: 1900,
        seller: "Sam Wilson",
        verified: false,
        featured: false,
        icon: "Q",
        image:
            "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1000&q=85"
    }

];


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

const ventureGrid =
    document.getElementById("ventureGrid");

const searchInput =
    document.getElementById("searchInput");

const ventureCount =
    document.getElementById("ventureCount");

const resultCount =
    document.getElementById("resultCount");

const resultEmpty =
    document.getElementById("emptyState");

const resetButton =
    document.getElementById("resetButton");

const sortSelect =
    document.getElementById("sortSelect");

const categoryButtons =
    document.querySelectorAll(".category-pill");

const filterButtons =
    document.querySelectorAll(".filter-button");

const featuredName =
    document.getElementById("featuredName");

const featuredDescription =
    document.getElementById("featuredDescription");

const featuredRevenue =
    document.getElementById("featuredRevenue");

const featuredGrowth =
    document.getElementById("featuredGrowth");

const featuredPrice =
    document.getElementById("featuredPrice");

const featuredImage =
    document.getElementById("featuredImage");

const featuredDots =
    document.getElementById("featuredDots");


/* ======================================================
                     FORMAT MONEY
====================================================== */

function money(value) {

    if (value >= 1000000) {

        return "$" +
            (value / 1000000)
                .toFixed(1)
                .replace(".0", "") +
            "M";
    }

    if (value >= 1000) {

        return "$" +
            (value / 1000)
                .toFixed(1)
                .replace(".0", "") +
            "K";
    }

    return "$" + value;
}


function revenue(value) {

    return money(value) + "/mo";
}


function formatViews(value) {

    if (value >= 1000) {

        return (
            value / 1000
        ).toFixed(1) + "K";
    }

    return value;
}


/* ======================================================
                      FAVORITES
====================================================== */

const FAVORITES_KEY =
    "nexupMarketplaceFavorites";


function getFavorites() {

    return JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]"
    );
}


function saveFavorites(items) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(items)
    );
}


function toggleFavorite(id) {

    let favorites = getFavorites();

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

    } else {

        favorites.push(id);
    }

    saveFavorites(favorites);

    renderVentures();

    updateFeaturedHeart();
}


/* ======================================================
                    CREATE CARD
====================================================== */

function createCard(venture) {

    const favorites =
        getFavorites();

    const favorite =
        favorites.includes(venture.id);


    return `

        <article
            class="venture-card reveal-card"
            data-venture-id="${venture.id}"
        >

            <div class="card-image">

                <img
                    src="${venture.image}"
                    alt="${venture.name}"
                    loading="lazy"
                >


                <span class="card-category">
                    ${venture.category}
                </span>


                <div class="pitch-overlay">

                    <div class="pitch-label">
                        THE PITCH
                    </div>


                    <div class="pitch-text">
                        ${venture.pitch}
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

                    ${
                        venture.verified
                        ?
                        `<span>✓</span> Verified`
                        :
                        ""
                    }

                </div>


                <h3>
                    ${venture.name}
                </h3>


                <p class="card-description">
                    ${venture.description}
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
                            ${venture.icon}
                        </div>

                        ${venture.seller}

                    </div>


                    <div class="card-meta">

                        <span>
                            ◉
                            ${formatViews(venture.views)}
                            views
                        </span>


                        <button
                            class="card-favorite ${
                                favorite ? "active" : ""
                            }"
                            data-favorite="${venture.id}"
                            aria-label="Favorite ${venture.name}"
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
            results.filter(
                venture =>
                    venture.category === activeCategory
            );
    }


    if (searchTerm.trim()) {

        const query =
            searchTerm
                .toLowerCase()
                .trim();


        results =
            results.filter(venture => {

                return (

                    venture.name
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
                        .includes(query)

                );

            });
    }


    if (activeFilter === "growth") {

        results =
            results.filter(
                venture =>
                    venture.growth >= 100
            );
    }


    if (activeFilter === "under50") {

        results =
            results.filter(
                venture =>
                    venture.price < 50000
            );
    }


    if (activeFilter === "verified") {

        results =
            results.filter(
                venture =>
                    venture.verified
            );
    }


    switch (sortSelect.value) {

        case "growth":

            results.sort(
                (a, b) =>
                    b.growth - a.growth
            );

            break;


        case "price-low":

            results.sort(
                (a, b) =>
                    a.price - b.price
            );

            break;


        case "price-high":

            results.sort(
                (a, b) =>
                    b.price - a.price
            );

            break;


        default:

            results.sort(
                (a, b) =>
                    Number(b.featured) -
                    Number(a.featured)
            );

    }


    return results;
}


/* ======================================================
                       RENDER
====================================================== */

function renderVentures() {

    const results =
        getResults();


    ventureGrid.innerHTML =
        results
            .map(createCard)
            .join("");


    resultCount.textContent =
        results.length;


    ventureCount.textContent =
        ventures.length;


    if (!results.length) {

        resultEmpty.classList.add(
            "visible"
        );

        ventureGrid.style.display =
            "none";

    } else {

        resultEmpty.classList.remove(
            "visible"
        );

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

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    toggleFavorite(
                        Number(
                            button.dataset.favorite
                        )
                    );

                }
            );

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

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".card-favorite"
                        )
                    ) {
                        return;
                    }


                    if (
                        event.target.closest(
                            ".pitch-action"
                        )
                    ) {
                        return;
                    }


                    const ventureId =
                        Number(
                            card.dataset.ventureId
                        );


                    if (!ventureId) return;


                    window.location.href =
                        `venture.html?id=${encodeURIComponent(ventureId)}`;

                }
            );


            /*
             * READ THE PITCH → CORRECT PITCH
             */

            const pitchButton =
                card.querySelector(
                    ".pitch-action"
                );


            if (pitchButton) {

                pitchButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        const pitchId =
                            Number(
                                pitchButton.dataset.pitch
                            );


                        if (!pitchId) return;


                        /*
                         * IMPORTANT:
                         * The ID comes directly from
                         * the venture card that was clicked.
                         */

                        const pitchURL =
                            `pitch.html?id=${encodeURIComponent(pitchId)}`;


                        window.location.href =
                            pitchURL;

                    }
                );

            }

        });
}


/* ======================================================
                       SEARCH
====================================================== */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value;

        renderVentures();

    }
);


/* ======================================================
                    CATEGORIES
====================================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            activeCategory =
                button.dataset.category;


            renderVentures();


            document
                .getElementById("ventures")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* ======================================================
                     FILTERS
====================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            activeFilter =
                button.dataset.filter;


            renderVentures();

        }
    );

});


/* ======================================================
                       SORT
====================================================== */

sortSelect.addEventListener(
    "change",
    renderVentures
);


/* ======================================================
                       RESET
====================================================== */

resetButton.addEventListener(
    "click",
    () => {

        searchTerm = "";

        activeCategory = "All";

        activeFilter = "all";

        searchInput.value = "";

        sortSelect.value = "featured";


        categoryButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category === "All"
                );

            }
        );


        filterButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === "all"
                );

            }
        );


        renderVentures();

    }
);


/* ======================================================
                 FEATURED CAROUSEL
====================================================== */

const featuredVentures =
    ventures.filter(
        venture =>
            venture.featured
    );


function renderFeatured() {

    const venture =
        featuredVentures[
            featuredIndex
        ];


    if (!venture) return;


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
            .map(
                (_, index) => `

                    <span
                        class="featured-dot ${
                            index === featuredIndex
                                ? "active"
                                : ""
                        }"
                    ></span>

                `
            )
            .join("");
}


document
    .getElementById("featuredNext")
    .addEventListener(
        "click",
        () => {

            featuredIndex++;


            if (
                featuredIndex >=
                featuredVentures.length
            ) {

                featuredIndex = 0;

            }


            renderFeatured();

        }
    );


document
    .getElementById("featuredPrev")
    .addEventListener(
        "click",
        () => {

            featuredIndex--;


            if (
                featuredIndex < 0
            ) {

                featuredIndex =
                    featuredVentures.length - 1;

            }


            renderFeatured();

        }
    );


/* ======================================================
                 FEATURED VENTURE BUTTON
====================================================== */

document
    .querySelector(".view-button")
    .addEventListener(
        "click",
        event => {

            event.preventDefault();


            const venture =
                featuredVentures[
                    featuredIndex
                ];


            if (!venture) return;


            window.location.href =
                `venture.html?id=${encodeURIComponent(venture.id)}`;

        }
    );


/* ======================================================
                 FEATURED FAVORITE
====================================================== */

function updateFeaturedHeart() {

    const venture =
        featuredVentures[
            featuredIndex
        ];


    if (!venture) return;


    const favorites =
        getFavorites();


    document
        .getElementById("featuredHeart")
        .textContent =
            favorites.includes(venture.id)
                ? "♥"
                : "♡";
}


document
    .getElementById("featuredHeart")
    .addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const venture =
                featuredVentures[
                    featuredIndex
                ];


            if (!venture) return;


            toggleFavorite(
                venture.id
            );

        }
    );


/* ======================================================
                    SCROLL REVEAL
====================================================== */

function setupCardReveal() {

    const cards =
        document.querySelectorAll(
            ".reveal-card"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const card =
                                entry.target;


                            const delay =
                                [...cards]
                                    .indexOf(card)
                                * 70;


                            setTimeout(
                                () => {

                                    card.classList.add(
                                        "visible"
                                    );

                                },
                                delay
                            );


                            observer.unobserve(
                                card
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    cards.forEach(
        card =>
            observer.observe(card)
    );
}


const revealSections =
    document.querySelectorAll(
        ".reveal"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        sectionObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealSections.forEach(
    section =>
        sectionObserver.observe(section)
);


/* ======================================================
                    KEYBOARD SEARCH
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        if (
            event.key === "/" &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* ======================================================
                     NAV SEARCH
====================================================== */

document
    .getElementById("navSearch")
    .addEventListener(
        "click",
        () => {

            searchInput.focus();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


/* ======================================================
                       INIT
====================================================== */

renderVentures();

renderFeatured();