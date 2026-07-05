// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

// Manual scroll with arrows (pause marquee, resume after delay)
function scrollSlideshow(venue, direction) {
    stopMarqueeScroll(venue);
    const track = document.getElementById(venue + '-scroll-track');
    
    // Responsive scroll values — one landscape card + gap (matches CSS breakpoints)
    let scrollBy;
    if (window.innerWidth <= 768) {
        scrollBy = 288 + 24; // mobile / tablet card width + gap
    } else {
        scrollBy = 460 + 24; // desktop card width + gap
    }
    
    track.scrollBy({left: direction * scrollBy, behavior: 'smooth'});
    // Resume marquee after 2 seconds
    if (window['marqueeResumeTimeout_' + venue]) {
        clearTimeout(window['marqueeResumeTimeout_' + venue]);
    }
    window['marqueeResumeTimeout_' + venue] = setTimeout(() => {
        startMarqueeScroll(venue);
    }, 2000);
}

// Slideshow data
const slideshows = {
    venue1: [
        {img: 'images/63rdbgu/artists/ar1.jpg',  performance: 'Bhakti Sangeetha', artist: 'Vijay Yesudas'},
        {img: 'images/63rdbgu/artists/ar2.jpg',  performance: 'Handpan Ensemble', artist: 'Bengaluru Handpan Collective'},
        {img: 'images/63rdbgu/artists/ar3.jpg',  performance: 'Svara — Classical & Devotional', artist: 'Shweta Mohan'},
        {img: 'images/63rdbgu/artists/ar4.jpg',  performance: 'Bhakti Sangeetha', artist: 'Shri Harsha'},
        {img: 'images/63rdbgu/artists/ar5.jpg',  performance: 'Bhakti Sangeetha', artist: 'Siddhartha Belmannu, Keerthan Holla & Anirudh Aithal'},
        {img: 'images/63rdbgu/artists/ar6.jpg',  performance: 'Dhara — A Divine Musical Experience', artist: 'Smt. Sivasri Tejasvi Surya'},
        {img: 'images/63rdbgu/artists/ar7.jpg',  performance: 'Live Fusion Edition', artist: 'Karthik'},
        {img: 'images/63rdbgu/artists/ar8.jpg',  performance: 'Ensemble of 33 Flutes', artist: 'Vid. H S Venugopal'},
        {img: 'images/63rdbgu/artists/ar9.jpg',  performance: 'Pratidhee', artist: 'Manju Drums Collectiiv'},
        {img: 'images/63rdbgu/artists/ar10.jpg', performance: 'The Ganesha Folk Collective', artist: 'VP Culture Club'},
        {img: 'images/63rdbgu/artists/ar11.jpg', performance: 'Devotional Fusion', artist: 'Mandolin Maestro U Rajesh'},
        {img: 'images/63rdbgu/artists/ar12.jpg', performance: 'Balaganapati Katha', artist: 'Vinay Varanasi'},
        {img: 'images/63rdbgu/artists/ar13.jpg', performance: 'Sama', artist: 'Aayana Dance Company'},
        {img: 'images/63rdbgu/artists/ar14.jpg', performance: 'Bhakti Sangeetha', artist: 'Vijay Prakash'},
        {img: 'images/63rdbgu/artists/ar15.jpg', performance: 'Amitharanga', artist: 'Amith Nadig'},
        {img: 'images/63rdbgu/artists/ar16.jpg', performance: 'Divine Beats', artist: 'M.C.S & Troupe'},
        {img: 'images/63rdbgu/artists/ar17.jpg', performance: 'Aham Swaraasmi', artist: 'Team Swarapaana'}
    ]
};

// Inject images into scroll tracks with infinite scroll
function renderSlideshowImages(venue) {
    const track = document.getElementById(venue + '-scroll-track');
    track.innerHTML = '';
    
    // Duplicate the images array to create infinite scroll effect
    const duplicatedSlideshows = [...slideshows[venue], ...slideshows[venue]];
    
    duplicatedSlideshows.forEach((data, idx) => {
        const img = document.createElement('img');
        img.src = data.img;
        img.alt = data.performance + ' - ' + data.artist;
        img.className = 'slideshow-scroll-image';
        img.onclick = () => openSlideshowModal(venue, idx % slideshows[venue].length);
        track.appendChild(img);
    });
}

// Auto-scroll logic (marquee effect) with infinite scroll
let scrollAnimationFrames = {venue1: null};
function startMarqueeScroll(venue) {
    stopMarqueeScroll(venue);
    const track = document.getElementById(venue + '-scroll-track');
    
    function step() {
        // If at end, jump back to start seamlessly
        if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1) {
            // Smoothly reset to the beginning
            track.scrollLeft = 0;
        } else {
            track.scrollLeft += 1; // 1px per frame
        }
        scrollAnimationFrames[venue] = requestAnimationFrame(step);
    }
    scrollAnimationFrames[venue] = requestAnimationFrame(step);
}

function stopMarqueeScroll(venue) {
    if (scrollAnimationFrames[venue]) {
        cancelAnimationFrame(scrollAnimationFrames[venue]);
        scrollAnimationFrames[venue] = null;
    }
}

// Update modal logic to use stopMarqueeScroll/startMarqueeScroll
function openSlideshowModal(venue, idx) {
    const data = slideshows[venue][idx];
    const modal = document.getElementById('slideshow-modal');
    const modalImg = document.getElementById('slideshow-modal-img');
    modalImg.src = data.img;
    modal.style.display = 'flex';
    stopMarqueeScroll(venue);
}

function closeSlideshowModal() {
    document.getElementById('slideshow-modal').style.display = 'none';
    // Resume auto-scroll
    startMarqueeScroll('venue1');
}

// Update initialization and venue switching
document.addEventListener('DOMContentLoaded', function() {
    renderSlideshowImages('venue1');

    // Show the single venue slideshow
    document.getElementById('venue1-slideshow').style.display = 'flex';

    startMarqueeScroll('venue1');

    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        // Restart marquee with new scroll speed if needed
        stopMarqueeScroll('venue1');
        startMarqueeScroll('venue1');
    });
});