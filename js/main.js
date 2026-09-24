/**
 * NilKishorIT - Main Website JavaScript Controller
 * Renders:
 * - Dynamic Site Info
 * - Services Grid
 * - E-Commerce Clickable Projects Showcase with Filters
 * - Project Quickview Lightbox Modal
 * - Interactive Tech Stack Category Tabs
 * - Meet Our Team Section
 * - Animated Stats Counter on Scroll
 * - Testimonial Carousel
 * - Interactive FAQ Accordion
 * - Contact Form Validation & Inquiries Storage
 * - Scroll-to-Top Button & Notification Bar Dismissal
 */

document.addEventListener('DOMContentLoaded', () => {
    renderSiteInfo();
    renderServices();
    renderProjects('all');
    setupProjectFilters();
    setupProjectQuickModal();
    setupTechTabs();
    renderTeam();
    setupStatsCounter();
    setupTestimonialSlider();
    setupFaqAccordion();
    setupContactForm();
    setupMobileNav();
    setupStickyNav();
    setupScrollTopBtn();
    setupTopBarClose();
});

// 1. Render Dynamic Site Info from NilKishorData
function renderSiteInfo() {
    const info = NilKishorData.getSiteInfo();

    // Brand Names
    document.querySelectorAll('.brand-name-text').forEach(el => el.textContent = info.brandName || "NilKishorIT");

    // Hero Text
    const heroTitleEl = document.getElementById('heroMainTitle');
    if (heroTitleEl && info.heroTitle) {
        heroTitleEl.textContent = info.heroTitle;
    }

    const heroSubEl = document.getElementById('heroSubtitle');
    if (heroSubEl && info.heroSubtitle) heroSubEl.textContent = info.heroSubtitle;

    const heroBadgeEl = document.getElementById('heroBadgeText');
    if (heroBadgeEl) heroBadgeEl.textContent = info.heroBadge;

    // Contact info
    const phoneEl = document.getElementById('topBarPhone');
    if (phoneEl) phoneEl.textContent = info.contactPhone;

    const emailEl = document.getElementById('topBarEmail');
    if (emailEl) emailEl.textContent = info.contactEmail;

    // Trust metrics
    const stat1El = document.getElementById('heroStat1');
    if (stat1El) stat1El.textContent = info.satisfactionRate;

    const stat2El = document.getElementById('heroStat2');
    if (stat2El) stat2El.textContent = info.deliveryCommitment;

    // Counters
    const cntYears = document.getElementById('cntYears');
    if (cntYears) cntYears.setAttribute('data-target', parseInt(info.experienceYears) || 5);

    const cntProjects = document.getElementById('cntProjects');
    if (cntProjects) cntProjects.setAttribute('data-target', parseInt(info.completedProjects) || 45);

    const cntExperts = document.getElementById('cntExperts');
    if (cntExperts) cntExperts.setAttribute('data-target', parseInt(info.teamExperts) || 20);

    const cntClients = document.getElementById('cntClients');
    if (cntClients) cntClients.setAttribute('data-target', parseInt(info.happyClients) || 35);
}

// 2. Render Core Services
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    const services = NilKishorData.getServices();
    container.innerHTML = services.map(s => `
        <div class="service-card">
            <div class="service-header">
                <div class="service-icon-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                </div>
                <span class="service-num">${s.number}</span>
            </div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.shortDesc}</p>
            <ul class="service-features-list">
                ${(s.features || []).map(f => `<li>${f}</li>`).join('')}
            </ul>
            <a href="#contact" class="service-card-link">
                Discuss Project &rarr;
            </a>
        </div>
    `).join('');
}

