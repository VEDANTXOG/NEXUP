/* =====================================================
                         NEXUP
                    VENTURE PAGE JS
===================================================== */

/* =====================================================
                     VENTURE DATA
===================================================== */
const fmt = NEXUP.fmt;

/* =====================================================
                 READ VENTURE FROM URL
===================================================== */
const params = new URLSearchParams(window.location.search);
const rawId = params.get("id");
const ventureId = parseInt(rawId, 10);

/*
    IMPORTANT:

    We are NOT doing:

        Number(params.get("id")) || 1

    because that silently turns a bad/missing ID
    into NovaMind.

    Now the URL must explicitly contain a valid ID.
*/
const source = NEXUP.byId(ventureId);

/** The values this page displays, formatted once. */
const venture = source && {
    id: source.id,
    name: source.name,
    category: source.category,
    description: source.description,
    headline: source.headline || source.tagline || source.pitch,
    longDescription: source.longDescription || source.description,
    seller: source.seller,
    verified: source.verified,
    askingPrice: fmt.money(source.price),
    revenue: fmt.revenue(source.revenue),
    growth: fmt.growth(source.growth),
    views: fmt.views(source.views)
};

/* =====================================================
                     ELEMENT HELPER
===================================================== */

function $(id) {
    return document.getElementById(id);
}

/* =====================================================
                  SAFE TEXT HELPER
===================================================== */

function setText(id, value) {
    const element = $(id);
    if (!element) {
        return;
    }
    element.textContent =
        value;
}

/* =====================================================
                     LOAD VENTURE
===================================================== */

function loadVenture() {
    /*
        If the ID is invalid, show an actual
        error instead of secretly loading NovaMind.
    */
    if (!venture) {
        document.title =
            "NEXUP | Venture Not Found";
        setText("ventureName", "Venture not found");
        setText("ventureDescription", "This venture does not exist or is no longer available.");
        setText("ventureCategory", "NEXUP");
        setText("ventureType", "UNAVAILABLE");
        return;
    }
    /* =================================================
                       PAGE TITLE
    ================================================= */
    document.title =
        `NEXUP | ${venture.name}`;
    /* =================================================
                       HERO
    ================================================= */
    setText("ventureName", venture.name);
    setText("ventureCategory", venture.category);
    setText("ventureType", venture.category);
    setText("ventureDescription", venture.description);
    setText("ventureSeller", `Built by ${venture.seller}`);
    /* =================================================
                       MAIN STATS
    ================================================= */
    setText("askingPrice", venture.askingPrice);
    setText("revenue", venture.revenue.replace("/mo", ""));
    setText("growth", venture.growth);
    setText("views", venture.views);
    setText("categoryStat", venture.category);
    /* =================================================
                       DESCRIPTION
    ================================================= */
    setText("ventureHeadline", venture.headline);
    setText("ventureLongDescription", venture.longDescription);
    /* =================================================
                       DETAILS
    ================================================= */
    setText("detailCategory", venture.category);
    setText("detailRevenue", venture.revenue);
    setText("detailGrowth", venture.growth);
    setText("detailSeller", venture.seller);
    /* =================================================
                       SELLER
    ================================================= */
    setText("sellerName", venture.seller);
    setText("sellerAvatar", getInitials(venture.seller));
    /* =================================================
                       DEAL PANEL
    ================================================= */
    setText("dealPrice", venture.askingPrice);
    setText("dealRevenue", venture.revenue);
    setText("dealGrowth", venture.growth);
    setText("dealCategory", venture.category);
    /* =================================================
                       VERIFICATION
    ================================================= */
    const verificationLabel = $("verificationLabel");
    const verifiedBadge = $("verifiedBadge");
    if (!venture.verified) {
        if (verificationLabel) {
            verificationLabel.textContent =
                "VENTURE LISTING";
        }
        if (verifiedBadge) {
            verifiedBadge.style.display =
                "none";
        }
    }
}

/* =====================================================
                        INITIALS
===================================================== */

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

/* =====================================================
                        FAVORITES
===================================================== */
function refreshFavorite() {
    if (!venture) {
        return;
    }
    const favoriteButton = $("favoriteBtn");
    if (!favoriteButton) {
        return;
    }
    const isFavorite = NEXUP.favorites.has(venture.id);
    favoriteButton.textContent =
        isFavorite
            ? "♥"
            : "♡";
    favoriteButton.classList.toggle("active", isFavorite);
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
}

function toggleFavorite() {
    if (!venture) {
        return;
    }

    NEXUP.favorites.toggle(venture.id);
    refreshFavorite();
}

/* =====================================================
                         BACK
===================================================== */

function setupBack() {
    const backButton = $("backBtn");
    if (!backButton) {
        return;
    }
    backButton.addEventListener("click", () => {
        if (document.referrer &&
            document.referrer.includes(window.location.host)) {
            history.back();
            return;
        }
        window.location.href =
            "home2.html";
    });
}

/* =====================================================
                         PROFILE
===================================================== */

function setupProfile() {
    const profileButton = $("profileBtn");
    if (!profileButton) {
        return;
    }
    profileButton.addEventListener("click", () => {
        window.location.href =
            "profile.html";
    });
}

/* =====================================================
                         SEARCH
===================================================== */

function setupSearch() {
    const searchButton = $("searchBtn");
    if (!searchButton) {
        return;
    }
    searchButton.addEventListener("click", () => {
        window.location.href = "marketplace.html?focus=search";
    });
}

/* =====================================================
                         INIT
===================================================== */

function initVenturePage() {
    loadVenture();
    refreshFavorite();
    const favoriteButton = $("favoriteBtn");
    favoriteButton?.addEventListener("click", toggleFavorite);
    setupBack();
    setupProfile();
    setupSearch();
}

/* =====================================================
                         START
===================================================== */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVenturePage);
}
else {
    initVenturePage();
}
