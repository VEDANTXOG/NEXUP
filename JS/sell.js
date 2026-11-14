/* =====================================================
                      NEXUP SELL
                  LIVE CARD BUILDER
===================================================== */


/* =====================================================
                       ELEMENTS
===================================================== */

const ventureName =
    document.getElementById("ventureName");

const category =
    document.getElementById("category");

const tagline =
    document.getElementById("tagline");

const description =
    document.getElementById("description");

const revenue =
    document.getElementById("revenue");

const growth =
    document.getElementById("growth");

const price =
    document.getElementById("price");

const founder =
    document.getElementById("founder");

const founderRole =
    document.getElementById("founderRole");

const ventureImage =
    document.getElementById("ventureImage");

const imageUpload =
    document.getElementById("imageUpload");

const imagePreview =
    document.getElementById("imagePreview");

const uploadContent =
    document.getElementById("uploadContent");

const removeImage =
    document.getElementById("removeImage");


/* =====================================================
                    PREVIEW ELEMENTS
===================================================== */

const previewName =
    document.getElementById("previewName");

const previewCategory =
    document.getElementById("previewCategory");

const previewPitch =
    document.getElementById("previewPitch");

const previewDescription =
    document.getElementById("previewDescription");

const previewRevenue =
    document.getElementById("previewRevenue");

const previewGrowth =
    document.getElementById("previewGrowth");

const previewPrice =
    document.getElementById("previewPrice");

const previewFounder =
    document.getElementById("previewFounder");

const previewAvatar =
    document.getElementById("previewAvatar");

const previewImage =
    document.getElementById("previewImage");

const previewImageBox =
    document.querySelector(".preview-image");

const descriptionCount =
    document.getElementById("descriptionCount");


/* =====================================================
                     FORMAT MONEY
===================================================== */

function formatMoney(value) {

    const number =
        Number(value);

    if (!number) {
        return "$0";
    }


    if (number >= 1000000) {

        return "$" +
            (number / 1000000)
                .toFixed(1)
                .replace(".0", "") +
            "M";

    }


    if (number >= 1000) {

        return "$" +
            (number / 1000)
                .toFixed(1)
                .replace(".0", "") +
            "K";

    }


    return "$" + number.toLocaleString();

}


/* =====================================================
                  UPDATE PREVIEW
===================================================== */

function updatePreview() {


    /* NAME */

    const name =
        ventureName.value.trim();


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

    const growthValue =
        growth.value.trim();


    previewGrowth.textContent =
        "+" +
        (growthValue || "0") +
        "%";



    /* PRICE */

    previewPrice.textContent =
        formatMoney(price.value);



    /* FOUNDER */

    const founderName =
        founder.value.trim();


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

    element.addEventListener(
        "input",
        updatePreview
    );


    element.addEventListener(
        "change",
        updatePreview
    );

});


/* =====================================================
                    IMAGE UPLOAD
===================================================== */

imageUpload.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "#removeImage"
            )
        ) {
            return;
        }


        ventureImage.click();

    }
);


ventureImage.addEventListener(
    "change",
    () => {

        const file =
            ventureImage.files[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            event => {

                const imageData =
                    event.target.result;


                imagePreview.src =
                    imageData;


                previewImage.src =
                    imageData;


                imageUpload.classList.add(
                    "has-image"
                );


                previewImageBox.classList.add(
                    "has-image"
                );

            };


        reader.readAsDataURL(file);

    }
);


/* =====================================================
                    REMOVE IMAGE
===================================================== */

removeImage.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        ventureImage.value =
            "";


        imagePreview.src =
            "";


        previewImage.src =
            "";


        imageUpload.classList.remove(
            "has-image"
        );


        previewImageBox.classList.remove(
            "has-image"
        );

    }
);


/* =====================================================
                    PUBLISH
===================================================== */

document
    .getElementById("publishButton")
    .addEventListener(
        "click",
        () => {

            const name =
                ventureName.value.trim();


            if (!name) {

                showToast(
                    "Give your venture a name first."
                );


                ventureName.focus();

                return;

            }


            if (!category.value) {

                showToast(
                    "Select a category first."
                );


                category.focus();

                return;

            }


            if (!description.value.trim()) {

                showToast(
                    "Add a short description."
                );


                description.focus();

                return;

            }


            showToast(
                "Venture ready to publish."
            );

        }
    );


/* =====================================================
                       TOAST
===================================================== */

function showToast(message) {

    let toast =
        document.querySelector(
            ".sell-toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.className =
            "sell-toast";


        Object.assign(
            toast.style,
            {

                position: "fixed",

                left: "50%",

                bottom: "30px",

                transform:
                    "translateX(-50%) translateY(20px)",

                padding:
                    "13px 19px",

                border:
                    "1px solid rgba(255,255,255,.12)",

                background:
                    "#111313",

                color:
                    "#c8ccc9",

                fontFamily:
                    "Manrope, sans-serif",

                fontSize:
                    "9px",

                letterSpacing:
                    ".05em",

                zIndex:
                    "9999",

                opacity:
                    "0",

                transition:
                    "opacity .25s ease, transform .25s ease"

            }
        );


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    requestAnimationFrame(
        () => {

            toast.style.opacity =
                "1";

            toast.style.transform =
                "translateX(-50%) translateY(0)";

        }
    );


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateX(-50%) translateY(20px)";

            },
            2400
        );

}


/* =====================================================
                         INIT
===================================================== */

updatePreview();