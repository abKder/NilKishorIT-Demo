/**
 * NilKishorIT - Dynamic Admin Panel Controller
 * Features:
 * - Simple Password Authentication ('admin' / 'admin123')
 * - Tabbed Panel Navigation
 * - Real-Time CRUD for Hero Cards (Add, Edit, Delete)
 * - Real-Time CRUD for Projects (E-Commerce style fields)
 * - Real-Time CRUD for Team Members (Add, Edit, Delete)
 * - Site Info & Hero Text Customization
 * - Inquiries Inbox Viewer
 * - JSON Export / Backup & One-Click Factory Reset
 */

const ADMIN_AUTH_KEY = 'nilkishor_admin_authenticated';
const DEFAULT_ADMIN_PASSWORD = 'admin';

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    setupAdminTabs();
    loadDashboardKPIs();
    renderHeroSlidesTable();
    renderHeroCardsTable();
    renderProjectsTable();
    renderTeamTable();
    loadSiteInfoForm();
    renderInquiriesTable();
    setupModals();
    setupBackupDownload();
});

// 1. Password Verification
function checkAdminAuth() {
    const isAuth = sessionStorage.getItem(ADMIN_AUTH_KEY);
    const loginModal = document.getElementById('loginModal');

    if (!isAuth) {
        if (loginModal) loginModal.classList.add('open');
    }

    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('adminPasswordInput').value;
            if (pass === DEFAULT_ADMIN_PASSWORD || pass === 'admin123') {
                sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
                if (loginModal) loginModal.classList.remove('open');
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        });
    }

    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem(ADMIN_AUTH_KEY);
            window.location.reload();
        });
    }
}