// 3. Render Projects (With E-Commerce Clickable Link & Quickview Modal Option)
function renderProjects(filterCategory = 'all') {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    let projects = NilKishorData.getProjects();

    if (filterCategory !== 'all') {
        projects = projects.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));
    }

    if (projects.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No projects found in this category.</div>`;
        return;
    }

    container.innerHTML = projects.map(p => `
        <div class="project-card" data-id="${p.id}" tabindex="0">
            <div class="project-img-wrapper">
                <img src="${p.mainImage}" alt="${p.title}" class="project-img" loading="lazy">
                <span class="project-category-badge">${p.tag || p.category}</span>
                <div class="project-details-overlay">
                    <div style="display:flex; gap:10px;">
                        <button class="project-view-badge quick-view-btn" data-id="${p.id}" style="cursor:pointer; border:none;">
                            👁️ Quick View
                        </button>
                        <a href="project-detail.html?id=${p.id}" class="project-view-badge" style="text-decoration:none;">
                            🌐 Full Page &rarr;
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content" onclick="window.location.href='project-detail.html?id=${p.id}'" style="cursor:pointer;">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.shortDesc}</p>
                <div class="project-tech-tags">
                    ${(p.techStack || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Attach quick view click listeners
    container.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            openQuickViewModal(id);
        });
    });
}

// 4. Setup Project Category Filters
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            renderProjects(category);
        });
    });
}

// 5. In-Page Lightbox Modal for Project Quickview
function setupProjectQuickModal() {
    const modal = document.getElementById('projectQuickModal');
    const closeBtn = document.getElementById('closeQuickModal');

    if (!modal) return;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
}

