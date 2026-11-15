/* =========================================================
                      NEXUP DATA
        The single source of truth for demo content.
   Every page loads this file first, then shared.js.
========================================================= */

window.NEXUP_DATA = {

    /* Venture catalogue (revenue is per month, price and revenue in USD, growth in %) */
    ventures: [
        {
            id: 1,
            name: "NovaMind AI",
            category: "AI",
            tagline: "The operating layer for repetitive work.",
            description: "AI automation platform helping modern businesses eliminate repetitive work.",
            pitch: "We're building the operating layer for businesses that are tired of repetitive work.",
            story: "NovaMind AI helps modern businesses eliminate repetitive operations through intelligent automation.",
            headline: "Built to remove the busy from business.",
            longDescription: "NovaMind AI gives modern teams a faster way to automate everyday operations. From repetitive workflows to internal processes, the platform turns hours of manual work into automated systems.",
            seller: "Alex Carter",
            revenue: 18200,
            growth: 143,
            price: 185000,
            views: 2400,
            verified: true,
            featured: true,
            icon: "N",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 2,
            name: "FlowDesk",
            category: "SaaS",
            tagline: "A simpler workspace for teams that move fast.",
            description: "A lightweight workspace built for fast-moving teams.",
            pitch: "The simpler your workspace becomes, the faster your team can actually move.",
            story: "FlowDesk is a lightweight workspace built for fast-moving teams.",
            headline: "Simple workflows. Serious momentum.",
            longDescription: "FlowDesk combines project organization, team workflows and lightweight automation into one focused workspace.",
            seller: "Daniel Ross",
            revenue: 9200,
            growth: 87,
            price: 78000,
            views: 1800,
            verified: true,
            featured: true,
            icon: "F",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 3,
            name: "GameForge",
            category: "Gaming",
            tagline: "Tools for creators building games people remember.",
            description: "Community-driven tools for independent game creators.",
            pitch: "Independent creators shouldn't need a massive studio to build something people remember.",
            story: "GameForge creates community-driven tools for independent game creators.",
            headline: "Where players become creators.",
            longDescription: "GameForge gives creators a place to build and distribute community-driven gaming experiences.",
            seller: "Ryan Cole",
            revenue: 4300,
            growth: 121,
            price: 42000,
            views: 3100,
            verified: true,
            featured: true,
            icon: "G",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 4,
            name: "UrbanCart",
            category: "E-Commerce",
            tagline: "Curated commerce for the brands worth discovering.",
            description: "A curated marketplace connecting local brands with buyers.",
            pitch: "The next generation of commerce won't feel like a catalogue. It'll feel curated.",
            story: "UrbanCart is a curated marketplace connecting local brands with buyers.",
            headline: "Everyday commerce, redesigned.",
            longDescription: "UrbanCart has built a focused product catalog and recognizable brand around convenience-driven urban shopping.",
            seller: "Maya Singh",
            revenue: 12600,
            growth: 96,
            price: 115000,
            views: 2700,
            verified: true,
            featured: true,
            icon: "U",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 5,
            name: "LearnMate",
            category: "Apps",
            tagline: "A learning companion that follows the learner.",
            description: "Personalized learning companion for ambitious students.",
            pitch: "Learning shouldn't stop when the lesson ends. LearnMate follows the learner.",
            story: "LearnMate is a personalized learning companion for ambitious students.",
            headline: "A better way to keep learning.",
            longDescription: "LearnMate combines planning, reminders and focused learning tools into a simple mobile experience.",
            seller: "Arjun Mehta",
            revenue: 6700,
            growth: 156,
            price: 49000,
            views: 4200,
            verified: true,
            featured: true,
            icon: "L",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 6,
            name: "EcoDrive",
            category: "Startup",
            tagline: "Technology for cleaner, smarter mobility.",
            description: "Technology helping cities transition toward cleaner mobility.",
            pitch: "Cleaner cities won't be built by tomorrow. They'll be built by better decisions today.",
            story: "EcoDrive develops technology helping cities transition toward cleaner mobility.",
            headline: "Moving people toward a cleaner future.",
            longDescription: "EcoDrive is building a digital layer around sustainable mobility, helping users discover and choose cleaner transportation options.",
            seller: "Noah Wilson",
            revenue: 15400,
            growth: 112,
            price: 240000,
            views: 3800,
            verified: true,
            featured: true,
            icon: "E",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 7,
            name: "PixelPilot",
            category: "AI",
            tagline: "Less friction between creative ideas and final frames.",
            description: "AI-powered creative workflow for modern design teams.",
            pitch: "Creative teams don't need more tools. They need fewer things standing between an idea and the final frame.",
            story: "PixelPilot is an AI-powered creative workflow for modern design teams.",
            headline: "Design faster, ship sooner.",
            longDescription: "PixelPilot removes the friction between a rough idea and a finished frame. Its AI assistant handles layout, asset cleanup, and handoff, so design teams spend their time on decisions instead of busywork.",
            seller: "Leo Martin",
            revenue: 5300,
            growth: 134,
            price: 36000,
            views: 1600,
            verified: false,
            featured: false,
            icon: "P",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 8,
            name: "TaskOrbit",
            category: "SaaS",
            tagline: "Project intelligence without the clutter.",
            description: "Simple project intelligence without the clutter.",
            pitch: "Project management should tell you what matters next — not bury you in another dashboard.",
            story: "TaskOrbit provides simple project intelligence without the clutter.",
            headline: "Projects without the overhead.",
            longDescription: "TaskOrbit is a minimal project tracker for small teams that find the big tools too heavy. It keeps tasks, owners, and deadlines in one calm view and stays out of the way.",
            seller: "Chris Evans",
            revenue: 8100,
            growth: 105,
            price: 62000,
            views: 2200,
            verified: true,
            featured: false,
            icon: "T",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"
        },
        {
            id: 9,
            name: "QuickBite",
            category: "E-Commerce",
            tagline: "Discover the food brands already worth knowing.",
            description: "A fast-growing discovery platform for independent food brands.",
            pitch: "The best food brands are already out there. We're building the place where people finally discover them.",
            story: "QuickBite is a fast-growing discovery platform for independent food brands.",
            headline: "Dinner, delivered by the neighbourhood.",
            longDescription: "QuickBite connects independent local kitchens with nearby customers through a simple ordering layer. Restaurants keep their margins, and customers get faster, fresher delivery.",
            seller: "Sam Wilson",
            revenue: 3900,
            growth: 178,
            price: 28000,
            views: 1900,
            verified: false,
            featured: false,
            icon: "Q",
            image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1000&q=85"
        }
    ],

    /* Founder pitch cards shown on the home page carousel */
    pitchCards: [
        {
            ventureId: 1,
            label: "AI",
            statement: "Automation should feel invisible.",
            description: "NovaMind is building tools that remove repetitive work from modern teams without adding another layer of complexity."
        },
        {
            ventureId: 2,
            label: "SAAS",
            statement: "Workflows shouldn't fight you.",
            description: "FlowDesk brings scattered team processes into one simple operating layer designed around how people actually work."
        },
        {
            ventureId: 3,
            label: "GAMING",
            statement: "Small studios deserve a bigger stage.",
            description: "GameForge gives independent creators the infrastructure and distribution they need to build sustainable game businesses."
        },
        {
            ventureId: 4,
            label: "COMMERCE",
            statement: "Local commerce can move faster.",
            description: "UrbanCart connects neighborhood businesses with customers through a commerce layer built for smaller operators."
        },
        {
            ventureId: 5,
            label: "APPS",
            statement: "Learning works better together.",
            description: "LearnMate turns peer knowledge into a practical learning network for students and independent learners."
        }
    ],

    /* Categories a venture can be listed under */
    categories: [
    "AI",
    "SaaS",
    "E-Commerce",
    "Gaming",
    "Apps",
    "Startup",
    "Fintech",
    "Health",
    "Other"
]
};
