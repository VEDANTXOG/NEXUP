/* =========================================================
                        NEXUP HOME 2
              STRUCTURAL / INTERACTION SYSTEM
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
        seller: "Alex Carter",
        revenue: "$18.2K/mo",
        growth: 143,
        price: "$185K",
        verified: true
    },

    {
        id: 2,
        name: "FlowDesk",
        category: "SaaS",
        description: "Workflow automation for modern teams",
        seller: "Maya Chen",
        revenue: "$11.8K/mo",
        growth: 96,
        price: "$120K",
        verified: true
    },

    {
        id: 3,
        name: "GameForge",
        category: "Gaming",
        description: "Indie game publishing ecosystem",
        seller: "Ryan Cole",
        revenue: "$9.4K/mo",
        growth: 118,
        price: "$95K",
        verified: false
    },

    {
        id: 4,
        name: "UrbanCart",
        category: "E-Commerce",
        description: "Local-first commerce platform",
        seller: "Nina Shah",
        revenue: "$15.1K/mo",
        growth: 84,
        price: "$140K",
        verified: true
    },

    {
        id: 5,
        name: "LearnMate",
        category: "Apps",
        description: "Peer-powered learning companion",
        seller: "Arjun Mehta",
        revenue: "$7.6K/mo",
        growth: 132,
        price: "$72K",
        verified: true
    },

    {
        id: 6,
        name: "EcoDrive",
        category: "Startup",
        description: "Smarter fleet management infrastructure",
        seller: "Daniel Ross",
        revenue: "$21.4K/mo",
        growth: 151,
        price: "$240K",
        verified: true
    }

];


/* =========================================================
                         PITCH DATA
========================================================= */

const pitches = [

    {
        number: "01",
        category: "AI",
        name: "NovaMind AI",
        statement: "Automation should feel invisible.",
        description:
            "NovaMind is building tools that remove repetitive work from modern teams without adding another layer of complexity.",
        founder: "Alex Carter"
    },

    {
        number: "02",
        category: "SAAS",
        name: "FlowDesk",
        statement: "Workflows shouldn't fight you.",
        description:
            "FlowDesk brings scattered team processes into one simple operating layer designed around how people actually work.",
        founder: "Maya Chen"
    },

    {
        number: "03",
        category: "GAMING",
        name: "GameForge",
        statement: "Small studios deserve a bigger stage.",
        description:
            "GameForge gives independent creators the infrastructure and distribution they need to build sustainable game businesses.",
        founder: "Ryan Cole"
    },

    {
        number: "04",
        category: "COMMERCE",
        name: "UrbanCart",
        statement: "Local commerce can move faster.",
        description:
            "UrbanCart connects neighborhood businesses with customers through a commerce layer built for smaller operators.",
        founder: "Nina Shah"
    },

    {
        number: "05",
        category: "APPS",
        name: "LearnMate",
        statement: "Learning works better together.",
        description:
            "LearnMate turns peer knowledge into a practical learning network for students and independent learners.",
        founder: "Arjun Mehta"
    }

];


/* =========================================================
                          ROUTES
========================================================= */

const ROUTES = {

    marketplace: "../HTML/marketplace.html",
    sell: "../HTML/sell.html",
    favorites: "../HTML/favorites.html",
    profile: "../HTML/profile.html",
    pipeline: "../HTML/pipeline.html"

};


/* =========================================================
                        FAVORITES
========================================================= */

const FAVORITES_KEY = "nexupFavorites";


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

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "NEXUP favorites read error:",
            error
        );

        return [];

    }

}


function saveFavorites(ids) {

    try {

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(ids)
        );

    } catch (error) {

        console.error(
            "NEXUP favorites save error:",
            error
        );

    }

}


function isFavorite(id) {

    return getFavorites()
        .map(Number)
        .includes(Number(id));

}


function toggleFavorite(id) {

    let favorites =
        getFavorites()
            .map(Number);

    const numericId =
        Number(id);

    if (
        favorites.includes(
            numericId
        )
    ) {

        favorites =
            favorites.filter(
                item =>
                    item !== numericId
            );

    } else {

        favorites.push(
            numericId
        );

    }

    saveFavorites(
        favorites
    );

    updateFavoriteCount();

    renderTrending();

}


function updateFavoriteCount() {

    const count =
        document.getElementById(
            "favoriteCount"
        );

    if (!count) {
        return;
    }

    count.textContent =
        getFavorites().length;

}


/* =========================================================
                         PITCH SYSTEM
========================================================= */

let pitchIndex = 0;


