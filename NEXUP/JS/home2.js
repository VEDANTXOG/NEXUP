/* =========================================================
                        NEXUP HOME 2
              STRUCTURAL / INTERACTION SYSTEM
========================================================= */

/* =========================================================
                           DATA
========================================================= */
const ventures = NEXUP.ventures;
const esc = NEXUP.escapeHtml;
const fmt = NEXUP.fmt;

/* =========================================================
                         PITCH DATA
========================================================= */
const pitches = NEXUP.pitchCards.map((card, index) => {
    const venture = NEXUP.byId(card.ventureId);

    return {
        number: String(index + 1).padStart(2, "0"),
        category: card.label,
        name: venture.name,
        statement: card.statement,
        description: card.description,
        founder: venture.seller
    };
});

/* =========================================================
                        FAVORITES
========================================================= */
const isFavorite = id => NEXUP.favorites.has(id);

function toggleFavorite(id) {
    NEXUP.favorites.toggle(id);
    renderTrending();
}

function updateFavoriteCount() {
    const count = document.getElementById("favoriteCount");
    if (count) count.textContent = NEXUP.favorites.count();
}

/* =========================================================
                         PITCH SYSTEM
========================================================= */
let pitchIndex = 0;

function renderPitches() {
    const track = document.getElementById("pitchTrack");
    if (!track) {
        return;
    }
    track.innerHTML =
        pitches
            .map(pitch => `

                    <article class="pitch-card">

                        <div class="pitch-card-top">

                            <span>
                                ${esc(pitch.number)} / ${esc(pitch.category)}
                            </span>

                            <span>
                                PITCH
                            </span>

                        </div>

                        <h3>
                            ${esc(pitch.statement)}
                        </h3>

                        <p>
                            ${esc(pitch.description)}
                        </p>

                        <div class="pitch-card-footer">

                            <span>
                                ${esc(pitch.name)}
                            </span>

                            <strong>
                                ${esc(pitch.founder)}
                            </strong>

                        </div>

                    </article>

                `)
            .join("");
    updatePitchCounter();
    requestAnimationFrame(updatePitchPosition);
}

function updatePitchCounter() {
    const counter = document.getElementById("pitchCounter");
    if (!counter) {
        return;
    }
    const current = String(pitchIndex + 1).padStart(2, "0");
    const total = String(pitches.length).padStart(2, "0");
    counter.textContent =
        `${current} — ${total}`;
}

function updatePitchPosition() {
    const track = document.getElementById("pitchTrack");
    if (!track) {
        return;
    }
    const cards = track.querySelectorAll(".pitch-card");
    if (!cards.length) {
        return;
    }
    const gap = 1;
    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transform =
        `translateX(-${pitchIndex * (cardWidth + gap)}px)`;
    updatePitchCounter();
}

