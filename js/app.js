import { resumeData } from './resume-data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Application Engine
  initThemeEngine();
  initNavigation();
  renderProfileInfo();
  initTypewriter();
  renderExperience();
  renderSkills();
  renderProjects();
  initContactForm();
  initScrollReveal();
});

/* ==========================================================================
   Theme Engine (Dark/Light Switcher)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Retrieve saved preference or check system
  const savedTheme = localStorage.getItem('theme');
  const defaultTheme = resumeData.themeConfig?.defaultTheme || 'dark';
  
  const activeTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : defaultTheme);
  
  // Apply initial theme
  if (activeTheme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  updateThemeIcon(activeTheme);

  // Toggle Action
  themeToggleBtn.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    const currentTheme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Add micro-animation bounce to button
    themeToggleBtn.style.transform = 'scale(0.85)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 150);
  });

  // Listen to system changes if no override exists
  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.remove('light-mode');
        updateThemeIcon('dark');
      } else {
        document.body.classList.add('light-mode');
        updateThemeIcon('light');
      }
    }
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  
  // Render appropriate inline SVG depending on theme (Sun for light, Moon for dark)
  if (theme === 'light') {
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   Navigation Logic (Sticky + Hamburger Drawer)
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header-nav');
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerLinks = drawer.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  // Shrink header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
    
    // Highlight Active Link on Scroll
    let currentActive = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActive = section.getAttribute('id');
      }
    });

    const updateActiveState = (linkArray) => {
      linkArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActive}`) {
          link.classList.add('active');
        }
      });
    };

    updateActiveState(navLinks);
    updateActiveState(drawerLinks);
  });

  // Mobile Drawer Toggle Control
  const toggleDrawer = () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
    drawerOverlay.classList.toggle('visible');
    
    // Prevent background scrolling when open
    if (drawer.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', toggleDrawer);
  drawerOverlay.addEventListener('click', toggleDrawer);

  // Close drawer on click links
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleDrawer();
      }
    });
  });
}

/* ==========================================================================
   Render Personal Profile Information
   ========================================================================== */
function renderProfileInfo() {
  const info = resumeData.personalInfo;
  if (!info) return;

  // Render text content
  document.getElementById('profile-name').textContent = info.name;
  document.getElementById('hero-title-name').textContent = info.name;
  document.getElementById('hero-subtitle').textContent = info.subtitle;
  document.getElementById('about-text').textContent = info.aboutMe;
  
  // Footer Copyright Text
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  document.getElementById('footer-name').textContent = info.name;

  // Profile Avatar Layout setup
  const avatarContainer = document.getElementById('hero-avatar-container');
  if (avatarContainer && info.avatar) {
    avatarContainer.innerHTML = `
      <img src="${info.avatar}" alt="${info.name}" class="avatar-img" onerror="this.src='https://picsum.photos/300/300'; console.warn('Custom avatar image not found, using premium placeholder.');">
    `;
  }

  // Contact detail fields rendering
  const contactChannels = document.getElementById('contact-channels-container');
  if (contactChannels) {
    const phonesHtml = info.phones.map(p => `
      <div>
        <a href="tel:${p.number.replace(/\s+/g, '')}">${p.number}</a>
        <span style="font-size:0.8rem; color:var(--text-tertiary); margin-left:6px;">(${p.label})</span>
      </div>
    `).join('');

    contactChannels.innerHTML = `
      <!-- Email Channel -->
      <div class="contact-channel-item reveal-on-scroll">
        <div class="channel-icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div class="channel-details">
          <h4>Email Address</h4>
          <p><a href="mailto:${info.email}">${info.email}</a></p>
        </div>
      </div>

      <!-- Phone Channel -->
      <div class="contact-channel-item reveal-on-scroll">
        <div class="channel-icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <div class="channel-details">
          <h4>Phone Contacts</h4>
          <div style="display:flex; flex-direction:column; gap:4px;">${phonesHtml}</div>
        </div>
      </div>

      <!-- Location Channel -->
      <div class="contact-channel-item reveal-on-scroll">
        <div class="channel-icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="channel-details">
          <h4>Office Address</h4>
          <p style="line-height:1.4">${info.address}</p>
        </div>
      </div>
    `;
  }

  // Setup Social Buttons
  const socialFooter = document.getElementById('footer-socials');
  if (socialFooter) {
    socialFooter.innerHTML = `
      <a href="${info.github}" target="_blank" class="footer-social-btn" aria-label="GitHub Profile">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
      <a href="${info.linkedin}" target="_blank" class="footer-social-btn" aria-label="LinkedIn Profile">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>
    `;
  }
}

