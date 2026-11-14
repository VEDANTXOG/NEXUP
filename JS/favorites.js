/* =========================================================
                    NEXUP FAVORITES
                  INTERACTION ENGINE
========================================================= */


/* =========================================================
                       DATA
========================================================= */

const ventures = [

    {
        id: 1,
        name: "NovaMind AI",
        category: "AI",
        description: "AI automation platform",
        seller: "Alex Carter"
    },

    {
        id: 2,
        name: "FlowDesk",
        category: "SaaS",
        description: "Workflow automation for modern teams",
        seller: "Maya Chen"
    },

    {
        id: 3,
        name: "GameForge",
        category: "Gaming",
        description: "Indie game publishing ecosystem",
        seller: "Ryan Cole"
    },

    {
        id: 4,
        name: "UrbanCart",
        category: "E-Commerce",
        description: "Local-first commerce platform",
        seller: "Nina Shah"
    },

    {
        id: 5,
        name: "LearnMate",
        category: "Apps",
        description: "Peer-powered learning companion",
        seller: "Arjun Mehta"
    },

    {
        id: 6,
        name: "EcoDrive",
        category: "Startup",
        description: "Smarter fleet management infrastructure",
        seller: "Daniel Ross"
    },

    {
        id: 7,
        name: "PixelPilot",
        category: "AI",
        description: "AI-powered creative workflow for modern design teams",
        seller: "Leo Martin"
    },

    {
        id: 8,
        name: "TaskOrbit",
        category: "SaaS",
        description: "Simple project intelligence without the clutter",
        seller: "Chris Evans"
    },

    {
        id: 9,
        name: "QuickBite",
        category: "E-Commerce",
        description: "A fast-growing discovery platform for independent food brands",
        seller: "Sam Wilson"
    }

];


/* =========================================================
                       ROUTES
========================================================= */

const VENTURE_PAGE =
    "../HTML/venture.html";

const PROFILE_PAGE =
    "../HTML/profile.html";

const MARKETPLACE_PAGE =
    "../HTML/marketplace.html";


/* =========================================================
                       FAVORITES
========================================================= */

const FAVORITES_KEY =
    "nexupFavorites";


function getFavorites() {

    try {

        const stored =
            localStorage.getItem(
                FAVORITES_KEY
            );


        if (!stored) {
            return [];
        }


        const parsed =
            JSON.parse(stored);


        if (!Array.isArray(parsed)) {
            return [];
        }


        return parsed;

    } catch (error) {

        return [];

    }

}


function saveFavorites(favorites) {

    try {

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );

    } catch (error) {

        console.error(
            "NEXUP: Could not save favorites.",
            error
        );

    }

}


/* =========================================================
                  FAVORITE NORMALIZATION
========================================================= */

function normalizeFavoriteId(value) {

    const id =
        Number(value);


    return Number.isFinite(id)
        ? id
        : null;

}


function getSavedVentures() {

    const favoriteIds =
        getFavorites()
            .map(normalizeFavoriteId)
            .filter(
                id => id !== null
            );


    return favoriteIds
        .map(
            id =>
                ventures.find(
                    venture =>
                        venture.id === id
                )
        )
        .filter(Boolean);

}


/* =========================================================
                       COUNTERS
========================================================= */

function updateCounters(count) {

    const favoriteCount =
        document.getElementById(
            "favoriteCount"
        );


    const heroCount =
        document.getElementById(
            "heroCount"
        );


    const sectionCount =
        document.getElementById(
            "sectionCount"
        );


    if (favoriteCount) {

        favoriteCount.textContent =
            count;

    }


    if (heroCount) {

        heroCount.textContent =
            count;

    }


    if (sectionCount) {

        sectionCount.textContent =
            String(count)
                .padStart(2, "0");

    }

}


/* =========================================================
                    EMPTY STATE
========================================================= */

function updateEmptyState(count) {

    const emptyState =
        document.getElementById(
            "emptyState"
        );


    if (!emptyState) {
        return;
    }


    if (count === 0) {

        emptyState.classList.add(
            "show"
        );

        emptyState.style.display =
            "grid";

    } else {

        emptyState.classList.remove(
            "show"
        );

        emptyState.style.display =
            "none";

    }

}


