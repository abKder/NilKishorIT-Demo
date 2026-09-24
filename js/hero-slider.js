/**
 * NilKishorIT - Hero Banner Slider & Service Cards Engine
 * Features:
 * - Smooth auto-transitioning slides & background images every 5.5s
 * - Ken Burns subtle zoom effect & typography fade-in
 * - Prev / Next navigation buttons with hover reveal
 * - Interactive pagination dots
 * - Pause on hover & mobile touch swipe support
 * - Dynamic rendering from NilKishorData.getHeroSlides() & NilKishorData.getHeroCards()
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroBannerSlider();
    initHeroServiceCards();
});

let currentSlideIdx = 0;
let bannerInterval = null;
const SLIDE_DURATION = 5500; // 5.5 seconds per slide

function initHeroBannerSlider() {
    const slidesContainer = document.getElementById('heroBannerSlides');
    const indicatorsContainer = document.getElementById('heroBannerIndicators');
    const prevBtn = document.getElementById('heroBannerPrev');
    const nextBtn = document.getElementById('heroBannerNext');
    const topBanner = document.getElementById('heroTopBanner');

    if (!slidesContainer) return;

    const slides = NilKishorData.getHeroSlides ? NilKishorData.getHeroSlides() : [];
    if (!slides || slides.length === 0) return;

    // Render slides
    slidesContainer.innerHTML = slides.map((s, idx) => `
        <div class="ibm-banner-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}" style="background-image: linear-gradient(to right, rgba(10, 16, 28, 0.96) 0%, rgba(10, 16, 28, 0.92) 42%, rgba(10, 16, 28, 0.55) 75%, rgba(10, 16, 28, 0.38) 100%), url('${s.bgImage}');">
            <div class="ibm-banner-container">
                <div class="ibm-breadcrumb">
                    <a href="index.html" class="bc-link">Home</a>
                    <span class="bc-sep">/</span>
                    <span class="bc-current">${s.category || 'Consulting'}</span>
                </div>
                <h1 class="ibm-hero-title">${s.title}</h1>
                <p class="ibm-hero-sub">${s.subtitle}</p>
                <div class="ibm-cta-row">
                    <a href="${s.primaryBtnUrl || '#contact'}" class="ibm-btn-primary">
                        <span>${s.primaryBtnText || 'Start a Project'}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </a>
                    <a href="${s.secondaryBtnUrl || '#projects'}" class="ibm-btn-outline">
                        <span>${s.secondaryBtnText || 'Explore the work'}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Render indicators
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = slides.map((_, idx) => `
            <button class="ibm-indicator-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}">
                <span class="indicator-bar"></span>
            </button>
        `).join('');

        indicatorsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.ibm-indicator-btn');
            if (btn) {
                const targetIdx = parseInt(btn.getAttribute('data-index'), 10);
                goToSlide(targetIdx);
                restartTimer();
            }
        });
    }

    const slideElements = slidesContainer.querySelectorAll('.ibm-banner-slide');
    const indicatorButtons = indicatorsContainer ? indicatorsContainer.querySelectorAll('.ibm-indicator-btn') : [];

    function goToSlide(idx) {
        if (!slideElements.length) return;

        // Clean current
        slideElements[currentSlideIdx]?.classList.remove('active');
        indicatorButtons[currentSlideIdx]?.classList.remove('active');

        // Wrap around
        if (idx < 0) {
            currentSlideIdx = slideElements.length - 1;
        } else if (idx >= slideElements.length) {
            currentSlideIdx = 0;
        } else {
            currentSlideIdx = idx;
        }

        // Activate new
        slideElements[currentSlideIdx]?.classList.add('active');
        indicatorButtons[currentSlideIdx]?.classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlideIdx + 1);
    }

    function prevSlide() {
        goToSlide(currentSlideIdx - 1);
    }

    function startTimer() {
        stopTimer();
        bannerInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    function stopTimer() {
        if (bannerInterval) {
            clearInterval(bannerInterval);
            bannerInterval = null;
        }
    }

    function restartTimer() {
        stopTimer();
        startTimer();
    }

    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            restartTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            restartTimer();
        });
    }

    // Pause on hover
    if (topBanner) {
        topBanner.addEventListener('mouseenter', stopTimer);
        topBanner.addEventListener('mouseleave', startTimer);

        // Mobile touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        topBanner.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopTimer();
        }, { passive: true });

        topBanner.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) nextSlide();
                else prevSlide();
            }
            startTimer();
        }, { passive: true });
    }

    // Start auto-sliding
    startTimer();
}

/**
 * 2. Bottom 4 Service Cards Renderer
 */
function initHeroServiceCards() {
    const track = document.getElementById('heroCardsTrack');
    if (!track) return;

    let cards = NilKishorData.getHeroCards ? NilKishorData.getHeroCards() : [];
    if (!cards || cards.length === 0) return;

    const DEFAULT_CARD_IMAGES = [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    ];

    const visible = cards.slice(0, 4);

    track.innerHTML = visible.map((card, idx) => {
        const imgUrl = card.image || DEFAULT_CARD_IMAGES[idx % DEFAULT_CARD_IMAGES.length];
        return `
        <a href="${card.linkUrl || '#projects'}" class="ibm-service-card">
            <div class="ibm-service-card-thumb">
                <img src="${imgUrl}" alt="${card.title}" loading="lazy">
            </div>
            <div class="ibm-service-card-content">
                <div class="ibm-service-card-title">${card.title}</div>
                <div class="ibm-service-card-desc">${card.description}</div>
                <span class="ibm-service-card-arrow" aria-hidden="true">&rarr;</span>
            </div>
        </a>`;
    }).join('');
}