/* ==========================================================================
   Typewriter Engine
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  const words = resumeData.typewriterWords || [];
  if (!target || words.length === 0) return;

  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let delay = 100; // Normal typing delay

  const type = () => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      // Remove characters
      target.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      delay = 50; // Faster deletion
    } else {
      // Add characters
      target.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      delay = 100; // Standard speed
    }

    // Checking word boundary completions
    if (!isDeleting && currentCharIndex === currentWord.length) {
      delay = 2000; // Hold full word before deletion
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length; // Rotate index
      delay = 500; // Brief pause before starting next word
    }

    setTimeout(type, delay);
  };

  // Kickstart animation loop
  setTimeout(type, 1000);
}

/* ==========================================================================
   Render Experience (Timeline)
   ========================================================================== */
function renderExperience() {
  const timeline = document.getElementById('experience-timeline');
  const items = resumeData.experience || [];
  if (!timeline || items.length === 0) return;

  timeline.innerHTML = items.map((item, index) => {
    const accomplishmentsHtml = item.accomplishments.map(a => `
      <li>${a}</li>
    `).join('');

    return `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-node"></div>
        <div class="timeline-card card-base">
          <div class="timeline-header">
            <div class="timeline-title">
              <h3>${item.role}</h3>
              <div class="timeline-company">${item.company}</div>
            </div>
            <div class="timeline-meta">
              <div class="timeline-period">${item.period}</div>
              <div class="timeline-location">${item.location}</div>
            </div>
          </div>
          <p class="timeline-desc">${item.description}</p>
          <ul class="timeline-bullets">
            ${accomplishmentsHtml}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Render Skills with Dynamic Scroll Fill
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-container');
  const skillCategories = resumeData.skills || [];
  if (!container || skillCategories.length === 0) return;

  container.innerHTML = skillCategories.map(cat => {
    const skillsListHtml = cat.items.map(skill => `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" data-percentage="${skill.level}"></div>
        </div>
      </div>
    `).join('');

    return `
      <div class="card-base reveal-on-scroll" style="padding: 32px 40px;">
        <h3 class="skill-category-title">${cat.category}</h3>
        <div class="skills-list">
          ${skillsListHtml}
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Render Projects Showcase, Filters, and Modals
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const filterBar = document.getElementById('projects-filter-bar');
  const projects = resumeData.projects || [];
  if (!grid || projects.length === 0) return;

  // Extract unique categories for Filter Tabs
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Render Filter Tabs
  if (filterBar) {
    filterBar.innerHTML = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cat}">
        ${cat}
      </button>
    `).join('');
    
    // Attach Filter Clicks
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        filterProjects(filterVal);
      });
    });
  }

  // Render Project Cards
  renderProjectCards(projects);
  initModalTriggers();
}

function renderProjectCards(items) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = items.map(p => {
    const tagsHtml = p.techTags.slice(0, 3).map(tag => `
      <span class="tag-badge">${tag}</span>
    `).join('');

    return `
      <div class="card-base project-card reveal-on-scroll" data-category="${p.category}" data-project-id="${p.id}">
        <div class="project-card-header"></div>
        <div class="project-category">${p.category}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-short-desc">${p.shortDesc}</p>
        <div class="project-tags">
          ${tagsHtml}
          ${p.techTags.length > 3 ? `<span class="tag-badge" style="background:transparent; border:1px dashed var(--accent-color);">+${p.techTags.length - 3}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95) translateY(10px)';
    
    setTimeout(() => {
      if (category === 'All' || cardCat === category) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1) translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    }, 200);
  });
}

/* Modal detail logic */
function initModalTriggers() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalBodyContent = document.getElementById('modal-body-content');

  // Open modal click handler
  document.getElementById('projects-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    const projectId = card.getAttribute('data-project-id');
    const project = resumeData.projects.find(p => p.id === projectId);
    if (!project) return;

    // Fill Modal Information
    const tagsHtml = project.techTags.map(tag => `<span class="tag-badge">${tag}</span>`).join('');
    const highlightsHtml = project.highlights.map(h => `<li class="modal-highlight-item">${h}</li>`).join('');

    modalBodyContent.innerHTML = `
      <div class="modal-category">${project.category}</div>
      <h2 class="modal-title">${project.title}</h2>
      <div class="modal-tags">${tagsHtml}</div>
      <p class="modal-long-desc">${project.detailsText}</p>
      
      <div class="modal-highlights-title">Key Implementation Highlights:</div>
      <ul class="modal-highlights-list">
        ${highlightsHtml}
      </ul>
    `;

    // Open transitions
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock scrolling
    closeBtn.focus(); // Focus trap
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scroll
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Esc Key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Scroll Reveal Observer (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  // Intersection Observer for card fades
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger skill bar animation inside cards if found
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        if (skillBars.length > 0) {
          skillBars.forEach(bar => {
            const fillPercentage = bar.getAttribute('data-percentage');
            bar.style.width = `${fillPercentage}%`;
          });
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

  // Bind to cards and sections
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   Dual-Mode Contact Form & Web3Forms Integration
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('contact-alert');
  if (!form || !alertBox) return;

  const accessKey = resumeData.web3forms?.accessKey || 'YOUR_ACCESS_KEY_HERE';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      showAlert('warning', 'Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    // Toggle Loading visual
    submitBtn.disabled = true;
    const origBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="loading-spinner" viewBox="0 0 50 50" style="animation: spin 1s linear infinite; width:18px; height:18px; margin-right:8px; display:inline-block; vertical-align:middle;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80 200" stroke-linecap="round"></circle>
      </svg> Processing...
    `;

    // MODE DETECTION
    if (accessKey === 'YOUR_ACCESS_KEY_HERE' || accessKey.trim() === '') {
      // 1. DEMO/SIMULATION SANDBOX STATE
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;
        form.reset();

        showAlert('info', `
          <strong>🎉 Simulated Demo Mode Sandbox!</strong><br>
          Your contact form was intercepted and ran a successful mockup transaction. Since the email API is currently in demo mode, your message was <strong>not</strong> transmitted online.
          
          <div class="alert-instructions">
            <strong>How to activate REAL email delivery straight to your inbox:</strong>
            <ol>
              <li>Go to <a href="https://web3forms.com/" target="_blank" style="text-decoration:underline; font-weight:600; color:var(--accent-color);">web3forms.com</a> (it's 100% free and takes 10 seconds).</li>
              <li>Input your email address and click "Get Access Key".</li>
              <li>Open <code>js/resume-data.js</code> in your code files.</li>
              <li>Replace <code>accessKey: "YOUR_ACCESS_KEY_HERE"</code> with your free custom key.</li>
              <li>Save and refresh the page! Live contact emails will work immediately.</li>
            </ol>
          </div>
        `);
      }, 1500);
      
    } else {
      // 2. LIVE PRODUCTION STATE
      try {
        const formData = new FormData(form);
        formData.append('apikey', accessKey);
        formData.append('from_name', name);
        formData.append('subject', `CV Portfolio: ${subject || 'New message from CV Site'}`);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const json = await response.json();

        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;

        if (json.success) {
          form.reset();
          showAlert('success', '<strong>Success!</strong> Your message has been sent successfully to Puriphan Sawatudomphon. Thank you!');
        } else {
          showAlert('error', `<strong>Transmission Failed.</strong> Web3Forms returned an error: ${json.message || 'Unknown error.'}`);
        }

      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;
        showAlert('error', '<strong>Network Error!</strong> Unable to reach the email submission server. Please try again later.');
        console.error('Submission error:', err);
      }
    }
  });

  function showAlert(type, htmlContent) {
    alertBox.className = 'form-alert'; // Reset
    alertBox.style.display = 'block';
    
    if (type === 'success') {
      alertBox.classList.add('form-alert-success');
    } else if (type === 'error') {
      alertBox.classList.add('form-alert-error');
    } else if (type === 'info') {
      alertBox.classList.add('form-alert-info');
    } else {
      alertBox.classList.add('form-alert-warning');
    }

    alertBox.innerHTML = htmlContent;
    
    // Smooth scroll down to alerts
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Inline Spinner CSS injection
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  .loading-spinner circle {
    stroke-dashdashoffset: 0;
  }
`;
document.head.appendChild(spinnerStyle);
