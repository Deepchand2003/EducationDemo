/**
 * Excellence Academy - Main JavaScript
 * Ready for Salesforce Marketing Cloud Personalization Integration
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initNavigation();
  initSmoothScroll();
  initHeaderScroll();
  initProgramFilters();
  initTestimonialSlider();
  initCounterAnimation();
  initBackToTop();
  initContactForm();
  initAlumniForm();
  initGalleryLightbox();
  initProgressBars();
//   initSalesforceMCP();
});
/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }
}
/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
        // Track navigation for Salesforce MCP
        trackEvent('navigation', { section: href.replace('#', '') });
      }
    });
  });
}
/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    // Update active nav based on scroll position
    updateActiveNavOnScroll();
    lastScrollY = window.scrollY;
  });
}
/**
 * Update Active Nav Link Based on Scroll Position
 */
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = document.querySelector('.header').offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const currentId = section.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
/**
 * Program Filter Functionality
 */
function initProgramFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // Filter cards
      programCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
      // Track filter interaction for Salesforce MCP
      trackEvent('filter', { category: filter });
    });
  });
}
/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let autoPlayInterval;
  function showSlide(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }
  function nextSlide() {
    showSlide((currentIndex + 1) % cards.length);
  }
  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoPlay();
    });
  });
  // Auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
  if (cards.length > 0) {
    startAutoPlay();
  }
}
/**
 * Counter Animation
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  const options = {
    threshold: 0.5
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, options);
  counters.forEach(counter => observer.observe(counter));
}
function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}
/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
/**
 * Contact Form Handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      // Here you would typically send the data to your server
      console.log('Form submitted:', data);
      // Track form submission for Salesforce MCP
      trackEvent('form_submit', {
        form_type: 'contact',
        program_interest: data.program
      });
      // Show success message (replace with your implementation)
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }
}