/* =========================================================
                    CARD CREATION
========================================================= */

function createFavoriteCard(
    venture,
    index
) {

    return `

        <article
            class="favorite-card"
            data-venture-id="${venture.id}"
            tabindex="0"
            role="link"
            aria-label="Open ${venture.name}"
        >

            <div class="favorite-card-top">

                <span class="favorite-number">
                    SAVED / ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="favorite-category">
                    ${venture.category}
                </span>

            </div>


            <div class="favorite-main">

                <h3>
                    ${venture.name}
                </h3>

                <p class="favorite-description">
                    ${venture.description}
                </p>

            </div>


            <div class="favorite-footer">

                <div class="favorite-seller">

                    <span>
                        FOUNDER
                    </span>

                    <span>
                        ${venture.seller}
                    </span>

                </div>


                <div class="favorite-actions">

                    <span class="view-venture">
                        VIEW VENTURE ↗
                    </span>


                    <button
                        class="remove-favorite"
                        type="button"
                        data-remove-id="${venture.id}"
                        aria-label="Remove ${venture.name} from favorites"
                    >
                        ♥
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
                    RENDER FAVORITES
========================================================= */

function renderFavorites() {

    const grid =
        document.getElementById(
            "favoritesGrid"
        );


    if (!grid) {
        return;
    }


    const savedVentures =
        getSavedVentures();


    updateCounters(
        savedVentures.length
    );


    updateEmptyState(
        savedVentures.length
    );


    if (!savedVentures.length) {

        grid.innerHTML = "";

        return;

    }


    grid.innerHTML =
        savedVentures
            .map(
                (venture, index) =>
                    createFavoriteCard(
                        venture,
                        index
                    )
            )
            .join("");


    setupFavoriteCards();

    setupReveal();

}


/* =========================================================
                  REMOVE FAVORITE
========================================================= */

function removeFavorite(
    ventureId
) {

    const id =
        normalizeFavoriteId(
            ventureId
        );


    if (id === null) {
        return;
    }


    const updated =
        getFavorites()
            .filter(
                favoriteId =>
                    normalizeFavoriteId(
                        favoriteId
                    ) !== id
            );


    saveFavorites(
        updated
    );


    renderFavorites();

}


/* =========================================================
                    CARD NAVIGATION
========================================================= */

function openVenture(
    ventureId
) {

    if (!ventureId) {
        return;
    }


    window.location.href =
        `${VENTURE_PAGE}?id=${encodeURIComponent(
            ventureId
        )}`;

}


/* =========================================================
                     CARD EVENTS
========================================================= */

function setupFavoriteCards() {

    document
        .querySelectorAll(
            ".favorite-card"
        )
        .forEach(
            card => {

                const ventureId =
                    card.dataset.ventureId;


                card.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target.closest(
                                "button"
                            )
                        ) {

                            return;

                        }


                        openVenture(
                            ventureId
                        );

                    }
                );


                card.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();


                            openVenture(
                                ventureId
                            );

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".remove-favorite"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const ventureId =
                            button.dataset.removeId;


                        removeFavorite(
                            ventureId
                        );

                    }
                );

            }
        );

}


/* =========================================================
                    REVEAL SYSTEM
========================================================= */

function setupReveal() {

    const cards =
        document.querySelectorAll(
            ".favorite-card"
        );


    if (!cards.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.08,
                rootMargin:
                    "0px 0px -8% 0px"
            }
        );


    cards.forEach(
        card =>
            observer.observe(card)
    );

}


/* =========================================================
                       PROFILE
========================================================= */

function setupProfile() {

    document
        .getElementById(
            "profileBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                window.location.href =
                    PROFILE_PAGE;

            }
        );

}


/* =========================================================
                  CROSS-TAB SYNC
========================================================= */

function setupStorageSync() {

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                FAVORITES_KEY
            ) {

                renderFavorites();

            }

        }
    );

}


/* =========================================================
                    PAGE VISIBILITY
========================================================= */

function setupVisibilitySync() {

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                renderFavorites();

            }

        }
    );

}


/* =========================================================
                         INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderFavorites();

        setupProfile();

        setupStorageSync();

        setupVisibilitySync();

    }
);