/* =====================================================
                         NEXUP
                    VENTURE PAGE JS
===================================================== */


/* =====================================================
                     VENTURE DATA
===================================================== */

const ventures = [

    {
        id: 1,
        name: "NovaMind AI",
        category: "AI",
        revenue: "$18.2K/mo",
        growth: "+143%",
        askingPrice: "$185K",
        views: "2.4K",
        seller: "Alex Carter",
        verified: true,

        description:
            "An AI-powered productivity platform helping teams automate repetitive workflows and work smarter.",

        longDescription:
            "NovaMind AI gives modern teams a faster way to automate everyday operations. From repetitive workflows to internal processes, the platform turns hours of manual work into automated systems.",

        headline:
            "Built to remove the busy from business."
    },


    {
        id: 2,
        name: "FlowDesk",
        category: "SaaS",
        revenue: "$9.8K/mo",
        growth: "+87%",
        askingPrice: "$72K",
        views: "1.8K",
        seller: "Maya Shah",
        verified: true,

        description:
            "A lightweight workflow platform designed for small teams that need simple project and process management.",

        longDescription:
            "FlowDesk combines project organization, team workflows and lightweight automation into one focused workspace.",

        headline:
            "Simple workflows. Serious momentum."
    },


    {
        id: 3,
        name: "GameForge",
        category: "Gaming",
        revenue: "$14.5K/mo",
        growth: "+121%",
        askingPrice: "$130K",
        views: "3.1K",
        seller: "Ryan Cole",
        verified: true,

        description:
            "A gaming platform built around community-driven experiences and creator-led content.",

        longDescription:
            "GameForge gives creators a place to build and distribute community-driven gaming experiences.",

        headline:
            "Where players become creators."
    },


    {
        id: 4,
        name: "UrbanCart",
        category: "E-Commerce",
        revenue: "$22.4K/mo",
        growth: "+96%",
        askingPrice: "$210K",
        views: "4.6K",
        seller: "Arjun Mehta",
        verified: true,

        description:
            "A modern commerce brand focused on curated everyday products for urban consumers.",

        longDescription:
            "UrbanCart has built a focused product catalog and recognizable brand around convenience-driven urban shopping.",

        headline:
            "Everyday commerce, redesigned."
    },


    {
        id: 5,
        name: "LearnMate",
        category: "Apps",
        revenue: "$6.7K/mo",
        growth: "+74%",
        askingPrice: "$58K",
        views: "1.2K",
        seller: "Priya Nair",
        verified: false,

        description:
            "A learning companion app helping students build consistent study habits.",

        longDescription:
            "LearnMate combines planning, reminders and focused learning tools into a simple mobile experience.",

        headline:
            "A better way to keep learning."
    },


    {
        id: 6,
        name: "EcoDrive",
        category: "Startup",
        revenue: "$11.3K/mo",
        growth: "+156%",
        askingPrice: "$145K",
        views: "2.9K",
        seller: "Daniel Roy",
        verified: true,

        description:
            "A sustainability-focused mobility venture helping consumers make cleaner transportation choices.",

        longDescription:
            "EcoDrive is building a digital layer around sustainable mobility, helping users discover and choose cleaner transportation options.",

        headline:
            "Moving people toward a cleaner future."
    }

];


/* =====================================================
                 READ VENTURE FROM URL
===================================================== */

const params =
    new URLSearchParams(
        window.location.search
    );


const rawId =
    params.get("id");


const ventureId =
    parseInt(
        rawId,
        10
    );


/*
    IMPORTANT:

    We are NOT doing:

        Number(params.get("id")) || 1

    because that silently turns a bad/missing ID
    into NovaMind.

    Now the URL must explicitly contain a valid ID.
*/


const venture =
    ventures.find(
        item =>
            item.id === ventureId
    );


/* =====================================================
                     ELEMENT HELPER
===================================================== */

function $(id){

    return document.getElementById(id);

}


/* =====================================================
                  SAFE TEXT HELPER
===================================================== */

function setText(
    id,
    value
){

    const element =
        $(id);


    if(!element){
        return;
    }


    element.textContent =
        value;

}


/* =====================================================
                     LOAD VENTURE
===================================================== */

