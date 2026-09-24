/**
 * NilKishorIT - Central Data Store & LocalStorage Sync Engine
 * Pure Vanilla JavaScript
 */

const STORAGE_KEYS = {
    SITE_INFO: 'nilkishor_site_info',
    HERO_SLIDES: 'nilkishor_hero_slides',
    HERO_CARDS: 'nilkishor_hero_cards',
    PROJECTS: 'nilkishor_projects',
    SERVICES: 'nilkishor_services',
    TEAM: 'nilkishor_team',
    INQUIRIES: 'nilkishor_inquiries'
};

// Default Hero Banner Slides (Auto-transitioning background and headline)
const DEFAULT_HERO_SLIDES = [
    {
        id: "slide-1",
        category: "Consulting",
        title: "Engineering Scalable Digital Solutions for Forward-Thinking Businesses",
        subtitle: "We engineer high-performance web applications, enterprise ERPs, intelligent mobile solutions, and custom software that drive business acceleration.",
        bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85",
        primaryBtnText: "Start a Project",
        primaryBtnUrl: "#contact",
        secondaryBtnText: "Explore the work",
        secondaryBtnUrl: "#projects"
    },
    {
        id: "slide-2",
        category: "Artificial Intelligence",
        title: "Enterprise AI & Intelligent Workflow Automation",
        subtitle: "Harness custom machine learning pipelines, LLM fine-tuning, and predictive analytics to optimize decision-making and operational velocity.",
        bgImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1800&q=85",
        primaryBtnText: "Request AI Audit",
        primaryBtnUrl: "#contact",
        secondaryBtnText: "View AI Projects",
        secondaryBtnUrl: "project-detail.html?id=proj-2"
    },
    {
        id: "slide-3",
        category: "Hybrid Cloud Architecture",
        title: "Cloud-Native Infrastructure & Zero-Downtime Migration",
        subtitle: "Architect resilient multi-cloud foundations on AWS & Azure engineered for enterprise compliance, high security, and 99.99% availability.",
        bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85",
        primaryBtnText: "Consult Cloud Experts",
        primaryBtnUrl: "#contact",
        secondaryBtnText: "Explore Architecture",
        secondaryBtnUrl: "project-detail.html?id=proj-1"
    },
    {
        id: "slide-4",
        category: "Digital Commerce & FinTech",
        title: "Omnichannel Digital Commerce & FinTech Platforms",
        subtitle: "Next-generation headless applications with instant payment processing, real-time analytics, and millisecond-level responsiveness.",
        bgImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=85",
        primaryBtnText: "Build Your Platform",
        primaryBtnUrl: "#contact",
        secondaryBtnText: "Case Studies",
        secondaryBtnUrl: "#projects"
    }
];

// 1. Default Site Info
const DEFAULT_SITE_INFO = {
    brandName: "NilKishorIT",
    brandTagline: "Innovating Digital Realities",
    heroTitle: "NilKishorIT Consulting",
    heroSubtitle: "NilKishorIT and enterprise AI help forward-thinking organizations accelerate secure digital transformation, software engineering, and AI across core operations.",
    primaryCtaText: "Start a Project",
    secondaryCtaText: "Explore the work",
    satisfactionRate: "99% Client Satisfaction",
    deliveryCommitment: "Guaranteed On-Time Delivery",
    experienceYears: "5+",
    completedProjects: "45+",
    teamExperts: "20+",
    happyClients: "35+",
    contactEmail: "contact@nilkishorit.com",
    contactPhone: "+880 1700-000000",
    address: "Dhaka, Bangladesh"
};

// 2. Default Hero Consulting Cards (IBM Consulting Style 4 Cards)
const DEFAULT_HERO_CARDS = [
    {
        id: "hero-card-1",
        badge: "Data & AI",
        title: "Data & AI services",
        description: "Successfully scale AI with the right strategy, data, security and governance in place.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
        techStack: ["AI Strategy", "Governance", "MLOps"],
        stats: "Enterprise AI",
        icon: "cpu",
        linkText: "Learn more",
        linkUrl: "project-detail.html?id=proj-2"
    },
    {
        id: "hero-card-2",
        badge: "Transformation",
        title: "Business transformation consulting",
        description: "A structured approach to help clients through every step of their digital & tech transformation.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
        techStack: ["Strategy", "Architecture", "Scaling"],
        stats: "Strategy First",
        icon: "server",
        linkText: "Learn more",
        linkUrl: "project-detail.html?id=proj-1"
    },
    {
        id: "hero-card-3",
        badge: "Hybrid Cloud",
        title: "Cloud consulting services",
        description: "Maximize the value of hybrid cloud and cloud-native architecture in the generative AI era.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
        techStack: ["AWS", "Azure", "DevOps"],
        stats: "99.99% Reliability",
        icon: "shopping-bag",
        linkText: "Learn more",
        linkUrl: "project-detail.html?id=proj-3"
    },
    {
        id: "hero-card-4",
        badge: "Operations",
        title: "Business Operations Services",
        description: "Delivering a modern model for transforming core business and IT functions with agile velocity.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
        techStack: ["FinTech", "Automation", "Workflow"],
        stats: "Continuous Delivery",
        icon: "smartphone",
        linkText: "Learn more",
        linkUrl: "project-detail.html?id=proj-4"
    }
];

