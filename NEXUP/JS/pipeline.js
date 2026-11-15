/* =========================================================
                     NEXUP PIPELINE
     Track saved ventures through deal stages. Stages are
     kept in localStorage under NEXUP.KEYS.pipeline.
========================================================= */

const esc = NEXUP.escapeHtml;
const STAGES = ["Saved", "Researching", "In talks", "Offer made"];

function readStages() {
    const stored = NEXUP.storage.read(NEXUP.KEYS.pipeline, {});
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
}

function stageOf(id) {
    const stage = readStages()[id];
    return STAGES.includes(stage) ? stage : STAGES[0];
}

function setStage(id, stage) {
    if (!STAGES.includes(stage)) return;
    NEXUP.storage.write(NEXUP.KEYS.pipeline, { ...readStages(), [id]: stage });
}

function createCard(venture) {
    const options = STAGES
        .map(stage => `<option value="${esc(stage)}"${stage === stageOf(venture.id) ? " selected" : ""}>${esc(stage)}</option>`)
        .join("");

    return `
        <article class="pipeline-card">
            <a class="pipeline-name" href="venture.html?id=${venture.id}">${esc(venture.name)}</a>
            <span class="pipeline-meta">${esc(venture.category)} · ${NEXUP.fmt.money(venture.price)}</span>
            <div class="pipeline-actions">
                <label class="sr-only" for="stage-${venture.id}">Stage for ${esc(venture.name)}</label>
                <select id="stage-${venture.id}" data-stage-for="${venture.id}">${options}</select>
                <button class="pipeline-drop" type="button" data-drop="${venture.id}" aria-label="Remove ${esc(venture.name)} from pipeline">Drop</button>
            </div>
        </article>
    `;
}

function render() {
    const saved = NEXUP.favorites.ids().map(id => NEXUP.byId(id)).filter(Boolean);
    const board = document.getElementById("pipelineBoard");
    const empty = document.getElementById("emptyState");

    document.getElementById("heroCount").textContent = saved.length;
    empty.style.display = saved.length ? "none" : "grid";
    board.style.display = saved.length ? "grid" : "none";

    board.innerHTML = STAGES.map(stage => {
        const cards = saved.filter(venture => stageOf(venture.id) === stage);

        return `
            <section class="pipeline-column" aria-label="${esc(stage)}">
                <div class="pipeline-column-head">
                    <span>${esc(stage)}</span>
                    <strong>${cards.length}</strong>
                </div>
                <div class="pipeline-list">
                    ${cards.length ? cards.map(createCard).join("") : '<p class="pipeline-empty">Nothing here yet.</p>'}
                </div>
            </section>
        `;
    }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("pipelineBoard");

    board.addEventListener("change", event => {
        const select = event.target.closest("select[data-stage-for]");
        if (!select) return;

        setStage(select.dataset.stageFor, select.value);
        render();
        document.getElementById(`stage-${select.dataset.stageFor}`)?.focus();
    });

    board.addEventListener("click", event => {
        const drop = event.target.closest("[data-drop]");
        if (!drop) return;

        NEXUP.favorites.remove(drop.dataset.drop);
        render();
    });

    NEXUP.favorites.onChange(render);
    render();
});
