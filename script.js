// Title page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('TrueHue title page loaded');
  
  // Force all pin-flower SVG petals to pink
  const flower = document.querySelector('.pin-flower');
  if (flower) {
    const petals = flower.querySelectorAll('ellipse');
    petals.forEach(petal => {
      petal.setAttribute('fill', '#ff69b4');
      petal.setAttribute('opacity', '0.9');
    });
  }
  
  // Initialize the title page
  initializeTitlePage();
});

function initializeTitlePage() {
  // Get the login button
  const loginBtn = document.getElementById('loginBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLoginClick);
    console.log('Login button event listener attached');
  }
  
  // Add some interactive animations
  addInteractiveAnimations();
  
  // Add keyboard shortcuts
  addKeyboardShortcuts();
}

function handleLoginClick(event) {
  event.preventDefault();
  
  // Add loading animation
  const loginBtn = event.target;
  const originalText = loginBtn.textContent;
  
  loginBtn.textContent = 'Loading...';
  loginBtn.style.opacity = '0.8';
  loginBtn.style.cursor = 'not-allowed';
  
  // Show loading message with animation
  showLoadingMessage();
  
  // Simulate a brief loading period before redirect
  setTimeout(() => {
    // Redirect to index2.html (login page)
    window.location.href = 'index2.html';
  }, 1200);
}

function showLoadingMessage() {
  // Create a temporary loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p>Preparing your TrueHue experience...</p>
    </div>
  `;
  
  // Add styles dynamically
  loadingOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(215, 251, 232, 0.95);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `;
  
  const loadingContent = loadingOverlay.querySelector('.loading-content');
  loadingContent.style.cssText = `
    text-align: center;
    color: #2e4f4f;
    font-family: 'Poppins', sans-serif;
  `;
  
  const spinner = loadingOverlay.querySelector('.loading-spinner');
  spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 4px solid #ffb6c1;
    border-top: 4px solid #4a90e2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  `;
  
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(loadingOverlay);
}

function addInteractiveAnimations() {
  // Add hover effects to feature items
  const featureItems = document.querySelectorAll('.feature-item');
  
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add floating animation to the flower icon
  const flower = document.querySelector('.pin-flower');
  if (flower) {
    // Enhanced floating animation
    flower.style.animation = 'gentleFloat 4s ease-in-out infinite, colorShift 8s ease-in-out infinite';
  }
  
  // Add particle effect on page load
  createParticleEffect();
}

function createParticleEffect() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  // Create floating particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 4}px;
      height: ${Math.random() * 6 + 4}px;
      background: ${getRandomColor()};
      border-radius: 50%;
      opacity: 0.6;
      animation: float ${Math.random() * 10 + 15}s linear infinite;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
    `;
    
    particleContainer.appendChild(particle);
  }
  
  document.body.appendChild(particleContainer);
  
  // Add CSS for particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    @keyframes colorShift {
      0%, 100% { filter: hue-rotate(0deg); }
      33% { filter: hue-rotate(120deg); }
      66% { filter: hue-rotate(240deg); }
    }
  `;
  document.head.appendChild(style);
}

function getRandomColor() {
  const colors = ['#ff69b4', '#4a90e2', '#77dd77', '#ffb6c1', '#ffd700', '#ff9aad'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function addKeyboardShortcuts() {
  document.addEventListener('keydown', function(event) {
    // Enter key or Space key to trigger login
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.click();
      }
    }
    
    // L key for login
    if (event.code === 'KeyL' && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.click();
      }
    }
  });
}

// Add some dynamic content updates
function addDynamicContent() {
  // Update welcome message with time-based greeting
  const welcomeMsg = document.querySelector('.main-welcome');
  if (welcomeMsg) {
    const hour = new Date().getHours();
    let greeting = 'Welcome to TrueHue';
    
    if (hour < 12) {
      greeting = 'Good Morning! Welcome to TrueHue';
    } else if (hour < 17) {
      greeting = 'Good Afternoon! Welcome to TrueHue';
    } else {
      greeting = 'Good Evening! Welcome to TrueHue';
    }
    
    welcomeMsg.textContent = `${greeting} - Color Blindness Enhancement App`;
  }
}

// Initialize dynamic content when page loads
document.addEventListener('DOMContentLoaded', addDynamicContent);

// Add scroll effects
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.feature-item');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
  });
});

// Handle window resize
window.addEventListener('resize', function() {
  // Adjust particle positions if needed
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    particle.style.left = Math.random() * 100 + 'vw';
  });
});

console.log('TrueHue title page JavaScript loaded successfully');