/* ======================================================
                       NEXUP PITCH
                     PAGE ENGINE
====================================================== */


/* ======================================================
                    VENTURE DATA
====================================================== */

const ventures = [

    {
        id: 1,
        name: "NovaMind AI",
        category: "AI",
        tagline: "The operating layer for repetitive work.",
        description:
            "NovaMind AI helps modern businesses eliminate repetitive operations through intelligent automation.",
        pitch:
            "We're building the operating layer for businesses that are tired of repetitive work.",
        founder: "Alex Carter",
        founderInitial: "A",
        revenue: "$18.2K",
        growth: "+143%",
        price: "$185K",
        views: "2.4K",
        image: "../assets/ventures/venture1.jpg"
    },

    {
        id: 2,
        name: "FlowDesk",
        category: "SaaS",
        tagline: "A simpler workspace for teams that move fast.",
        description:
            "FlowDesk is a lightweight workspace built for fast-moving teams.",
        pitch:
            "The simpler your workspace becomes, the faster your team can actually move.",
        founder: "Daniel Ross",
        founderInitial: "D",
        revenue: "$9.2K",
        growth: "+87%",
        price: "$78K",
        views: "1.8K",
        image: "../assets/ventures/venture2.jpg"
    },

    {
        id: 3,
        name: "GameForge",
        category: "Gaming",
        tagline: "Tools for creators building games people remember.",
        description:
            "GameForge creates community-driven tools for independent game creators.",
        pitch:
            "Independent creators shouldn't need a massive studio to build something people remember.",
        founder: "Ryan Cole",
        founderInitial: "R",
        revenue: "$4.3K",
        growth: "+121%",
        price: "$42K",
        views: "3.1K",
        image: "../assets/ventures/venture3.jpg"
    },

    {
        id: 4,
        name: "UrbanCart",
        category: "E-Commerce",
        tagline: "Curated commerce for the brands worth discovering.",
        description:
            "UrbanCart is a curated marketplace connecting local brands with buyers.",
        pitch:
            "The next generation of commerce won't feel like a catalogue. It'll feel curated.",
        founder: "Maya Singh",
        founderInitial: "M",
        revenue: "$12.6K",
        growth: "+96%",
        price: "$115K",
        views: "2.7K",
        image: "../assets/ventures/venture4.jpg"
    },

    {
        id: 5,
        name: "LearnMate",
        category: "Apps",
        tagline: "A learning companion that follows the learner.",
        description:
            "LearnMate is a personalized learning companion for ambitious students.",
        pitch:
            "Learning shouldn't stop when the lesson ends. LearnMate follows the learner.",
        founder: "Arjun Mehta",
        founderInitial: "A",
        revenue: "$6.7K",
        growth: "+156%",
        price: "$49K",
        views: "4.2K",
        image: "../assets/ventures/venture5.jpg"
    },

    {
        id: 6,
        name: "EcoDrive",
        category: "Startup",
        tagline: "Technology for cleaner, smarter mobility.",
        description:
            "EcoDrive develops technology helping cities transition toward cleaner mobility.",
        pitch:
            "Cleaner cities won't be built by tomorrow. They'll be built by better decisions today.",
        founder: "Noah Wilson",
        founderInitial: "N",
        revenue: "$15.4K",
        growth: "+112%",
        price: "$240K",
        views: "3.8K",
        image: "../assets/ventures/venture6.jpg"
    },

    {
        id: 7,
        name: "PixelPilot",
        category: "AI",
        tagline: "Less friction between creative ideas and final frames.",
        description:
            "PixelPilot is an AI-powered creative workflow for modern design teams.",
        pitch:
            "Creative teams don't need more tools. They need fewer things standing between an idea and the final frame.",
        founder: "Leo Martin",
        founderInitial: "L",
        revenue: "$5.3K",
        growth: "+134%",
        price: "$36K",
        views: "1.6K",
        image: "../assets/ventures/venture7.jpg"
    },

    {
        id: 8,
        name: "TaskOrbit",
        category: "SaaS",
        tagline: "Project intelligence without the clutter.",
        description:
            "TaskOrbit provides simple project intelligence without the clutter.",
        pitch:
            "Project management should tell you what matters next — not bury you in another dashboard.",
        founder: "Chris Evans",
        founderInitial: "C",
        revenue: "$8.1K",
        growth: "+105%",
        price: "$62K",
        views: "2.2K",
        image: "../assets/ventures/venture8.jpg"
    },

    {
        id: 9,
        name: "QuickBite",
        category: "E-Commerce",
        tagline: "Discover the food brands already worth knowing.",
        description:
            "QuickBite is a fast-growing discovery platform for independent food brands.",
        pitch:
            "The best food brands are already out there. We're building the place where people finally discover them.",
        founder: "Sam Wilson",
        founderInitial: "S",
        revenue: "$3.9K",
        growth: "+178%",
        price: "$28K",
        views: "1.9K",
        image: "../assets/ventures/venture9.jpg"
    }

];