// 3. Default Projects (E-Commerce Style Case Studies)
const DEFAULT_PROJECTS = [
    {
        id: "proj-1",
        title: "ApexCloud - Intelligent Enterprise ERP",
        category: "Enterprise ERP",
        tag: "Enterprise",
        shortDesc: "A complete enterprise resource planning suite for multinational logistics and manufacturing firms.",
        mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        galleryImages: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
        ],
        client: "Global Logistics Ltd.",
        timeline: "4 Months",
        role: "Architecture, UI/UX & Full Stack Development",
        liveUrl: "https://example.com/demo-erp",
        challenge: "The client suffered from fragmented inventory tracking across 12 branch warehouses, resulting in delayed shipments, redundant stock costs, and error-prone manual Excel reporting.",
        solution: "NilKishorIT architected a unified real-time dashboard with automated stock balancing, barcode dispatch verification, and multi-tier role authorization.",
        keyFeatures: [
            "Real-time Inventory Synchronization across all regional nodes",
            "Automated Invoicing & Tax Compliance Generation",
            "Executive Business Intelligence Visual Dashboards",
            "Multi-factor Biometric Access Control & Audit Logs"
        ],
        techStack: ["Vanilla JS", "Node.js REST", "PostgreSQL", "Docker", "AWS"],
        rating: 5,
        testimonial: "NilKishorIT completely revolutionized our daily logistics operations. Inventory discrepancy dropped to zero in just 30 days."
    },
    {
        id: "proj-2",
        title: "NeuralCare - AI Clinical Diagnostics",
        category: "AI & Cloud",
        tag: "AI & ML",
        shortDesc: "Healthcare automation engine facilitating patient symptom triage and automated lab analytics.",
        mainImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        galleryImages: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
        ],
        client: "BioMed Health Systems",
        timeline: "3.5 Months",
        role: "AI Integration & Medical Portal Engineering",
        liveUrl: "https://example.com/demo-neuralcare",
        challenge: "Doctors spent more than 40% of their consultation hours typing medical notes and manually searching previous medical lab records.",
        solution: "Developed an AI-guided assistant that automatically extracts vital parameters from medical transcripts, highlighting critical metrics instantly.",
        keyFeatures: [
            "HIPAA-compliant encrypted data pipeline",
            "Instant transcription & summarization of doctor-patient notes",
            "Abnormal lab value warning system",
            "Fast patient history search engine"
        ],
        techStack: ["Python", "Machine Learning", "Secure WebSockets", "Microservices"],
        rating: 5,
        testimonial: "An extraordinary leap in healthcare technology. Our diagnostic turnaround is now 3x faster!"
    },
    {
        id: "proj-3",
        title: "VeloxStore - Global Headless E-Commerce",
        category: "Web Application",
        tag: "E-Commerce",
        shortDesc: "Next-gen lightning fast online retail experience built for maximum checkout conversion.",
        mainImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
        galleryImages: [
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80"
        ],
        client: "Velox Fashion Brand",
        timeline: "2.5 Months",
        role: "E-Commerce Architecture & UI/UX Design",
        liveUrl: "https://example.com/demo-ecommerce",
        challenge: "Existing monolithic platform had an 8-second page load time causing a 65% cart abandonment rate on mobile devices.",
        solution: "Engineered a headless storefront with pre-rendered static assets, sub-second product filtering, and 1-click checkout flow.",
        keyFeatures: [
            "Sub-second page navigation and search indexing",
            "Automated abandoned cart email sequences",
            "Global multi-currency & localized payment gateways",
            "Dynamic discount & inventory management system"
        ],
        techStack: ["Modern JS", "CSS Grid & Flex", "Stripe API", "CDN Optimization"],
        rating: 5,
        testimonial: "Our sales spiked by 48% within the very first month after NilKishorIT deployed the new storefront."
    },
    {
        id: "proj-4",
        title: "PayPulse - Secure FinTech Mobile Wallet",
        category: "Mobile App",
        tag: "FinTech",
        shortDesc: "Modern consumer banking and contactless QR payment app with instant balance settlement.",
        mainImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        galleryImages: [
            "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80"
        ],
        client: "PayPulse Financial Services",
        timeline: "5 Months",
        role: "Mobile App & Backend Security",
        liveUrl: "https://example.com/demo-paypulse",
        challenge: "Creating an intuitive payment application that satisfies stringent central bank financial security protocols without slowing down UX.",
        solution: "Implemented end-to-end payload cryptography, biometric login, and lightweight state syncing that operates smoothly even on weak 3G connections.",
        keyFeatures: [
            "Instant QR Peer-to-Peer Payments & Utility Bill Settlement",
            "Biometric Fingerprint & FaceID Transaction Authorization",
            "Real-Time Push Notifications for every ledger movement",
            "Virtual Debit Card Generator with Freeze Controls"
        ],
        techStack: ["Hybrid Mobile", "Secure Cryptography", "WebSockets", "Cloud Functions"],
        rating: 5,
        testimonial: "Outstanding security engineering. We passed our regulatory security audit on the very first try."
    }
];