function openQuickViewModal(projectId) {
    const project = NilKishorData.getProjectById(projectId);
    const modal = document.getElementById('projectQuickModal');
    const modalBody = document.getElementById('quickModalBody');

    if (!project || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <img src="${project.mainImage}" alt="${project.title}" style="width:100%; height:320px; object-fit:cover; border-radius:14px; border:1px solid #E2E8F0;">
                <div style="display:flex; gap:10px; margin-top:14px; overflow-x:auto;">
                    ${(project.galleryImages || []).map(img => `
                        <img src="${img}" style="width:70px; height:50px; object-fit:cover; border-radius:8px; border:1px solid #E2E8F0;" alt="">
                    `).join('')}
                </div>
            </div>
            <div>
                <span class="section-tag" style="margin-bottom:10px;">${project.category}</span>
                <h2 style="font-size:1.6rem; margin-bottom:10px; color:#0F172A;">${project.title}</h2>
                <p style="color:#64748B; font-size:0.95rem; margin-bottom:16px;">${project.shortDesc}</p>
                
                <div style="margin-bottom:16px;">
                    <strong style="font-size:0.85rem; color:#0F172A; text-transform:uppercase;">Client:</strong>
                    <span style="font-size:0.95rem; color:#475569;"> ${project.client || 'Enterprise'}</span>
                    <span style="margin: 0 8px;">•</span>
                    <strong style="font-size:0.85rem; color:#0F172A; text-transform:uppercase;">Timeline:</strong>
                    <span style="font-size:0.95rem; color:#475569;"> ${project.timeline || '3 Months'}</span>
                </div>

                <div style="margin-bottom:20px;">
                    <div style="font-size:0.82rem; font-weight:700; color:#0F172A; margin-bottom:6px;">TECH STACK:</div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;">
                        ${(project.techStack || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>

                <div style="display:flex; gap:12px;">
                    <a href="project-detail.html?id=${project.id}" class="btn btn-primary" style="flex:1;">
                        View Full Case Study &rarr;
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('open');
}

// 6. Interactive Tech Stack Explorer Tabs
const TECH_DATABASE = {
    all: [
        { icon: "⚛️", name: "Vanilla & Modern JS", desc: "Ultra-fast client logic" },
        { icon: "🌐", name: "HTML5 & CSS3", desc: "Clean semantic markup" },
        { icon: "🟢", name: "Node.js / Express", desc: "Microservices architecture" },
        { icon: "🐍", name: "Python & Fast-API", desc: "Data processing & AI models" },
        { icon: "🐘", name: "PostgreSQL & SQL", desc: "ACID compliant persistence" },
        { icon: "☁️", name: "Docker & AWS", desc: "High-availability DevOps" }
    ],
    frontend: [
        { icon: "⚛️", name: "Vanilla JavaScript", desc: "Zero framework bloat" },
        { icon: "🎨", name: "Modern CSS3 & Grid", desc: "Pixel-perfect responsive UX" },
        { icon: "⚡", name: "Next-Gen Web APIs", desc: "WebSockets & Fetch API" },
        { icon: "📱", name: "Progressive Web App", desc: "Offline caching & service workers" }
    ],
    backend: [
        { icon: "🟢", name: "Node.js / Express", desc: "High concurrency async APIs" },
        { icon: "🐍", name: "Python Backend", desc: "Automation and business rules" },
        { icon: "🐘", name: "PostgreSQL", desc: "Enterprise relational database" },
        { icon: "🍃", name: "MongoDB / NoSQL", desc: "Flexible document datastores" }
    ],
    mobile: [
        { icon: "📱", name: "Cross-Platform Mobile", desc: "iOS and Android apps" },
        { icon: "⚡", name: "Offline Sync Engine", desc: "Seamless field synchronization" },
        { icon: "🔒", name: "Biometric Security", desc: "FaceID & fingerprint validation" },
        { icon: "🔔", name: "Push Notifications", desc: "Real-time user engagement" }
    ],
    cloud: [
        { icon: "☁️", name: "AWS Cloud Architecture", desc: "Scalable VPC & S3 pipelines" },
        { icon: "🐳", name: "Docker Containers", desc: "Predictable reproducible environments" },
        { icon: "🤖", name: "AI & LLM Integration", desc: "Conversational chatbots & classification" },
        { icon: "🛡️", name: "Cloudflare & DDoS Shield", desc: "Edge network security" }
    ]
};

function setupTechTabs() {
    const tabsContainer = document.getElementById('techTabsContainer');
    const gridContainer = document.getElementById('techGridContainer');

    if (!tabsContainer || !gridContainer) return;

    function renderTechItems(category) {
        const items = TECH_DATABASE[category] || TECH_DATABASE.all;
        gridContainer.innerHTML = items.map(item => `
            <div class="tech-item">
                <div class="tech-icon">${item.icon}</div>
                <div class="tech-name">${item.name}</div>
                <div class="tech-desc">${item.desc}</div>
            </div>
        `).join('');
    }

    // Initial render
    renderTechItems('all');

    tabsContainer.querySelectorAll('.tech-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tabsContainer.querySelectorAll('.tech-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-tech');
            renderTechItems(category);
        });
    });
}