/* ======================================================
                  GET VENTURE FROM URL
====================================================== */

function getVentureFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(
            params.get("id")
        );

    if (!id) {
        return ventures[0];
    }

    return (
        ventures.find(
            venture =>
                venture.id === id
        ) ||
        ventures[0]
    );

}


/* ======================================================
                    CURRENT VENTURE
====================================================== */

const pitchData =
    getVentureFromURL();


/* ======================================================
                      DOM READY
====================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initialisePitch();

    }
);


/* ======================================================
                  INITIALISE PITCH
====================================================== */

function initialisePitch() {

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

    document.title =
        `${pitchData.name} — NEXUP`;


    /* ----------------------------------------------
                       HERO TITLE
    ---------------------------------------------- */

    const title =
        document.querySelector(
            ".hero-copy h1"
        );


    if (title) {

        const nameParts =
            pitchData.name.split(" ");


        if (
            nameParts.length > 1
        ) {

            const first =
                nameParts
                    .slice(0, -1)
                    .join(" ");

            const last =
                nameParts[
                    nameParts.length - 1
                ];


            title.innerHTML =
                `${first} <em>${last}</em>`;

        } else {

            title.textContent =
                pitchData.name;

        }

    }


    /* ----------------------------------------------
                       CATEGORY
    ---------------------------------------------- */

    const category =
        document.querySelector(
            ".category"
        );


    if (category) {

        category.textContent =
            pitchData.category;

    }


    /* ----------------------------------------------
                       TAGLINE
    ---------------------------------------------- */

    const tagline =
        document.querySelector(
            ".hero-tagline"
        );


    if (tagline) {

        tagline.textContent =
            pitchData.tagline;

    }


    /* ----------------------------------------------
                    DESCRIPTION
    ---------------------------------------------- */

    const description =
        document.querySelector(
            ".hero-description"
        );


    if (description) {

        description.textContent =
            pitchData.description;

    }


    /* ----------------------------------------------
                       FOUNDER
    ---------------------------------------------- */

    const founder =
        document.querySelector(
            ".hero-seller strong"
        );


    if (founder) {

        founder.textContent =
            pitchData.founder;

    }


    const sellerAvatar =
        document.querySelector(
            ".seller-avatar"
        );


    if (sellerAvatar) {

        sellerAvatar.textContent =
            pitchData.founderInitial;

    }


    /* ----------------------------------------------
                     HERO IMAGE
    ---------------------------------------------- */

    const heroImage =
        document.querySelector(
            ".hero-visual img"
        );


    if (heroImage) {

        heroImage.src =
            pitchData.image;

        heroImage.alt =
            pitchData.name;

    }


    /* ----------------------------------------------
                     VISUAL BREAK
    ---------------------------------------------- */

    const breakImage =
        document.querySelector(
            ".visual-break img"
        );


    if (breakImage) {

        breakImage.src =
            pitchData.image;

    }


    /* ----------------------------------------------
                    HERO METRICS
    ---------------------------------------------- */

    const metrics =
        document.querySelectorAll(
            ".hero-metrics .metric strong"
        );


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

    const largeAvatar =
        document.querySelector(
            ".large-avatar"
        );


    if (largeAvatar) {

        largeAvatar.textContent =
            pitchData.founderInitial;

    }


    const sellerName =
        document.querySelector(
            ".seller-main h2"
        );


    if (sellerName) {

        sellerName.textContent =
            pitchData.founder;

    }


    const sellerRole =
        document.querySelector(
            ".seller-main p"
        );


    if (sellerRole) {

        sellerRole.textContent =
            `Founder · ${pitchData.name}`;

    }


    /* ----------------------------------------------
                    TRACTION METRICS
    ---------------------------------------------- */

    const tractionCards =
        document.querySelectorAll(
            ".traction-card"
        );


    if (tractionCards.length >= 3) {

        const revenueValue =
            tractionCards[0]
                .querySelector("strong");

        const growthValue =
            tractionCards[1]
                .querySelector("strong");

        const viewsValue =
            tractionCards[2]
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

    const storyLead =
        document.querySelector(
            ".pitch-story .story-lead"
        );


    if (storyLead) {

        storyLead.textContent =
            pitchData.description;

    }


    /* ----------------------------------------------
                    FOUNDER AVATARS
    ---------------------------------------------- */

    const allAvatars =
        document.querySelectorAll(
            ".seller-avatar, .large-avatar"
        );


    allAvatars.forEach(
        avatar => {

            avatar.textContent =
                pitchData.founderInitial;

        }
    );

}


/* ======================================================
                       SHARE
====================================================== */

function setupShare() {

    const button =
        document.getElementById(
            "shareButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async () => {

            const shareData = {

                title:
                    `${pitchData.name} — NEXUP`,

                text:
                    `Take a look at ${pitchData.name} on NEXUP.`,

                url:
                    window.location.href

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                    return;

                }


                await navigator.clipboard.writeText(
                    window.location.href
                );


                showToast(
                    "Pitch link copied"
                );


            } catch (error) {

                /* User cancelled share. */

            }

        }
    );

}