// 4. Default Services
const DEFAULT_SERVICES = [
    {
        id: "srv-1",
        number: "01",
        title: "Custom Web Application",
        shortDesc: "Scalable, blazing-fast web applications built for business logic and seamless user workflows.",
        features: ["SPA & Modular Architecture", "Responsive On All Devices", "High SEO Performance", "Clean Codebase"]
    },
    {
        id: "srv-2",
        number: "02",
        title: "Enterprise ERP & CRM",
        shortDesc: "Centralize your organization's operations, supply chains, sales pipelines, and reporting.",
        features: ["Inventory Tracking", "Automated Accounting", "Role-based Access", "Custom Integrations"]
    },
    {
        id: "srv-3",
        number: "03",
        title: "Mobile App Development",
        shortDesc: "iOS and Android apps designed for engagement, speed, offline capability, and smooth transitions.",
        features: ["Fluid Native Experience", "Cross-Platform Efficiency", "Push Notifications", "App Store Publishing"]
    },
    {
        id: "srv-4",
        number: "04",
        title: "UI/UX & Product Design",
        shortDesc: "Human-centered digital interfaces that turn complex products into intuitive digital journeys.",
        features: ["Wireframing & Prototyping", "Design Systems", "User Journey Mapping", "Conversion Optimization"]
    },
    {
        id: "srv-5",
        number: "05",
        title: "AI & Process Automation",
        shortDesc: "Automate repetitive workflows and empower your systems with machine learning and intelligent models.",
        features: ["Smart Chatbots & Triage", "Workflow Automation", "Data Analytics & ML", "API Integration"]
    },
    {
        id: "srv-6",
        number: "06",
        title: "Cloud Infrastructure & DevOps",
        shortDesc: "High-availability deployment, container orchestration, and 24/7 security monitoring.",
        features: ["Automated CI/CD", "AWS & Cloud Hosting", "Zero-Downtime Migration", "DDoS & Firewall Security"]
    }
];

// 5. Default Team Members
const DEFAULT_TEAM = [
    {
        id: "team-1",
        name: "Abdul Kader Imran",
        role: "Founder & Lead Architect",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        bio: "Specializing in high-concurrency systems, distributed cloud architecture, and modern product engineering.",
        skills: ["System Design", "Cloud Architecture", "Full-Stack"],
        social: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            email: "founder@nilkishorit.com"
        }
    },
    {
        id: "team-2",
        name: "Tanvir Ahmed",
        role: "Head of Engineering",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        bio: "10+ years engineering enterprise platforms, API gateways, and ultra-secure database systems.",
        skills: ["Node.js", "Python", "Database Scaling"],
        social: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            email: "tanvir@nilkishorit.com"
        }
    },
    {
        id: "team-3",
        name: "Nusrat Jahan",
        role: "Lead UI/UX Designer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        bio: "Creating user-first design systems and micro-interactions that boost customer conversion.",
        skills: ["Figma", "Design Systems", "User Research"],
        social: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            email: "nusrat@nilkishorit.com"
        }
    },
    {
        id: "team-4",
        name: "Firos Munna",
        role: "Senior Mobile Engineer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        bio: "Passionate about building buttery-smooth Android and iOS consumer applications.",
        skills: ["Flutter", "React Native", "Native APIs"],
        social: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            email: "sabbir@nilkishorit.com"
        }
    }
];

