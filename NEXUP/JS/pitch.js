/* ======================================================
                       NEXUP PITCH
                     PAGE ENGINE
====================================================== */

/* ======================================================
                    VENTURE DATA
====================================================== */
const esc = NEXUP.escapeHtml;
const fmt = NEXUP.fmt;

/* ======================================================
                  GET VENTURE FROM URL
====================================================== */

/** Reads ?id= and returns the venture, or null when it does not exist. No id shows the first venture. */
function getVentureFromURL() {
    const id = new URLSearchParams(window.location.search).get("id");

    if (id === null) {
        return NEXUP.ventures[0];
    }

    return NEXUP.byId(id) || null;
}

/** The values this page displays, formatted once. */
function toPitchData(venture) {
    return {
        name: venture.name,
        category: venture.category,
        tagline: venture.tagline || venture.pitch,
        description: venture.story || venture.description,
        founder: venture.seller,
        founderInitial: venture.seller.charAt(0).toUpperCase(),
        revenue: fmt.money(venture.revenue),
        growth: fmt.growth(venture.growth),
        price: fmt.money(venture.price),
        views: fmt.views(venture.views),
        image: venture.image || NEXUP.placeholder
    };
}

function showNotFound() {
    document.title = "Pitch not found — NEXUP";
    document.body.innerHTML = `
        <main style="min-height:100vh;display:grid;place-content:center;gap:18px;text-align:center;padding:24px;background:#050505;color:#f5f7f5;font-family:Manrope,sans-serif">
            <h1 style="font-size:clamp(32px,6vw,64px);margin:0">Pitch not found</h1>
            <p style="color:#89928d;margin:0">This pitch does not exist or is no longer available.</p>
            <a href="marketplace.html" style="color:#9fffd0">Back to the marketplace ↗</a>
        </main>`;
}

/* ======================================================
                    CURRENT VENTURE
====================================================== */
const currentVenture = getVentureFromURL();
const pitchData = currentVenture ? toPitchData(currentVenture) : null;

/* ======================================================
                      DOM READY
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initialisePitch();
});

/* ======================================================
                  INITIALISE PITCH
====================================================== */

function initialisePitch() {
    if (!pitchData) {
        showNotFound();
        return;
    }

    populatePitch();
    setupShare();
    setupContact();
    setupScrollReveal();
    setupImageParallax();
}

/* ======================================================
                  POPULATE PITCH
====================================================== */