function nextPitch() {
    if (pitchIndex <
        pitches.length - 1) {
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
    const container = document.getElementById("trendingContainer");
    if (!container) {
        return;
    }
    const trending = [...ventures]
        .sort((a, b) => b.growth - a.growth)
        .slice(0, 6);
    container.innerHTML =
        trending
            .map((venture, index) => {
            const saved = isFavorite(venture.id);
            return `

                        <article
                            class="trending-card reveal"
                            data-trending-id="${venture.id}"
                        >

                            <span class="trending-rank">
                                ${String(index + 1).padStart(2, "0")}
                            </span>

                            <span class="trending-card-category">
                                ${esc(venture.category)}
                            </span>

                            <h3>
                                ${esc(venture.name)}
                            </h3>

                            <p>
                                ${esc(venture.description)}
                            </p>

                            <div class="trending-card-bottom">

                                <div class="trending-stat">

                                    <span>
                                        Revenue
                                    </span>

                                    <strong>
                                        ${fmt.revenue(venture.revenue)}
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
                                        ${fmt.money(venture.price)}
                                    </strong>

                                </div>

                            </div>

                            <a
                                href="../HTML/venture.html?id=${venture.id}"
                                aria-label="View ${esc(venture.name)}"
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
        })
            .join("");
    attachTrendingFavorites();
    requestAnimationFrame(() => revealVisible());
}

function attachTrendingFavorites() {
    document
        .querySelectorAll("[data-favorite-id]")
        .forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(button.dataset.favoriteId);
        });
    });
}

/* =========================================================
                  ENHANCED HERO FIELD
========================================================= */

function setupSpatialField() {
    const field = document.getElementById("spatialField");
    const cursor = document.getElementById("cursorField");
    const hero = document.querySelector(".hero");
    const heroGrid = document.querySelector(".hero-grid-lines");
    if (!field) {
        return;
    }
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    function animateDepth() {
        currentX += (targetX - currentX) * .055;
        currentY += (targetY - currentY) * .055;

        if (hero) {
            hero.style.setProperty("--hero-x", `${currentX * .35}px`);
            hero.style.setProperty("--hero-y", `${currentY * .35}px`);
        }

        if (heroGrid) {
            heroGrid.style.setProperty("--grid-x", `${currentX * 1.25}px`);
            heroGrid.style.setProperty("--grid-y", `${currentY * 1.25}px`);
        }

        field.style.setProperty("--field-x", `${currentX * 1.1}px`);
        field.style.setProperty("--field-y", `${currentY * 1.1}px`);

        const settled = Math.abs(targetX - currentX) < .01 && Math.abs(targetY - currentY) < .01;
        frame = settled ? 0 : requestAnimationFrame(animateDepth);
    }

    /* Only animate while there is movement to catch up with. */
    function wake() {
        if (!frame && !NEXUP.prefersReducedMotion) {
            frame = requestAnimationFrame(animateDepth);
        }
    }

    animateDepth();

    field.addEventListener("mouseenter", () => {
        if (cursor) {
            cursor.style.opacity = "1";
        }
    });
    field.addEventListener("mouseleave", () => {
        if (cursor) {
            cursor.style.opacity = "0";
        }
        targetX = 0;
        targetY = 0;
        wake();
    });
    field.addEventListener("mousemove", event => {
        const rect = field.getBoundingClientRect();
        const localX = event.clientX -
            rect.left;
        const localY = event.clientY -
            rect.top;
        const normalizedX = localX /
            rect.width -
            .5;
        const normalizedY = localY /
            rect.height -
            .5;
        targetX = normalizedX * 18;
        targetY = normalizedY * 18;
        wake();
        if (cursor) {
            cursor.style.left =
                `${event.clientX}px`;
            cursor.style.top =
                `${event.clientY}px`;
        }
        const nodes = field.querySelectorAll(".pathway-node");
        nodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            const centerX = nodeRect.left +
                nodeRect.width / 2;
            const centerY = nodeRect.top +
                nodeRect.height / 2;
            const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
            const radius = 190;
            if (distance <
                radius) {
                const strength = Math.max(0, 1 -
                    distance / radius);
                node.style.transform =
                    `
                            translate(
                                ${normalizedX * strength * 8}px,
                                ${normalizedY * strength * 8}px
                            )
                            `;
            }
            else {
                node.style.transform =
                    "";
            }
        });
    });
}

/* =========================================================
                     HERO PARALLAX
========================================================= */

function setupHeroParallax() {
    const hero = document.querySelector(".hero");
    if (!hero || NEXUP.prefersReducedMotion) {
        return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    function animate() {
        currentX += (targetX - currentX) * .035;
        currentY += (targetY - currentY) * .035;

        hero.style.setProperty("--hero-x", `${currentX}px`);
        hero.style.setProperty("--hero-y", `${currentY}px`);

        const settled = Math.abs(targetX - currentX) < .01 && Math.abs(targetY - currentY) < .01;
        frame = settled ? 0 : requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", event => {
        targetX = (event.clientX / window.innerWidth - .5) * 7;
        targetY = (event.clientY / window.innerHeight - .5) * 7;

        if (!frame) {
            frame = requestAnimationFrame(animate);
        }
    });
}

/* =========================================================
                         SEARCH
========================================================= */

function setupSearch() {
    const trigger = document.getElementById("searchTrigger");
    const overlay = document.getElementById("searchOverlay");
    const close = document.getElementById("closeSearch");
    const input = document.getElementById("globalSearch");
    const results = document.getElementById("searchResults");
    if (!trigger ||
        !overlay ||
        !close ||
        !input ||
        !results) {
        return;
    }
    function openSearch() {
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
        setTimeout(() => input.focus(), 120);
    }
    function closeSearch() {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
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
        const query = term
            .trim()
            .toLowerCase();
        if (!query) {
            resetSearchResults();
            return;
        }
        const matches = ventures.filter(venture => venture.name
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
                    .includes(query));
        if (!matches.length) {
            results.innerHTML = `

                <div class="search-empty">

                    Nothing found for
                    "${esc(term)}".

                </div>

            `;
            return;
        }
        results.innerHTML =
            matches
                .map(venture => `

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
                                ${esc(venture.category)}
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
                                    ${esc(venture.name)}
                                </strong>

                                <small
                                    style="
                                        color:#59625b;
                                        font-size:10px;
                                    "
                                >
                                    ${esc(venture.description)}
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

                    `)
                .join("");
    }
    trigger.addEventListener("click", openSearch);
    close.addEventListener("click", closeSearch);
    overlay.addEventListener("click", event => {
        if (event.target ===
            overlay) {
            closeSearch();
        }
    });
    input.addEventListener("input", () => {
        performSearch(input.value);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "/" &&
            document.activeElement !== input) {
            event.preventDefault();
            openSearch();
        }
        if (event.key === "Escape") {
            closeSearch();
        }
    });
}

/* =========================================================
                      NAV ACTIVE STATE
========================================================= */

function setupNavState() {
    const links = document.querySelectorAll(".nav-link");
    const sections = [
        document.getElementById("home"),
        document.getElementById("pitches"),
        document.getElementById("trending"),
        document.getElementById("categories")
    ].filter(Boolean);
    if (!links.length ||
        !sections.length) {
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            links.forEach(link => {
                const href = link.getAttribute("href");
                link.classList.toggle("active", href ===
                    `#${entry.target.id}`);
            });
        });
    }, {
        threshold: .35
    });
    sections.forEach(section => observer.observe(section));
}