/* ======================================================
                     CONTACT
====================================================== */

function setupContact() {

    const button =
        document.getElementById(
            "contactButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            showToast(
                "Seller contact will open here."
            );

        }
    );

}


/* ======================================================
                       TOAST
====================================================== */

function showToast(
    message
) {

    let toast =
        document.querySelector(
            ".pitch-toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.className =
            "pitch-toast";


        document.body.appendChild(
            toast
        );


        Object.assign(
            toast.style,
            {

                position: "fixed",

                left: "50%",

                bottom: "30px",

                transform:
                    "translateX(-50%) translateY(20px)",

                padding: "12px 18px",

                border:
                    "1px solid rgba(255,255,255,.12)",

                borderRadius: "5px",

                background: "#111",

                color: "#aaa",

                fontFamily:
                    "Manrope, sans-serif",

                fontSize: "9px",

                zIndex: "9999",

                opacity: "0",

                transition:
                    "opacity .25s ease, transform .25s ease"

            }

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


/* ======================================================
                  SCROLL REVEALS
====================================================== */

function setupScrollReveal() {

    const sections =
        document.querySelectorAll(
            `
            .story-section,
            .visual-break,
            .traction-section,
            .opportunity-section,
            .seller-section
            `
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        sections.forEach(
            section =>
                section.classList.add(
                    "in-view"
                )
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "in-view"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(
        section =>
            observer.observe(
                section
            )
    );

}


/* ======================================================
                   IMAGE PARALLAX
====================================================== */

function setupImageParallax() {

    const visual =
        document.querySelector(
            ".visual-break"
        );


    const image =
        visual?.querySelector(
            "img"
        );


    if (
        !visual ||
        !image
    ) {
        return;
    }


    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) {
                return;
            }


            ticking = true;


            requestAnimationFrame(
                () => {

                    const rect =
                        visual.getBoundingClientRect();


                    const windowHeight =
                        window.innerHeight;


                    if (
                        rect.bottom > 0 &&
                        rect.top < windowHeight
                    ) {

                        const progress =
                            (
                                windowHeight -
                                rect.top
                            )
                            /
                            (
                                windowHeight +
                                rect.height
                            );


                        const offset =
                            (
                                progress -
                                0.5
                            )
                            * 45;


                        image.style.transform =
                            `scale(1.08) translateY(${offset}px)`;

                    }


                    ticking = false;

                }
            );

        },
        {
            passive: true
        }
    );

}


/* ======================================================
                  KEYBOARD SHORTCUT
====================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            window.history.back();

        }

    }
);