// Data Store Helper Object
const NilKishorData = {
    // Site Info
    getSiteInfo: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.SITE_INFO);
        return stored ? JSON.parse(stored) : DEFAULT_SITE_INFO;
    },
    saveSiteInfo: function (info) {
        localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(info));
    },

    // Hero Banner Slides (Top Banner with auto background & text transition)
    getHeroSlides: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
        return stored ? JSON.parse(stored) : DEFAULT_HERO_SLIDES;
    },
    saveHeroSlides: function (slides) {
        localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
    },
    addHeroSlide: function (slide) {
        const slides = this.getHeroSlides();
        slide.id = "slide-" + Date.now();
        slides.push(slide);
        this.saveHeroSlides(slides);
        return slide;
    },
    deleteHeroSlide: function (id) {
        let slides = this.getHeroSlides();
        slides = slides.filter(s => s.id !== id);
        this.saveHeroSlides(slides);
    },
    updateHeroSlide: function (updatedSlide) {
        let slides = this.getHeroSlides();
        const index = slides.findIndex(s => s.id === updatedSlide.id);
        if (index !== -1) {
            slides[index] = updatedSlide;
            this.saveHeroSlides(slides);
        }
    },

    // Hero Cards
    getHeroCards: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.HERO_CARDS);
        let cards = stored ? JSON.parse(stored) : DEFAULT_HERO_CARDS;
        // Ensure image fallback
        const fallbackImages = [
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80"
        ];
        return cards.map((c, i) => {
            if (!c.image) c.image = fallbackImages[i % fallbackImages.length];
            return c;
        });
    },
    saveHeroCards: function (cards) {
        localStorage.setItem(STORAGE_KEYS.HERO_CARDS, JSON.stringify(cards));
    },
    addHeroCard: function (card) {
        const cards = this.getHeroCards();
        card.id = "hero-card-" + Date.now();
        cards.push(card);
        this.saveHeroCards(cards);
        return card;
    },
    deleteHeroCard: function (id) {
        let cards = this.getHeroCards();
        cards = cards.filter(c => c.id !== id);
        this.saveHeroCards(cards);
    },
    updateHeroCard: function (updatedCard) {
        let cards = this.getHeroCards();
        const index = cards.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
            cards[index] = updatedCard;
            this.saveHeroCards(cards);
        }
    },

    // Projects
    getProjects: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
    },
    getProjectById: function (id) {
        const projects = this.getProjects();
        return projects.find(p => p.id === id) || null;
    },
    saveProjects: function (projects) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    },
    addProject: function (proj) {
        const projects = this.getProjects();
        proj.id = "proj-" + Date.now();
        projects.unshift(proj);
        this.saveProjects(projects);
        return proj;
    },
    deleteProject: function (id) {
        let projects = this.getProjects();
        projects = projects.filter(p => p.id !== id);
        this.saveProjects(projects);
    },
    updateProject: function (updatedProj) {
        let projects = this.getProjects();
        const index = projects.findIndex(p => p.id === updatedProj.id);
        if (index !== -1) {
            projects[index] = updatedProj;
            this.saveProjects(projects);
        }
    },

    // Services
    getServices: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
        return stored ? JSON.parse(stored) : DEFAULT_SERVICES;
    },

    // Team
    getTeam: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.TEAM);
        return stored ? JSON.parse(stored) : DEFAULT_TEAM;
    },
    saveTeam: function (team) {
        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
    },
    addTeamMember: function (member) {
        const team = this.getTeam();
        member.id = "team-" + Date.now();
        team.push(member);
        this.saveTeam(team);
        return member;
    },
    deleteTeamMember: function (id) {
        let team = this.getTeam();
        team = team.filter(m => m.id !== id);
        this.saveTeam(team);
    },

    // Inquiries (Contact messages from visitors)
    getInquiries: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
        return stored ? JSON.parse(stored) : [];
    },
    addInquiry: function (inquiry) {
        const list = this.getInquiries();
        inquiry.id = "inq-" + Date.now();
        inquiry.date = new Date().toLocaleString();
        list.unshift(inquiry);
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
        return inquiry;
    },
    deleteInquiry: function (id) {
        let list = this.getInquiries();
        list = list.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
    },

    // Export Data as JSON
    exportDataJson: function () {
        const data = {
            siteInfo: this.getSiteInfo(),
            heroSlides: this.getHeroSlides(),
            heroCards: this.getHeroCards(),
            projects: this.getProjects(),
            services: this.getServices(),
            team: this.getTeam(),
            inquiries: this.getInquiries(),
            exportedAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    },

    // Reset All Data
    resetToDefaults: function () {
        localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(DEFAULT_SITE_INFO));
        localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(DEFAULT_HERO_SLIDES));
        localStorage.setItem(STORAGE_KEYS.HERO_CARDS, JSON.stringify(DEFAULT_HERO_CARDS));
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(DEFAULT_TEAM));
    }
};

// Initialize if empty
(function initNilKishorStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.SITE_INFO)) {
        NilKishorData.resetToDefaults();
    }
})();