// 2. Tab Navigation
function setupAdminTabs() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    const panes = document.querySelectorAll('.admin-tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            navItems.forEach(n => n.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetPane = document.getElementById(`tab-${targetTab}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

// 3. Load Dashboard KPI Metrics
function loadDashboardKPIs() {
    const heroSlides = NilKishorData.getHeroSlides ? NilKishorData.getHeroSlides() : [];
    const heroCards = NilKishorData.getHeroCards ? NilKishorData.getHeroCards() : [];
    const projects = NilKishorData.getProjects ? NilKishorData.getProjects() : [];
    const services = NilKishorData.getServices ? NilKishorData.getServices() : [];
    const team = NilKishorData.getTeam ? NilKishorData.getTeam() : [];
    const inquiries = NilKishorData.getInquiries ? NilKishorData.getInquiries() : [];

    const slidesCnt = document.getElementById('kpiHeroSlidesCount');
    if (slidesCnt) slidesCnt.textContent = heroSlides.length;

    const slidesCardCnt = document.getElementById('kpiHeroSlidesCountCard');
    if (slidesCardCnt) slidesCardCnt.textContent = heroSlides.length;

    const heroCnt = document.getElementById('kpiHeroCount');
    if (heroCnt) heroCnt.textContent = heroCards.length;

    const heroCardCnt = document.getElementById('kpiHeroCountCard');
    if (heroCardCnt) heroCardCnt.textContent = heroCards.length;

    const projCnt = document.getElementById('kpiProjectsCount');
    if (projCnt) projCnt.textContent = projects.length;

    const projCardCnt = document.getElementById('kpiProjectsCountCard');
    if (projCardCnt) projCardCnt.textContent = projects.length;

    const teamCnt = document.getElementById('kpiTeamCount');
    if (teamCnt) teamCnt.textContent = team.length;

    const teamCardCnt = document.getElementById('kpiTeamCountCard');
    if (teamCardCnt) teamCardCnt.textContent = team.length;

    const inqCnt = document.getElementById('kpiInquiriesCount');
    if (inqCnt) inqCnt.textContent = inquiries.length;

    const inqCardCnt = document.getElementById('kpiInquiriesCountCard');
    if (inqCardCnt) inqCardCnt.textContent = inquiries.length;
}

// 3.5 Hero Banner Slides Management (Auto-changing background & headlines)
function renderHeroSlidesTable() {
    const tbody = document.getElementById('heroSlidesTableBody');
    if (!tbody) return;

    const slides = NilKishorData.getHeroSlides ? NilKishorData.getHeroSlides() : [];
    tbody.innerHTML = slides.map(s => `
        <tr>
            <td>
                <img src="${s.bgImage}" style="width:68px; height:42px; object-fit:cover; border-radius:4px; border:1px solid #E2E8F0;" alt="">
            </td>
            <td><span class="tech-tag">${s.category || 'General'}</span></td>
            <td><strong>${s.title}</strong></td>
            <td><span style="font-size:0.85rem; color:#0F62FE; font-weight:600;">${s.primaryBtnText || 'Start a Project'}</span></td>
            <td><span style="font-size:0.85rem; color:#525252;">${s.secondaryBtnText || 'Explore'}</span></td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon btn-edit" onclick="openEditHeroSlideModal('${s.id}')">Edit</button>
                    <button class="btn-icon btn-delete" onclick="deleteHeroSlideConfirm('${s.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.deleteHeroSlideConfirm = function(id) {
    if (confirm("Are you sure you want to delete this hero slide?")) {
        NilKishorData.deleteHeroSlide(id);
        renderHeroSlidesTable();
        loadDashboardKPIs();
    }
};

window.openEditHeroSlideModal = function(id) {
    const slides = NilKishorData.getHeroSlides ? NilKishorData.getHeroSlides() : [];
    const slide = slides.find(s => s.id === id);
    if (!slide) return;

    document.getElementById('heroSlideId').value = slide.id;
    document.getElementById('heroSlideCategory').value = slide.category || '';
    document.getElementById('heroSlideBgImage').value = slide.bgImage || '';
    document.getElementById('heroSlideTitle').value = slide.title || '';
    document.getElementById('heroSlideSubtitle').value = slide.subtitle || '';
    document.getElementById('heroSlidePrimaryBtnText').value = slide.primaryBtnText || '';
    document.getElementById('heroSlidePrimaryBtnUrl').value = slide.primaryBtnUrl || '';
    document.getElementById('heroSlideSecondaryBtnText').value = slide.secondaryBtnText || '';
    document.getElementById('heroSlideSecondaryBtnUrl').value = slide.secondaryBtnUrl || '';

    document.getElementById('heroSlideModalTitle').textContent = "Edit Hero Banner Slide";
    document.getElementById('heroSlideModal').classList.add('open');
};

// 4. Hero Cards Management
function renderHeroCardsTable() {
    const tbody = document.getElementById('heroCardsTableBody');
    if (!tbody) return;

    const cards = NilKishorData.getHeroCards();
    tbody.innerHTML = cards.map(c => `
        <tr>
            <td><strong>${c.title}</strong></td>
            <td><span class="hero-card-badge">${c.badge}</span></td>
            <td>${c.stats || 'N/A'}</td>
            <td>${(c.techStack || []).join(', ')}</td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon btn-edit" onclick="openEditHeroCardModal('${c.id}')">Edit</button>
                    <button class="btn-icon btn-delete" onclick="deleteHeroCardConfirm('${c.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.deleteHeroCardConfirm = function(id) {
    if (confirm("Are you sure you want to delete this hero card?")) {
        NilKishorData.deleteHeroCard(id);
        renderHeroCardsTable();
        loadDashboardKPIs();
    }
};

window.openEditHeroCardModal = function(id) {
    const cards = NilKishorData.getHeroCards();
    const card = cards.find(c => c.id === id);
    if (!card) return;

    document.getElementById('heroCardId').value = card.id;
    document.getElementById('heroCardTitle').value = card.title;
    document.getElementById('heroCardBadge').value = card.badge;
    document.getElementById('heroCardDesc').value = card.description;
    document.getElementById('heroCardStats').value = card.stats;
    document.getElementById('heroCardTags').value = (card.techStack || []).join(', ');
    document.getElementById('heroCardIcon').value = card.icon || 'server';
    document.getElementById('heroCardLinkUrl').value = card.linkUrl || '';

    document.getElementById('heroCardModalTitle').textContent = "Edit Hero Card";
    document.getElementById('heroCardModal').classList.add('open');
};

// 5. Projects Management (E-Commerce Style Case Studies)
function renderProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;

    const projects = NilKishorData.getProjects();
    tbody.innerHTML = projects.map(p => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${p.mainImage}" style="width:48px; height:34px; object-fit:cover; border-radius:6px; border:1px solid #E2E8F0;" alt="">
                    <strong>${p.title}</strong>
                </div>
            </td>
            <td><span class="tech-tag">${p.category}</span></td>
            <td>${p.client}</td>
            <td>${p.timeline}</td>
            <td>
                <div class="action-btn-group">
                    <a href="project-detail.html?id=${p.id}" target="_blank" class="btn-icon btn-edit" style="text-decoration:none;">View</a>
                    <button class="btn-icon btn-edit" onclick="openEditProjectModal('${p.id}')">Edit</button>
                    <button class="btn-icon btn-delete" onclick="deleteProjectConfirm('${p.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.deleteProjectConfirm = function(id) {
    if (confirm("Are you sure you want to delete this project?")) {
        NilKishorData.deleteProject(id);
        renderProjectsTable();
        loadDashboardKPIs();
    }
};

window.openEditProjectModal = function(id) {
    const p = NilKishorData.getProjectById(id);
    if (!p) return;

    document.getElementById('projectId').value = p.id;
    document.getElementById('projTitle').value = p.title;
    document.getElementById('projCategory').value = p.category;
    document.getElementById('projClient').value = p.client;
    document.getElementById('projTimeline').value = p.timeline;
    document.getElementById('projRole').value = p.role;
    document.getElementById('projMainImage').value = p.mainImage;
    document.getElementById('projGalleryImages').value = (p.galleryImages || []).join('\n');
    document.getElementById('projShortDesc').value = p.shortDesc;
    document.getElementById('projChallenge').value = p.challenge;
    document.getElementById('projSolution').value = p.solution;
    document.getElementById('projFeatures').value = (p.keyFeatures || []).join('\n');
    document.getElementById('projTechStack').value = (p.techStack || []).join(', ');
    document.getElementById('projTestimonial').value = p.testimonial || '';

    document.getElementById('projectModalTitle').textContent = "Edit Project / Case Study";
    document.getElementById('projectModal').classList.add('open');
};

// 6. Team Members Management
function renderTeamTable() {
    const tbody = document.getElementById('teamTableBody');
    if (!tbody) return;

    const team = NilKishorData.getTeam();
    tbody.innerHTML = team.map(m => `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${m.image}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;" alt="">
                    <strong>${m.name}</strong>
                </div>
            </td>
            <td><span class="tech-tag">${m.role}</span></td>
            <td><small style="color:var(--text-muted);">${m.bio}</small></td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon btn-delete" onclick="deleteTeamConfirm('${m.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.deleteTeamConfirm = function(id) {
    if (confirm("Delete this team member?")) {
        NilKishorData.deleteTeamMember(id);
        renderTeamTable();
        loadDashboardKPIs();
    }
};

// 7. Site Info & Hero Text Customization Form
function loadSiteInfoForm() {
    const info = NilKishorData.getSiteInfo();
    const form = document.getElementById('siteInfoForm');
    if (!form) return;

    document.getElementById('infoBrandName').value = info.brandName;
    document.getElementById('infoBrandTagline').value = info.brandTagline;
    document.getElementById('infoHeroBadge').value = info.heroBadge;
    document.getElementById('infoHeroSubtitle').value = info.heroSubtitle;
    document.getElementById('infoPhone').value = info.contactPhone;
    document.getElementById('infoEmail').value = info.contactEmail;
    document.getElementById('infoExpYears').value = info.experienceYears;
    document.getElementById('infoCompletedProj').value = info.completedProjects;
    document.getElementById('infoTeamExperts').value = info.teamExperts;
    document.getElementById('infoHappyClients').value = info.happyClients;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
            ...info,
            brandName: document.getElementById('infoBrandName').value,
            brandTagline: document.getElementById('infoBrandTagline').value,
            heroBadge: document.getElementById('infoHeroBadge').value,
            heroSubtitle: document.getElementById('infoHeroSubtitle').value,
            contactPhone: document.getElementById('infoPhone').value,
            contactEmail: document.getElementById('infoEmail').value,
            experienceYears: document.getElementById('infoExpYears').value,
            completedProjects: document.getElementById('infoCompletedProj').value,
            teamExperts: document.getElementById('infoTeamExperts').value,
            happyClients: document.getElementById('infoHappyClients').value
        };
        NilKishorData.saveSiteInfo(updated);
        alert("Site information updated successfully! Changes are live on the homepage.");
    });
}

// 8. Inquiries Inbox
function renderInquiriesTable() {
    const tbody = document.getElementById('inquiriesTableBody');
    if (!tbody) return;

    const inquiries = NilKishorData.getInquiries();
    if (inquiries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94A3B8; padding:30px;">No messages received yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = inquiries.map(i => `
        <tr>
            <td><strong>${i.name}</strong><br><small style="color:#64748B;">${i.date}</small></td>
            <td><a href="mailto:${i.email}" style="color:var(--primary); font-weight:600;">${i.email}</a><br><small>${i.phone || 'No phone'}</small></td>
            <td><span class="tech-tag">${i.service}</span><br><small>Budget: ${i.budget}</small></td>
            <td style="max-width:300px;"><p style="font-size:0.88rem; line-height:1.4;">${i.message}</p></td>
            <td>
                <button class="btn-icon btn-delete" onclick="deleteInquiryConfirm('${i.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

window.deleteInquiryConfirm = function(id) {
    if (confirm("Delete this client message?")) {
        NilKishorData.deleteInquiry(id);
        renderInquiriesTable();
        loadDashboardKPIs();
    }
};

// 9. Modals & Forms Submission
function setupModals() {
    // Open New Hero Slide Modal
    const btnNewSlide = document.getElementById('btnNewHeroSlide');
    const heroSlideModal = document.getElementById('heroSlideModal');
    if (btnNewSlide && heroSlideModal) {
        btnNewSlide.addEventListener('click', () => {
            document.getElementById('heroSlideForm').reset();
            document.getElementById('heroSlideId').value = '';
            document.getElementById('heroSlideModalTitle').textContent = "Add New Hero Banner Slide";
            heroSlideModal.classList.add('open');
        });
    }

    // Save Hero Slide Form
    const heroSlideForm = document.getElementById('heroSlideForm');
    if (heroSlideForm) {
        heroSlideForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('heroSlideId').value;
            const newSlide = {
                id: id || undefined,
                category: document.getElementById('heroSlideCategory').value.trim(),
                bgImage: document.getElementById('heroSlideBgImage').value.trim(),
                title: document.getElementById('heroSlideTitle').value.trim(),
                subtitle: document.getElementById('heroSlideSubtitle').value.trim(),
                primaryBtnText: document.getElementById('heroSlidePrimaryBtnText').value.trim() || 'Start a Project',
                primaryBtnUrl: document.getElementById('heroSlidePrimaryBtnUrl').value.trim() || '#contact',
                secondaryBtnText: document.getElementById('heroSlideSecondaryBtnText').value.trim() || 'Explore the work',
                secondaryBtnUrl: document.getElementById('heroSlideSecondaryBtnUrl').value.trim() || '#projects'
            };

            if (id) {
                NilKishorData.updateHeroSlide(newSlide);
            } else {
                NilKishorData.addHeroSlide(newSlide);
            }

            heroSlideModal.classList.remove('open');
            renderHeroSlidesTable();
            loadDashboardKPIs();
        });
    }

    // Open New Hero Card Modal
    const btnNewHero = document.getElementById('btnNewHeroCard');
    const heroCardModal = document.getElementById('heroCardModal');
    if (btnNewHero && heroCardModal) {
        btnNewHero.addEventListener('click', () => {
            document.getElementById('heroCardForm').reset();
            document.getElementById('heroCardId').value = '';
            document.getElementById('heroCardModalTitle').textContent = "Add New Hero Service Card";
            heroCardModal.classList.add('open');
        });
    }

    // Save Hero Card Form
    const heroCardForm = document.getElementById('heroCardForm');
    if (heroCardForm) {
        heroCardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('heroCardId').value;
            const existing = id ? (NilKishorData.getHeroCards().find(c => c.id === id) || {}) : {};
            const newCard = {
                id: id || undefined,
                title: document.getElementById('heroCardTitle').value,
                badge: document.getElementById('heroCardBadge').value,
                description: document.getElementById('heroCardDesc').value,
                image: existing.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
                stats: document.getElementById('heroCardStats').value,
                techStack: document.getElementById('heroCardTags').value.split(',').map(s => s.trim()).filter(Boolean),
                icon: document.getElementById('heroCardIcon').value,
                linkUrl: document.getElementById('heroCardLinkUrl').value || 'project-detail.html?id=proj-1',
                linkText: "Learn more"
            };

            if (id) {
                NilKishorData.updateHeroCard(newCard);
            } else {
                NilKishorData.addHeroCard(newCard);
            }

            heroCardModal.classList.remove('open');
            renderHeroCardsTable();
            loadDashboardKPIs();
        });
    }

    // Open New Project Modal
    const btnNewProj = document.getElementById('btnNewProject');
    const projectModal = document.getElementById('projectModal');
    if (btnNewProj && projectModal) {
        btnNewProj.addEventListener('click', () => {
            document.getElementById('projectForm').reset();
            document.getElementById('projectId').value = '';
            document.getElementById('projectModalTitle').textContent = "Add New Case Study Project";
            projectModal.classList.add('open');
        });
    }

    // Save Project Form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('projectId').value;
            const galleryText = document.getElementById('projGalleryImages').value.trim();
            const galleryList = galleryText ? galleryText.split('\n').map(s => s.trim()).filter(Boolean) : [];

            const newProj = {
                id: id || undefined,
                title: document.getElementById('projTitle').value,
                category: document.getElementById('projCategory').value,
                tag: document.getElementById('projCategory').value,
                client: document.getElementById('projClient').value,
                timeline: document.getElementById('projTimeline').value,
                role: document.getElementById('projRole').value,
                mainImage: document.getElementById('projMainImage').value,
                galleryImages: galleryList.length ? galleryList : [document.getElementById('projMainImage').value],
                shortDesc: document.getElementById('projShortDesc').value,
                challenge: document.getElementById('projChallenge').value,
                solution: document.getElementById('projSolution').value,
                keyFeatures: document.getElementById('projFeatures').value.split('\n').map(s => s.trim()).filter(Boolean),
                techStack: document.getElementById('projTechStack').value.split(',').map(s => s.trim()).filter(Boolean),
                testimonial: document.getElementById('projTestimonial').value,
                liveUrl: "https://example.com/demo"
            };

            if (id) {
                NilKishorData.updateProject(newProj);
            } else {
                NilKishorData.addProject(newProj);
            }

            projectModal.classList.remove('open');
            renderProjectsTable();
            loadDashboardKPIs();
        });
    }

    // Open New Team Member Modal
    const btnNewTeam = document.getElementById('btnNewTeamMember');
    const teamModal = document.getElementById('teamModal');
    if (btnNewTeam && teamModal) {
        btnNewTeam.addEventListener('click', () => {
            document.getElementById('teamMemberForm').reset();
            document.getElementById('teamMemberId').value = '';
            document.getElementById('teamModalTitle').textContent = "Add Team Member";
            teamModal.classList.add('open');
        });
    }

    // Save Team Member Form
    const teamMemberForm = document.getElementById('teamMemberForm');
    if (teamMemberForm && teamModal) {
        teamMemberForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newMember = {
                name: document.getElementById('teamName').value,
                role: document.getElementById('teamRole').value,
                image: document.getElementById('teamImage').value,
                bio: document.getElementById('teamBio').value,
                skills: document.getElementById('teamSkills').value.split(',').map(s => s.trim()).filter(Boolean),
                social: {
                    linkedin: document.getElementById('teamLinkedin').value || '#',
                    github: '#',
                    email: document.getElementById('teamEmail').value || '#'
                }
            };
            NilKishorData.addTeamMember(newMember);
            teamModal.classList.remove('open');
            renderTeamTable();
            loadDashboardKPIs();
        });
    }

    // Close buttons on all modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-modal-overlay').forEach(m => {
                if (m.id !== 'loginModal' || sessionStorage.getItem(ADMIN_AUTH_KEY)) {
                    m.classList.remove('open');
                }
            });
        });
    });

    // Reset All Data button
    const resetBtn = document.getElementById('adminResetAllBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("WARNING: This will reset all projects, hero cards, and customizations back to factory defaults. Continue?")) {
                NilKishorData.resetToDefaults();
                window.location.reload();
            }
        });
    }
}

// 10. Backup Download JSON
function setupBackupDownload() {
    const exportBtn = document.getElementById('adminExportJsonBtn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', () => {
        const jsonStr = NilKishorData.exportDataJson();
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nilkishor-it-backup-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}
