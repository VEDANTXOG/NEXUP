/* =========================================================
                    NEXUP CATEGORIES
              Browse ventures by category
========================================================= */

const esc = NEXUP.escapeHtml;

const DESCRIPTIONS = {
    "AI": "Models, automation and AI-native products.",
    "SaaS": "Recurring-revenue software for teams and businesses.",
    "E-Commerce": "Stores, marketplaces and commerce infrastructure.",
    "Gaming": "Studios, tools and publishing ecosystems.",
    "Apps": "Consumer and mobile products with real users.",
    "Startup": "Early-stage companies with a working product.",
    "Fintech": "Payments, lending and money tools.",
    "Health": "Wellness, care and health-tech products.",
    "Other": "Ventures that do not fit neatly into a box."
};

function averageGrowth(name) {
    const group = NEXUP.ventures.filter(venture => venture.category === name);

    if (!group.length) return null;

    const total = group.reduce((sum, venture) => sum + Number(venture.growth || 0), 0);
    return Math.round(total / group.length);
}

function createCategoryCard({ name, count }, index) {
    const growth = averageGrowth(name);
    const label = `${count} ${count === 1 ? "venture" : "ventures"}`;

    return `
        <article
            class="favorite-card is-visible"
            data-category="${esc(name)}"
            tabindex="0"
            role="link"
            aria-label="Browse ${esc(name)} ventures (${label})"
        >
            <div class="favorite-card-top">
                <span class="favorite-number">CATEGORY / ${String(index + 1).padStart(2, "0")}</span>
                <span class="favorite-category">${label}</span>
            </div>

            <div class="favorite-main">
                <h3>${esc(name)}</h3>
                <p class="favorite-description">${esc(DESCRIPTIONS[name] || "")}</p>
            </div>

            <div class="favorite-footer">
                <div class="favorite-seller">
                    <span>AVG. GROWTH</span>
                    <span>${growth === null ? "No data yet" : NEXUP.fmt.growth(growth)}</span>
                </div>
                <div class="favorite-actions">
                    <span class="view-venture">BROWSE ↗</span>
                </div>
            </div>
        </article>
    `;
}

function openCategory(name) {
    window.location.href = `marketplace.html?category=${encodeURIComponent(name)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("categoriesGrid");
    const counts = NEXUP.categoryCounts();

    grid.innerHTML = counts.map(createCategoryCard).join("");
    document.getElementById("heroCount").textContent = counts.filter(item => item.count > 0).length;

    grid.addEventListener("click", event => {
        const card = event.target.closest(".favorite-card");
        if (card) openCategory(card.dataset.category);
    });

    grid.addEventListener("keydown", event => {
        const card = event.target.closest(".favorite-card");

        if (card && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openCategory(card.dataset.category);
        }
    });
});
