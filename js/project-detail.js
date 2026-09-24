/**
 * NilKishorIT - E-Commerce Style Project Detail View Controller
 * Features:
 * - Reads project ID from URL query parameters (?id=proj-1)
 * - Renders main interactive image gallery with clickable thumbnails
 * - Renders technical specs, challenge, solution, checklist & client review
 */

document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
});

function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id') || 'proj-1';

    const project = NilKishorData.getProjectById(projectId);

    if (!project) {
        document.getElementById('projectNotFound').style.display = 'block';
        document.getElementById('projectDetailContainer').style.display = 'none';
        return;
    }

    // Set Page Title
    document.title = `${project.title} - Case Study | NilKishorIT`;

    // Breadcrumb & Headings
    document.getElementById('detailCategory').textContent = project.category;
    document.getElementById('breadcrumbCategory').textContent = project.category;
    document.getElementById('detailTitle').textContent = project.title;
    document.getElementById('breadcrumbTitle').textContent = project.title;

    // Specs Metadata
    document.getElementById('specClient').textContent = project.client || "Confidential Enterprise";
    document.getElementById('specTimeline').textContent = project.timeline || "3 Months";
    document.getElementById('specRole').textContent = project.role || "Full-Cycle Engineering";
    document.getElementById('specOverview').textContent = project.shortDesc;

    // Live Demo Button Link
    const liveDemoBtn = document.getElementById('liveDemoBtn');
    if (liveDemoBtn) {
        liveDemoBtn.href = project.liveUrl || "#";
    }

    // Tech Stack Chips
    const techListEl = document.getElementById('detailTechChips');
    if (techListEl) {
        techListEl.innerHTML = (project.techStack || []).map(tech => `
            <span class="tech-chip">${tech}</span>
        `).join('');
    }

    // Challenge & Solution Story
    document.getElementById('challengeText').textContent = project.challenge || "Optimizing high-traffic workflow and security.";
    document.getElementById('solutionText').textContent = project.solution || "Architected end-to-end scalable enterprise platform.";

    // Key Features Checklist
    const featuresListEl = document.getElementById('featuresChecklist');
    if (featuresListEl) {
        featuresListEl.innerHTML = (project.keyFeatures || []).map(feat => `
            <div class="check-item">
                <span class="check-icon">✓</span>
                <span>${feat}</span>
            </div>
        `).join('');
    }

    // Client Testimonial / Review Box
    const reviewQuoteEl = document.getElementById('detailReviewQuote');
    const reviewAuthorEl = document.getElementById('detailReviewAuthor');
    if (reviewQuoteEl) {
        reviewQuoteEl.textContent = `"${project.testimonial || 'NilKishorIT provided world-class software engineering and support throughout the project lifecycle.'}"`;
    }
    if (reviewAuthorEl) {
        reviewAuthorEl.textContent = `— ${project.client}`;
    }

    // Image Gallery & Thumbnails Setup
    setupGallery(project.mainImage, project.galleryImages || [project.mainImage]);
}

function setupGallery(mainImgUrl, galleryList) {
    const mainImgEl = document.getElementById('mainProjectImage');
    const thumbContainer = document.getElementById('thumbnailStrip');

    if (!mainImgEl || !thumbContainer) return;

    // Set initial main image
    mainImgEl.src = mainImgUrl;

    // Build thumbnail list
    thumbContainer.innerHTML = galleryList.map((imgUrl, idx) => `
        <div class="thumbnail-box ${idx === 0 ? 'active' : ''}" data-src="${imgUrl}">
            <img src="${imgUrl}" alt="Screenshot Thumbnail ${idx + 1}" loading="lazy">
        </div>
    `).join('');

    // Click handler on thumbnails to switch main image (like an e-commerce product page)
    const thumbBoxes = thumbContainer.querySelectorAll('.thumbnail-box');
    thumbBoxes.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbBoxes.forEach(b => b.classList.remove('active'));
            thumb.classList.add('active');

            const newSrc = thumb.getAttribute('data-src');
            mainImgEl.style.opacity = '0.4';
            setTimeout(() => {
                mainImgEl.src = newSrc;
                mainImgEl.style.opacity = '1';
            }, 150);
        });
    });
}
