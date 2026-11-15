/* =========================================================
                      NEXUP PROFILE
   Display name, your listings and a reset for browser data.
========================================================= */

const esc = NEXUP.escapeHtml;

function renderStats() {
    const stages = NEXUP.storage.read(NEXUP.KEYS.pipeline, {});
    const saved = NEXUP.favorites.ids();
    const talks = saved.filter(id => ["In talks", "Offer made"].includes(stages[id])).length;
    const listed = NEXUP.listings.all().length;

    document.getElementById("statSaved").textContent = saved.length;
    document.getElementById("statTalks").textContent = talks;
    document.getElementById("statListed").textContent = listed;
    document.getElementById("heroCount").textContent = listed;
}

function renderListings() {
    const list = document.getElementById("listingsList");
    const mine = NEXUP.listings.all();

    if (!mine.length) {
        list.innerHTML = `
            <p class="page-intro">
                You have not listed anything yet.
                <a href="sell.html" style="color:var(--mint)">List a venture ↗</a>
            </p>`;
        return;
    }

    list.innerHTML = mine.map(listing => `
        <div class="listing-row">
            <div>
                <a href="venture.html?id=${listing.id}">${esc(listing.name)}</a>
                <small>${esc(listing.category)} · ${NEXUP.fmt.money(listing.price)}</small>
            </div>
            <button class="profile-button" type="button" data-remove-listing="${listing.id}" aria-label="Delete ${esc(listing.name)}">Delete</button>
        </div>
    `).join("");
}

function refresh() {
    renderStats();
    renderListings();
}

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("profileName");
    nameInput.value = NEXUP.profile.name();

    document.getElementById("nameForm").addEventListener("submit", event => {
        event.preventDefault();
        NEXUP.profile.setName(nameInput.value);
        document.querySelectorAll(".profile-letter").forEach(letter => {
            letter.textContent = NEXUP.profile.initial();
        });
        NEXUP.toast("Name saved.");
    });

    document.getElementById("listingsList").addEventListener("click", event => {
        const button = event.target.closest("[data-remove-listing]");
        if (!button) return;

        NEXUP.listings.remove(button.dataset.removeListing);
        NEXUP.favorites.remove(button.dataset.removeListing);
        NEXUP.toast("Listing deleted.");
        refresh();
    });

    /* Two clicks to confirm, so data is never cleared by accident. */
    const reset = document.getElementById("resetData");
    let armed = 0;

    reset.addEventListener("click", () => {
        if (!armed) {
            reset.textContent = "Click again to confirm";
            armed = setTimeout(() => {
                reset.textContent = "Clear all NEXUP data";
                armed = 0;
            }, 3500);
            return;
        }

        clearTimeout(armed);
        Object.values(NEXUP.KEYS).forEach(key => {
            try { localStorage.removeItem(key); } catch (error) { /* ignore */ }
        });
        window.location.reload();
    });

    NEXUP.favorites.onChange(refresh);
    refresh();
});