/* =========================================================
                    REVEAL SYSTEM
========================================================= */
let revealObserver;

function setupRevealObserver() {
    const elements = document.querySelectorAll(".statement-section, .pitches-section, .bridge-section, .trending-section, .categories-section, .sell-section, .pitch-card, .trending-card, .category-cell");
    elements.forEach(element => {
        element.classList.add("reveal");
    });
    revealVisible();
}

function revealVisible() {
    const elements = document.querySelectorAll(".reveal:not(.visible)");
    if (!revealObserver) {
        revealObserver =
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    const element = entry.target;
                    const delay = element.classList.contains("category-cell")
                        ? 80
                        : 120;
                    setTimeout(() => {
                        element.classList.add("visible");
                    }, delay);
                    revealObserver.unobserve(element);
                });
            }, {
                threshold: .12,
                rootMargin: "0px 0px -7% 0px"
            });
    }
    elements.forEach(element => revealObserver.observe(element));
}

/* =========================================================
                  SMOOTH INTERNAL LINKS
========================================================= */

function setupSmoothLinks() {
    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (targetId ===
                "#") {
                return;
            }
            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* =========================================================
                       GLOBAL CURSOR
========================================================= */

function setupGlobalCursor() {
    const cursor = document.getElementById("cursorField");
    if (!cursor) {
        return;
    }
    document.addEventListener("mousemove", event => {
        const insideField = event.target.closest(".spatial-field");
        if (insideField) {
            return;
        }
        cursor.style.opacity = "0";
    });
}

/* =========================================================
                       EVENTS / INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
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
    const pitchNext = document.getElementById("pitchNext");
    const pitchPrev = document.getElementById("pitchPrev");
    if (pitchNext) {
        pitchNext.addEventListener("click", nextPitch);
    }
    if (pitchPrev) {
        pitchPrev.addEventListener("click", previousPitch);
    }
    window.addEventListener("resize", () => {
        updatePitchPosition();
    });
});
