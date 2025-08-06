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

// Venue button functionality
function showVenue(venueId) {
    // Remove active class from all venue buttons
    const venueButtons = document.querySelectorAll('.venue-btn');
    venueButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
    // Hide all slideshows
    document.getElementById('venue1-slideshow').style.display = 'none';
    document.getElementById('venue2-slideshow').style.display = 'none';
    // Show the selected venue slideshow
    if (venueId === 'venue1') {
        document.getElementById('venue1-slideshow').style.display = 'flex';
        startMarqueeScroll('venue1');
        stopMarqueeScroll('venue2');
    } else if (venueId === 'venue2') {
        document.getElementById('venue2-slideshow').style.display = 'flex';
        startMarqueeScroll('venue2');
        stopMarqueeScroll('venue1');
    }
}

// Manual scroll with arrows (pause marquee, resume after delay)
function scrollSlideshow(venue, direction) {
    stopMarqueeScroll(venue);
    const track = document.getElementById(venue + '-scroll-track');
    
    // Responsive scroll values based on screen width and image size
    let scrollBy;
    if (window.innerWidth <= 480) {
        scrollBy = 250 + 12; // mobile small
    } else if (window.innerWidth <= 700) {
        scrollBy = 300 + 12; // mobile medium
    } else if (window.innerWidth <= 900) {
        scrollBy = 350 + 24; // tablet
    } else {
        scrollBy = 400 + 24; // desktop
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
        {img: 'images/63rdbgu/artists/mdpallavi.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. M.D. Pallavi'},
        {img: 'images/63rdbgu/artists/indulakshmi.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Lakshmi Nagaraj & Smt. Indu Nagaraj'},
        {img: 'images/63rdbgu/artists/sooryagayathri.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Soorya Gayathri'},
        {img: 'images/63rdbgu/artists/sunitha.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Sunitha'},
        {img: 'images/63rdbgu/artists/venkatesh Kumar.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Venkatesh Kumar'},
        {img: 'images/63rdbgu/artists/praveen godkindi.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Praveen Godkindi'},
        {img: 'images/63rdbgu/artists/63flutes.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. 63 Flutes'},
        {img: 'images/63rdbgu/artists/vinayvaranasi.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Vinay Varanasi'},
        {img: 'images/63rdbgu/artists/jagadeesh.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Jagadeesh'},
        {img: 'images/63rdbgu/artists/savithakka.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Savitha Kaka'},
        {img: 'images/63rdbgu/artists/balasubramanya.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Balasubramanya'},
        {img: 'images/63rdbgu/artists/gangasasidharan.jpg', performance: 'Bhakti Sangeetha', artist: 'Smt. Gangasasidharan'}
    ],
    venue2: [
        {img:'images/63rdbgu/artists/praveendrao.jpg'},
        {img: 'images/63rdbgu/artists/ravichandran.jpg', performance: 'Crazy Star Ravichandran', artist: 'Ravichandran & Mayur'},
        {img: 'images/63rdbgu/artists/vijayprakash.jpg', performance: 'Drums Performance', artist: 'Smt. Vijay Prakash'},
        {img: 'images/63rdbgu/artists/vijayyesudas.jpg'},
        {img: 'images/63rdbgu/artists/rajeshkrishnan.jpg', performance: 'Drums Performance', artist: 'Smt. Rajesh Krishnan'},
        {img: 'images/63rdbgu/artists/rdx.jpg', performance: 'Drums Performance', artist: 'Smt. RDX'}
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
let scrollAnimationFrames = {venue1: null, venue2: null};
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
    // Resume auto-scroll for the currently visible venue
    if (document.getElementById('venue1-slideshow').style.display === 'flex') {
        startMarqueeScroll('venue1');
    } else if (document.getElementById('venue2-slideshow').style.display === 'flex') {
        startMarqueeScroll('venue2');
    }
}

// Update initialization and venue switching
document.addEventListener('DOMContentLoaded', function() {
    renderSlideshowImages('venue1');
    renderSlideshowImages('venue2');
    
    // Set default venue
    document.getElementById('venue1-slideshow').style.display = 'none';
    document.getElementById('venue2-slideshow').style.display = 'flex';
    
    // Set default active button
    const venue2Button = document.querySelector('[data-venue="venue2"]');
    if (venue2Button) {
        venue2Button.classList.add('active');
    }
    
    startMarqueeScroll('venue2');
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        // Restart marquee with new scroll speed if needed
        const activeVenue = document.getElementById('venue1-slideshow').style.display === 'flex' ? 'venue1' : 'venue2';
        if (activeVenue) {
            stopMarqueeScroll(activeVenue);
            startMarqueeScroll(activeVenue);
        }
    });
});

document.querySelectorAll('.venue-btn').forEach(btn => {
    btn.addEventListener('click', function(event) {
        const venueId = btn.getAttribute('data-venue');
        showVenue(venueId);
    });
}); 