function populatePitch() {
    const viewVenture = document.querySelector(".secondary-button");

    if (viewVenture) {
        viewVenture.href = `venture.html?id=${currentVenture.id}`;
    }

    document.title =
        `${pitchData.name} — NEXUP`;
    /* ----------------------------------------------
                       HERO TITLE
    ---------------------------------------------- */
    const title = document.querySelector(".hero-copy h1");
    if (title) {
        const nameParts = pitchData.name.split(" ");
        if (nameParts.length > 1) {
            const first = nameParts
                .slice(0, -1)
                .join(" ");
            const last = nameParts[nameParts.length - 1];
            title.innerHTML =
                `${esc(first)} <em>${esc(last)}</em>`;
        }
        else {
            title.textContent =
                pitchData.name;
        }
    }
    /* ----------------------------------------------
                       CATEGORY
    ---------------------------------------------- */
    const category = document.querySelector(".category");
    if (category) {
        category.textContent =
            pitchData.category;
    }
    /* ----------------------------------------------
                       TAGLINE
    ---------------------------------------------- */
    const tagline = document.querySelector(".hero-tagline");
    if (tagline) {
        tagline.textContent =
            pitchData.tagline;
    }
    /* ----------------------------------------------
                    DESCRIPTION
    ---------------------------------------------- */
    const description = document.querySelector(".hero-description");
    if (description) {
        description.textContent =
            pitchData.description;
    }
    /* ----------------------------------------------
                       FOUNDER
    ---------------------------------------------- */
    const founder = document.querySelector(".hero-seller strong");
    if (founder) {
        founder.textContent =
            pitchData.founder;
    }
    const sellerAvatar = document.querySelector(".seller-avatar");
    if (sellerAvatar) {
        sellerAvatar.textContent =
            pitchData.founderInitial;
    }
    /* ----------------------------------------------
                     HERO IMAGE
    ---------------------------------------------- */
    const heroImage = document.querySelector(".hero-visual img");
    if (heroImage) {
        heroImage.src =
            pitchData.image;
        heroImage.alt =
            pitchData.name;
    }
    /* ----------------------------------------------
                     VISUAL BREAK
    ---------------------------------------------- */
    const breakImage = document.querySelector(".visual-break img");
    if (breakImage) {
        breakImage.src =
            pitchData.image;
    }
    /* ----------------------------------------------
                    HERO METRICS
    ---------------------------------------------- */
    const metrics = document.querySelectorAll(".hero-metrics .metric strong");
    if (metrics.length >= 4) {
        metrics[0].textContent =
            pitchData.revenue;
        metrics[1].textContent =
            pitchData.growth;
        metrics[2].textContent =
            pitchData.price;
        metrics[3].textContent =
            pitchData.views;
    }
    /* ----------------------------------------------
                     FOUNDER SECTION
    ---------------------------------------------- */
    const largeAvatar = document.querySelector(".large-avatar");
    if (largeAvatar) {
        largeAvatar.textContent =
            pitchData.founderInitial;
    }
    const sellerName = document.querySelector(".seller-main h2");
    if (sellerName) {
        sellerName.textContent =
            pitchData.founder;
    }
    const sellerRole = document.querySelector(".seller-main p");
    if (sellerRole) {
        sellerRole.textContent =
            `Founder · ${pitchData.name}`;
    }
    /* ----------------------------------------------
                    TRACTION METRICS
    ---------------------------------------------- */
    const tractionCards = document.querySelectorAll(".traction-card");
    if (tractionCards.length >= 3) {
        const revenueValue = tractionCards[0]
            .querySelector("strong");
        const growthValue = tractionCards[1]
            .querySelector("strong");
        const viewsValue = tractionCards[2]
            .querySelector("strong");
        if (revenueValue) {
            revenueValue.textContent =
                pitchData.revenue;
        }
        if (growthValue) {
            growthValue.textContent =
                pitchData.growth;
        }
        if (viewsValue) {
            viewsValue.textContent =
                pitchData.views;
        }
    }
    /* ----------------------------------------------
                     PITCH COPY
    ---------------------------------------------- */
    const storyLead = document.querySelector(".pitch-story .story-lead");
    if (storyLead) {
        storyLead.textContent =
            pitchData.description;
    }
    /* ----------------------------------------------
                    FOUNDER AVATARS
    ---------------------------------------------- */
    const allAvatars = document.querySelectorAll(".seller-avatar, .large-avatar");
    allAvatars.forEach(avatar => {
        avatar.textContent =
            pitchData.founderInitial;
    });
}

/* ======================================================
                       SHARE
====================================================== */

function setupShare() {
    const button = document.getElementById("shareButton");
    if (!button) {
        return;
    }
    button.addEventListener("click", async () => {
        const shareData = {
            title: `${pitchData.name} — NEXUP`,
            text: `Take a look at ${pitchData.name} on NEXUP.`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }
            await navigator.clipboard.writeText(window.location.href);
            NEXUP.toast("Pitch link copied");
        }
        catch (error) {
            /* User cancelled share. */
        }
    });
}

/* ======================================================
                     CONTACT
====================================================== */

function setupContact() {
    const button = document.getElementById("contactButton");
    if (!button) {
        return;
    }
    button.addEventListener("click", () => {
        NEXUP.toast("Seller contact will open here.");
    });
}

/* ======================================================
                  SCROLL REVEALS
====================================================== */

function setupScrollReveal() {
    const sections = document.querySelectorAll(`
            .story-section,
            .visual-break,
            .traction-section,
            .opportunity-section,
            .seller-section
            `);
    if (!("IntersectionObserver" in window)) {
        sections.forEach(section => section.classList.add("in-view"));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });
    sections.forEach(section => observer.observe(section));
}

/* ======================================================
                   IMAGE PARALLAX
====================================================== */

function setupImageParallax() {
    const visual = document.querySelector(".visual-break");
    const image = visual?.querySelector("img");
    if (!visual || !image || NEXUP.prefersReducedMotion) {
        return;
    }
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (ticking) {
            return;
        }
        ticking = true;
        requestAnimationFrame(() => {
            const rect = visual.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.bottom > 0 &&
                rect.top < windowHeight) {
                const progress = (windowHeight -
                    rect.top)
                    /
                        (windowHeight +
                            rect.height);
                const offset = (progress -
                    0.5)
                    * 45;
                image.style.transform =
                    `scale(1.08) translateY(${offset}px)`;
            }
            ticking = false;
        });
    }, {
        passive: true
    });
}

/* ======================================================
                  KEYBOARD SHORTCUT
====================================================== */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        window.history.back();
    }
});