function loadVenture(){

    /*
        If the ID is invalid, show an actual
        error instead of secretly loading NovaMind.
    */

    if(!venture){

        document.title =
            "NEXUP | Venture Not Found";


        setText(
            "ventureName",
            "Venture not found"
        );


        setText(
            "ventureDescription",
            "This venture does not exist or is no longer available."
        );


        setText(
            "ventureCategory",
            "NEXUP"
        );


        setText(
            "ventureType",
            "UNAVAILABLE"
        );


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

    setText(
        "ventureName",
        venture.name
    );


    setText(
        "ventureCategory",
        venture.category
    );


    setText(
        "ventureType",
        venture.category
    );


    setText(
        "ventureDescription",
        venture.description
    );


    setText(
        "ventureSeller",
        `Built by ${venture.seller}`
    );


    /* =================================================
                       MAIN STATS
    ================================================= */

    setText(
        "askingPrice",
        venture.askingPrice
    );


    setText(
        "revenue",
        venture.revenue.replace(
            "/mo",
            ""
        )
    );


    setText(
        "growth",
        venture.growth
    );


    setText(
        "views",
        venture.views
    );


    setText(
        "categoryStat",
        venture.category
    );


    /* =================================================
                       DESCRIPTION
    ================================================= */

    setText(
        "ventureHeadline",
        venture.headline
    );


    setText(
        "ventureLongDescription",
        venture.longDescription
    );


    /* =================================================
                       DETAILS
    ================================================= */

    setText(
        "detailCategory",
        venture.category
    );


    setText(
        "detailRevenue",
        venture.revenue
    );


    setText(
        "detailGrowth",
        venture.growth
    );


    setText(
        "detailSeller",
        venture.seller
    );


    /* =================================================
                       SELLER
    ================================================= */

    setText(
        "sellerName",
        venture.seller
    );


    setText(
        "sellerAvatar",
        getInitials(
            venture.seller
        )
    );


    /* =================================================
                       DEAL PANEL
    ================================================= */

    setText(
        "dealPrice",
        venture.askingPrice
    );


    setText(
        "dealRevenue",
        venture.revenue
    );


    setText(
        "dealGrowth",
        venture.growth
    );


    setText(
        "dealCategory",
        venture.category
    );


    /* =================================================
                       VERIFICATION
    ================================================= */

    const verificationLabel =
        $("verificationLabel");


    const verifiedBadge =
        $("verifiedBadge");


    if(!venture.verified){

        if(verificationLabel){

            verificationLabel.textContent =
                "VENTURE LISTING";

        }


        if(verifiedBadge){

            verifiedBadge.style.display =
                "none";

        }

    }

}


/* =====================================================
                        INITIALS
===================================================== */

function getInitials(name){

    return name
        .split(" ")
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .slice(
            0,
            2
        )
        .toUpperCase();

}


/* =====================================================
                        FAVORITES
===================================================== */

const FAVORITES_KEY =
    "nexupFavorites";


function getFavorites(){

    try{

        return JSON.parse(
            localStorage.getItem(
                FAVORITES_KEY
            )
        ) || [];

    }catch(error){

        return [];

    }

}


function saveFavorites(
    favorites
){

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(
            favorites
        )
    );

}


function refreshFavorite(){

    if(!venture){
        return;
    }


    const favoriteButton =
        $("favoriteBtn");


    if(!favoriteButton){
        return;
    }


    const favorites =
        getFavorites();


    const isFavorite =
        favorites.includes(
            venture.id
        );


    favoriteButton.textContent =
        isFavorite
            ? "♥"
            : "♡";


    favoriteButton.classList.toggle(
        "active",
        isFavorite
    );


    favoriteButton.setAttribute(
        "aria-pressed",
        String(isFavorite)
    );

}


function toggleFavorite(){

    if(!venture){
        return;
    }


    const favorites =
        getFavorites();


    const index =
        favorites.indexOf(
            venture.id
        );


    if(index === -1){

        favorites.push(
            venture.id
        );

    }else{

        favorites.splice(
            index,
            1
        );

    }


    saveFavorites(
        favorites
    );


    refreshFavorite();

}


/* =====================================================
                         BACK
===================================================== */

function setupBack(){

    const backButton =
        $("backBtn");


    if(!backButton){
        return;
    }


    backButton.addEventListener(
        "click",
        () => {

            if(
                document.referrer &&
                document.referrer.includes(
                    window.location.host
                )
            ){

                history.back();

                return;

            }


            window.location.href =
                "home2.html";

        }
    );

}


/* =====================================================
                         PROFILE
===================================================== */

function setupProfile(){

    const profileButton =
        $("profileBtn");


    if(!profileButton){
        return;
    }


    profileButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "profile.html";

        }
    );

}


/* =====================================================
                         SEARCH
===================================================== */

function setupSearch(){

    const searchButton =
        $("searchBtn");


    if(!searchButton){
        return;
    }


    searchButton.addEventListener(
        "click",
        () => {

            const query =
                prompt(
                    "Search NEXUP"
                );


            if(!query){
                return;
            }


            window.location.href =
                `home2.html?search=${encodeURIComponent(query)}`;

        }
    );

}


/* =====================================================
                         INIT
===================================================== */

function initVenturePage(){

    loadVenture();

    refreshFavorite();

    const favoriteButton =
        $("favoriteBtn");


    favoriteButton?.addEventListener(
        "click",
        toggleFavorite
    );


    setupBack();

    setupProfile();

    setupSearch();


    /*
        DEBUG INFO

        Open DevTools → Console.

        You'll see exactly which venture
        the page thinks it received.
    */

    console.log(
        "NEXUP Venture ID:",
        ventureId
    );


    console.log(
        "NEXUP Venture:",
        venture
            ? venture.name
            : "NOT FOUND"
    );

}


/* =====================================================
                         START
===================================================== */

if(
    document.readyState === "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initVenturePage
    );

}else{

    initVenturePage();

}