// 7. Render Meet Our Team Section
function renderTeam() {
    const container = document.getElementById('teamGridContainer');
    if (!container) return;

    const team = NilKishorData.getTeam();
    container.innerHTML = team.map(member => `
        <div class="team-card">
            <div class="team-img-wrap">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <div class="team-social-overlay">
                    <a href="${member.social?.linkedin || '#'}" target="_blank" class="team-social-link">LinkedIn</a>
                    <a href="${member.social?.github || '#'}" target="_blank" class="team-social-link">GitHub</a>
                    <a href="mailto:${member.social?.email || '#'}" class="team-social-link">Email</a>
                </div>
            </div>
            <div class="team-info">
                <h3 class="team-name">${member.name}</h3>
                <div class="team-role">${member.role}</div>
                <p class="team-bio">${member.bio}</p>
                <div class="team-skills-list">
                    ${(member.skills || []).map(s => `<span class="team-skill-chip">${s}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// 8. Animated Stats Counter (Intersection Observer)
function setupStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10) || 10;
                    let count = 0;
                    const speed = 2000 / target;

                    const updateCount = () => {
                        count++;
                        counter.textContent = count + "+";
                        if (count < target) {
                            setTimeout(updateCount, speed);
                        } else {
                            counter.textContent = target + "+";
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('statsSection');
    if (statsSection) observer.observe(statsSection);
}

// 9. Testimonial Slider
function setupTestimonialSlider() {
    const testimonials = [
        {
            quote: "Working with NilKishorIT was transformative for our logistics company. Their software architecture is robust, fast, and remarkably easy to use.",
            author: "Marcus Vance",
            title: "Chief Operating Officer, Global Logistics Ltd.",
            stars: 5
        },
        {
            quote: "The team delivered our AI clinical portal on schedule. Their dedication to code quality and intuitive UX surpassed all our expectations.",
            author: "Dr. Sarah Lin",
            title: "Director of Digital Health, BioMed Systems",
            stars: 5
        },
        {
            quote: "Our online conversions skyrocketed after switching to the headless e-commerce store built by NilKishorIT. Highly recommended!",
            author: "Alex Morgan",
            title: "Founder, Velox Fashion Brand",
            stars: 5
        }
    ];

    let currentTestimonial = 0;
    const quoteEl = document.getElementById('testimonialQuote');
    const authorEl = document.getElementById('testimonialAuthor');
    const titleEl = document.getElementById('testimonialTitle');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');

    if (!quoteEl) return;

    function showTestimonial(idx) {
        const item = testimonials[idx];
        quoteEl.style.opacity = '0';
        setTimeout(() => {
            quoteEl.textContent = `"${item.quote}"`;
            authorEl.textContent = item.author;
            titleEl.textContent = item.title;
            quoteEl.style.opacity = '1';
        }, 200);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }

    // Initialize first
    showTestimonial(0);
}

// 10. FAQ Accordion
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// 11. Contact Form Validation & Local Storage Save
function setupContactForm() {
    const form = document.getElementById('projectInquiryForm');
    const toast = document.getElementById('toastAlert');
    const toastMsg = document.getElementById('toastMessageText');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('clientName').value.trim();
        const email = document.getElementById('clientEmail').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();
        const service = document.getElementById('clientService').value;
        const budget = document.getElementById('clientBudget').value;
        const message = document.getElementById('clientMessage').value.trim();

        if (!name || !email || !message) {
            showToast("Please fill in your name, email, and project message.", true);
            return;
        }

        // Save inquiry into NilKishorData
        NilKishorData.addInquiry({
            name, email, phone, service, budget, message
        });

        // Show Success Toast
        showToast("Thank you! Your project inquiry has been received. Our solutions architect will respond within 24 hours.");
        form.reset();
    });

    function showToast(msg, isError = false) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        toast.style.backgroundColor = isError ? "#DC2626" : "#0F172A";
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4500);
    }
}

// 12. Mobile Navbar Toggle & Dropdown Handling
function setupMobileNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const closeBtn = document.getElementById('mobileDrawerClose');

    if (!hamburger || !navMenu) return;

    function openMenu() {
        navMenu.classList.add('open');
        hamburger.classList.add('active');
        if (backdrop) backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        if (backdrop) backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Dropdown toggles on mobile
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 1050) {
                e.preventDefault();
                const parent = toggle.closest('.nav-dropdown');
                if (parent) {
                    parent.classList.toggle('mobile-open');
                }
            }
        });
    });

    // Close mobile menu when a direct link or dropdown item is clicked
    const links = document.querySelectorAll('.nav-menu a:not(.nav-dropdown-toggle)');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1050) {
                closeMenu();
            }
        });
    });
}

// 13. Sticky Navbar Blur & Shadow on Scroll
function setupStickyNav() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 14. Scroll-To-Top Button
function setupScrollTopBtn() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 15. Notification Top Bar Dismissal
function setupTopBarClose() {
    const topBar = document.getElementById('announcementTopBar');
    const closeBtn = document.getElementById('topBarCloseBtn');
    if (!topBar || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        topBar.style.display = 'none';
    });
}