function renderPitches() {

    const track =
        document.getElementById(
            "pitchTrack"
        );

    if (!track) {
        return;
    }


    track.innerHTML =
        pitches
            .map(
                pitch => `

                    <article class="pitch-card">

                        <div class="pitch-card-top">

                            <span>
                                ${pitch.number} / ${pitch.category}
                            </span>

                            <span>
                                PITCH
                            </span>

                        </div>


                        <h3>
                            ${pitch.statement}
                        </h3>


                        <p>
                            ${pitch.description}
                        </p>


                        <div class="pitch-card-footer">

                            <span>
                                ${pitch.name}
                            </span>

                            <strong>
                                ${pitch.founder}
                            </strong>

                        </div>

                    </article>

                `
            )
            .join("");


    updatePitchCounter();

    requestAnimationFrame(
        updatePitchPosition
    );

}


function updatePitchCounter() {

    const counter =
        document.getElementById(
            "pitchCounter"
        );

    if (!counter) {
        return;
    }

    const current =
        String(
            pitchIndex + 1
        ).padStart(2, "0");

    const total =
        String(
            pitches.length
        ).padStart(2, "0");

    counter.textContent =
        `${current} — ${total}`;

}


function updatePitchPosition() {

    const track =
        document.getElementById(
            "pitchTrack"
        );

    if (!track) {
        return;
    }

    const cards =
        track.querySelectorAll(
            ".pitch-card"
        );

    if (!cards.length) {
        return;
    }


    const gap = 1;

    const cardWidth =
        cards[0].getBoundingClientRect().width;


    track.style.transform =
        `translateX(-${pitchIndex * (cardWidth + gap)}px)`;


    updatePitchCounter();

}


function nextPitch() {

    if (
        pitchIndex <
        pitches.length - 1
    ) {

        pitchIndex++;

    }

    updatePitchPosition();

}


function previousPitch() {

    if (pitchIndex > 0) {

        pitchIndex--;

    }

    updatePitchPosition();

}


/* =========================================================
                         TRENDING
========================================================= */

function renderTrending() {

    const container =
        document.getElementById(
            "trendingContainer"
        );

    if (!container) {
        return;
    }


    const trending =
        [...ventures]
            .sort(
                (a, b) =>
                    b.growth - a.growth
            );


    container.innerHTML =
        trending
            .map(
                (venture, index) => {

                    const saved =
                        isFavorite(
                            venture.id
                        );

                    return `

                        <article
                            class="trending-card reveal"
                            data-trending-id="${venture.id}"
                        >

                            <span class="trending-rank">
                                ${String(index + 1).padStart(2, "0")}
                            </span>


                            <span class="trending-card-category">
                                ${venture.category}
                            </span>


                            <h3>
                                ${venture.name}
                            </h3>


                            <p>
                                ${venture.description}
                            </p>


                            <div class="trending-card-bottom">

                                <div class="trending-stat">

                                    <span>
                                        Revenue
                                    </span>

                                    <strong>
                                        ${venture.revenue}
                                    </strong>

                                </div>


                                <div class="trending-stat growth">

                                    <span>
                                        Growth
                                    </span>

                                    <strong>
                                        +${venture.growth}%
                                    </strong>

                                </div>


                                <div class="trending-stat">

                                    <span>
                                        Asking
                                    </span>

                                    <strong>
                                        ${venture.price}
                                    </strong>

                                </div>

                            </div>


                            <a
                                href="../HTML/venture.html?id=${venture.id}"
                                aria-label="View ${venture.name}"
                                style="
                                    position:absolute;
                                    inset:0;
                                    z-index:4;
                                "
                            ></a>


                            <button
                                type="button"
                                class="trending-save"
                                data-favorite-id="${venture.id}"
                                aria-label="${saved ? "Remove from favorites" : "Save venture"}"
                                aria-pressed="${saved ? "true" : "false"}"
                                style="
                                    position:absolute;
                                    right:22px;
                                    top:20px;
                                    z-index:8;
                                    border:0;
                                    background:none;
                                    color:${saved ? "#b9f6d1" : "#59625b"};
                                    cursor:pointer;
                                    font-size:16px;
                                "
                            >
                                ${saved ? "♥" : "♡"}
                            </button>

                        </article>

                    `;

                }
            )
            .join("");


    attachTrendingFavorites();

    requestAnimationFrame(
        () => revealVisible()
    );

}


function attachTrendingFavorites() {

    document
        .querySelectorAll(
            "[data-favorite-id]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        toggleFavorite(
                            button.dataset.favoriteId
                        );

                    }
                );

            }
        );

}


/* =========================================================
                  ENHANCED HERO FIELD
========================================================= */

