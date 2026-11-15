/* =====================================================
                      NEXUP SELL
                  LIVE CARD BUILDER
===================================================== */

/* =====================================================
                       ELEMENTS
===================================================== */
const ventureName = document.getElementById("ventureName");
const category = document.getElementById("category");
const tagline = document.getElementById("tagline");
const description = document.getElementById("description");
const revenue = document.getElementById("revenue");
const growth = document.getElementById("growth");
const price = document.getElementById("price");
const founder = document.getElementById("founder");
const founderRole = document.getElementById("founderRole");
const ventureImage = document.getElementById("ventureImage");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
const uploadContent = document.getElementById("uploadContent");
const removeImage = document.getElementById("removeImage");

/* =====================================================
                    PREVIEW ELEMENTS
===================================================== */
const previewName = document.getElementById("previewName");
const previewCategory = document.getElementById("previewCategory");
const previewPitch = document.getElementById("previewPitch");
const previewDescription = document.getElementById("previewDescription");
const previewRevenue = document.getElementById("previewRevenue");
const previewGrowth = document.getElementById("previewGrowth");
const previewPrice = document.getElementById("previewPrice");
const previewFounder = document.getElementById("previewFounder");
const previewAvatar = document.getElementById("previewAvatar");
const previewImage = document.getElementById("previewImage");
const previewImageBox = document.querySelector(".preview-image");
const descriptionCount = document.getElementById("descriptionCount");

/* =====================================================
                     FORMAT MONEY
===================================================== */

const formatMoney = NEXUP.fmt.money;

/* =====================================================
                  UPDATE PREVIEW
===================================================== */

function updatePreview() {
    /* NAME */
    const name = ventureName.value.trim();
    previewName.textContent =
        name || "Your venture";
    /* CATEGORY */
    previewCategory.textContent =
        category.value || "CATEGORY";
    /* PITCH */
    previewPitch.textContent =
        tagline.value.trim() ||
            "Your one-line pitch appears here.";
    /* DESCRIPTION */
    previewDescription.textContent =
        description.value.trim() ||
            "Your venture description will appear here as buyers explore your listing.";
    /* REVENUE */
    previewRevenue.textContent =
        formatMoney(revenue.value) +
            "/mo";
    /* GROWTH */
    const growthValue = growth.value.trim();
    previewGrowth.textContent =
        "+" +
            (growthValue || "0") +
            "%";
    /* PRICE */
    previewPrice.textContent =
        formatMoney(price.value);
    /* FOUNDER */
    const founderName = founder.value.trim();
    previewFounder.textContent =
        founderName ||
            "Your name";
    previewAvatar.textContent =
        founderName
            ? founderName.charAt(0).toUpperCase()
            : "N";
    /* DESCRIPTION COUNT */
    descriptionCount.textContent =
        description.value.length;
}

/* =====================================================
                    LIVE INPUTS
===================================================== */
[
    ventureName,
    category,
    tagline,
    description,
    revenue,
    growth,
    price,
    founder,
    founderRole
].forEach(element => {
    element.addEventListener("input", updatePreview);
    element.addEventListener("change", updatePreview);
});

/* =====================================================
                    IMAGE UPLOAD
===================================================== */
imageUpload.addEventListener("click", event => {
    if (event.target.closest("#removeImage")) {
        return;
    }
    ventureImage.click();
});
/* The uploaded picture is shrunk before it is stored, so a listing stays small enough for the browser to keep. */
let uploadedImage = "";

function shrinkImage(source, maxWidth = 900, quality = 0.8) {
    return new Promise(resolve => {
        const image = new Image();

        image.onload = () => {
            const scale = Math.min(1, maxWidth / image.width);
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);
            canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/jpeg", quality));
        };

        image.onerror = () => resolve("");
        image.src = source;
    });
}

ventureImage.addEventListener("change", () => {
    const file = ventureImage.files[0];

    if (!file || !file.type.startsWith("image/")) {
        return;
    }

    const reader = new FileReader();

    reader.onload = async event => {
        uploadedImage = await shrinkImage(event.target.result);

        if (!uploadedImage) {
            NEXUP.toast("That image could not be read.");
            return;
        }

        imagePreview.src = uploadedImage;
        previewImage.src = uploadedImage;
        imageUpload.classList.add("has-image");
        previewImageBox.classList.add("has-image");
    };

    reader.readAsDataURL(file);
});

/* =====================================================
                    REMOVE IMAGE
===================================================== */
removeImage.addEventListener("click", event => {
    event.stopPropagation();
    uploadedImage = "";
    ventureImage.value =
        "";
    imagePreview.src =
        "";
    previewImage.src =
        "";
    imageUpload.classList.remove("has-image");
    previewImageBox.classList.remove("has-image");
});

/* =====================================================
                    PUBLISH
===================================================== */

function buildListing() {
    const name = ventureName.value.trim();
    const pitch = tagline.value.trim() || description.value.trim().slice(0, 100);
    const founderName = founder.value.trim() || NEXUP.profile.name() || "Anonymous founder";

    return {
        name,
        category: category.value,
        tagline: pitch,
        description: description.value.trim(),
        pitch,
        story: description.value.trim(),
        headline: pitch,
        longDescription: description.value.trim(),
        seller: founderName,
        revenue: Math.max(0, Number(revenue.value) || 0),
        growth: Math.max(0, Number(growth.value) || 0),
        price: Math.max(0, Number(price.value) || 0),
        views: 0,
        verified: false,
        featured: false,
        icon: name.charAt(0).toUpperCase(),
        image: uploadedImage
    };
}

document.getElementById("publishButton").addEventListener("click", () => {
    if (!ventureName.value.trim()) {
        NEXUP.toast("Give your venture a name first.");
        ventureName.focus();
        return;
    }

    if (!category.value) {
        NEXUP.toast("Select a category first.");
        category.focus();
        return;
    }

    if (!description.value.trim()) {
        NEXUP.toast("Add a short description.");
        description.focus();
        return;
    }

    const fields = buildListing();
    let listing = NEXUP.listings.add(fields);

    /* Browser storage is full: try again without the picture. */
    let droppedImage = false;

    if (!listing && fields.image) {
        listing = NEXUP.listings.add({ ...fields, image: "" });
        droppedImage = Boolean(listing);
    }

    if (!listing) {
        NEXUP.toast("Could not save your listing. Browser storage may be full or blocked.");
        return;
    }

    NEXUP.toast(droppedImage ? "Listed without the image, it was too large to store." : "Venture listed. Opening it now…");
    setTimeout(() => {
        window.location.href = `venture.html?id=${listing.id}`;
    }, 900);
});

/* =====================================================
                         INIT
===================================================== */
updatePreview();