function setupSpatialField() {

    const field =
        document.getElementById(
            "spatialField"
        );

    const cursor =
        document.getElementById(
            "cursorField"
        );

    const hero =
        document.querySelector(
            ".hero"
        );

    const heroGrid =
        document.querySelector(
            ".hero-grid-lines"
        );


    if (!field) {
        return;
    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    function animateDepth() {

        currentX +=
            (targetX - currentX) * .055;

        currentY +=
            (targetY - currentY) * .055;


        if (hero) {

            hero.style.setProperty(
                "--hero-x",
                `${currentX * .35}px`
            );

            hero.style.setProperty(
                "--hero-y",
                `${currentY * .35}px`
            );

        }


        if (heroGrid) {

            heroGrid.style.setProperty(
                "--grid-x",
                `${currentX * 1.25}px`
            );

            heroGrid.style.setProperty(
                "--grid-y",
                `${currentY * 1.25}px`
            );

        }


        field.style.setProperty(
            "--field-x",
            `${currentX * 1.1}px`
        );

        field.style.setProperty(
            "--field-y",
            `${currentY * 1.1}px`
        );


        requestAnimationFrame(
            animateDepth
        );

    }


    animateDepth();


    field.addEventListener(
        "mouseenter",
        () => {

            if (cursor) {
                cursor.style.opacity = "1";
            }

        }
    );


    field.addEventListener(
        "mouseleave",
        () => {

            if (cursor) {
                cursor.style.opacity = "0";
            }

            targetX = 0;
            targetY = 0;

        }
    );


    field.addEventListener(
        "mousemove",
        event => {

            const rect =
                field.getBoundingClientRect();


            const localX =
                event.clientX -
                rect.left;

            const localY =
                event.clientY -
                rect.top;


            const normalizedX =
                localX /
                rect.width -
                .5;


            const normalizedY =
                localY /
                rect.height -
                .5;


            targetX =
                normalizedX * 18;

            targetY =
                normalizedY * 18;


            if (cursor) {

                cursor.style.left =
                    `${event.clientX}px`;

                cursor.style.top =
                    `${event.clientY}px`;

            }


            const nodes =
                field.querySelectorAll(
                    ".pathway-node"
                );


            nodes.forEach(
                node => {

                    const nodeRect =
                        node.getBoundingClientRect();


                    const centerX =
                        nodeRect.left +
                        nodeRect.width / 2;


                    const centerY =
                        nodeRect.top +
                        nodeRect.height / 2;


                    const distance =
                        Math.hypot(
                            event.clientX - centerX,
                            event.clientY - centerY
                        );


                    const radius = 190;


                    if (
                        distance <
                        radius
                    ) {

                        const strength =
                            Math.max(
                                0,
                                1 -
                                distance / radius
                            );


                        node.style.transform =
                            `
                            translate(
                                ${normalizedX * strength * 8}px,
                                ${normalizedY * strength * 8}px
                            )
                            `;

                    } else {

                        node.style.transform =
                            "";

                    }

                }
            );

        }
    );

}


/* =========================================================
                     HERO PARALLAX
========================================================= */

function setupHeroParallax() {

    const hero =
        document.querySelector(
            ".hero"
        );

    if (!hero) {
        return;
    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    function animate() {

        currentX +=
            (targetX - currentX) * .035;

        currentY +=
            (targetY - currentY) * .035;


        hero.style.setProperty(
            "--hero-x",
            `${currentX}px`
        );

        hero.style.setProperty(
            "--hero-y",
            `${currentY}px`
        );


        requestAnimationFrame(
            animate
        );

    }


    document.addEventListener(
        "mousemove",
        event => {

            const x =
                event.clientX /
                window.innerWidth -
                .5;


            const y =
                event.clientY /
                window.innerHeight -
                .5;


            targetX =
                x * 7;

            targetY =
                y * 7;

        }
    );


    animate();

}


/* =========================================================
                         SEARCH
========================================================= */

function setupSearch() {

    const trigger =
        document.getElementById(
            "searchTrigger"
        );

    const overlay =
        document.getElementById(
            "searchOverlay"
        );

    const close =
        document.getElementById(
            "closeSearch"
        );

    const input =
        document.getElementById(
            "globalSearch"
        );

    const results =
        document.getElementById(
            "searchResults"
        );


    if (
        !trigger ||
        !overlay ||
        !close ||
        !input ||
        !results
    ) {
        return;
    }


    function openSearch() {

        overlay.classList.add(
            "open"
        );

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        setTimeout(
            () => input.focus(),
            120
        );

    }


    function closeSearch() {

        overlay.classList.remove(
            "open"
        );

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        input.value = "";

        resetSearchResults();

    }


    function resetSearchResults() {

        results.innerHTML = `

            <div class="search-empty">

                <span></span>

                Start typing to explore NEXUP.

            </div>

        `;

    }


    function performSearch(term) {

        const query =
            term
                .trim()
                .toLowerCase();


        if (!query) {

            resetSearchResults();

            return;

        }


        const matches =
            ventures.filter(
                venture =>

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

                    venture.seller
                        .toLowerCase()
                        .includes(query)

            );


        if (!matches.length) {

            results.innerHTML = `

                <div class="search-empty">

                    Nothing found for
                    "${term}".

                </div>

            `;

            return;

        }


        results.innerHTML =
            matches
                .map(
                    venture => `

                        <a
                            href="../HTML/venture.html?id=${venture.id}"
                            style="
                                display:grid;
                                grid-template-columns:70px 1fr auto;
                                gap:18px;
                                align-items:center;
                                padding:18px 22px;
                                border-bottom:1px solid rgba(185,246,209,.055);
                            "
                        >

                            <span
                                style="
                                    color:#59625b;
                                    font-family:'IBM Plex Mono',monospace;
                                    font-size:8px;
                                "
                            >
                                ${venture.category}
                            </span>


                            <span
                                style="
                                    display:flex;
                                    flex-direction:column;
                                    gap:5px;
                                "
                            >

                                <strong
                                    style="
                                        font-size:16px;
                                        font-weight:500;
                                    "
                                >
                                    ${venture.name}
                                </strong>

                                <small
                                    style="
                                        color:#59625b;
                                        font-size:10px;
                                    "
                                >
                                    ${venture.description}
                                </small>

                            </span>


                            <span
                                style="
                                    color:#b9f6d1;
                                    font-family:'IBM Plex Mono',monospace;
                                    font-size:9px;
                                "
                            >
                                ↗
                            </span>

                        </a>

                    `
                )
                .join("");

    }


    trigger.addEventListener(
        "click",
        openSearch
    );


    close.addEventListener(
        "click",
        closeSearch
    );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                closeSearch();

            }

        }
    );


    input.addEventListener(
        "input",
        () => {

            performSearch(
                input.value
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement !== input
            ) {

                event.preventDefault();

                openSearch();

            }


            if (
                event.key === "Escape"
            ) {

                closeSearch();

            }

        }
    );

}


/* =========================================================
                      NAV ACTIVE STATE
========================================================= */

function setupNavState() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    const sections = [

        document.getElementById("home"),

        document.getElementById("pitches"),

        document.getElementById("trending"),

        document.getElementById("categories")

    ].filter(Boolean);


    if (
        !links.length ||
        !sections.length
    ) {
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


                        links.forEach(
                            link => {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    href ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                threshold: .35
            }
        );


    sections.forEach(
        section =>
            observer.observe(
                section
            )
    );

}


/* =========================================================
                    REVEAL SYSTEM
========================================================= */

let revealObserver;


function setupRevealObserver() {

    const elements =
        document.querySelectorAll(
            ".statement-section, .pitches-section, .bridge-section, .trending-section, .categories-section, .sell-section, .pitch-card, .trending-card, .category-cell"
        );


    elements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    revealVisible();

}


function revealVisible() {

    const elements =
        document.querySelectorAll(
            ".reveal:not(.visible)"
        );


    if (!revealObserver) {

        revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const element =
                                entry.target;


                            const delay =
                                element.classList.contains(
                                    "category-cell"
                                )
                                    ? 80
                                    : 120;


                            setTimeout(
                                () => {

                                    element.classList.add(
                                        "visible"
                                    );

                                },
                                delay
                            );


                            revealObserver.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: .12,
                    rootMargin:
                        "0px 0px -7% 0px"
                }
            );

    }


    elements.forEach(
        element =>
            revealObserver.observe(
                element
            )
    );

}


/* =========================================================
                  SMOOTH INTERNAL LINKS
========================================================= */

function setupSmoothLinks() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            targetId ===
                            "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );

}


/* =========================================================
                       GLOBAL CURSOR
========================================================= */

function setupGlobalCursor() {

    const cursor =
        document.getElementById(
            "cursorField"
        );


    if (!cursor) {
        return;
    }


    document.addEventListener(
        "mousemove",
        event => {

            const insideField =
                event.target.closest(
                    ".spatial-field"
                );


            if (insideField) {
                return;
            }


            cursor.style.opacity = "0";

        }
    );

}


/* =========================================================
                       EVENTS / INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateFavoriteCount();

        renderPitches();

        renderTrending();

        setupSpatialField();

        setupHeroParallax();

        setupSearch();

        setupNavState();

        setupRevealObserver();

        setupSmoothLinks();

        setupGlobalCursor();


        const pitchNext =
            document.getElementById(
                "pitchNext"
            );


        const pitchPrev =
            document.getElementById(
                "pitchPrev"
            );


        if (pitchNext) {

            pitchNext.addEventListener(
                "click",
                nextPitch
            );

        }


        if (pitchPrev) {

            pitchPrev.addEventListener(
                "click",
                previousPitch
            );

        }


        window.addEventListener(
            "resize",
            () => {

                updatePitchPosition();

            }
        );

    }
);