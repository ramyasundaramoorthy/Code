// Login page JavaScript functionality with pink and green theme
document.addEventListener('DOMContentLoaded', function() {
  console.log('TrueHue login page loaded');
  
  // Initialize the login page
  initializeLoginPage();
});

function initializeLoginPage() {
  // Get form elements
  const loginForm = document.getElementById('loginForm');
  const backBtn = document.getElementById('backBtn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const statusDiv = document.getElementById('loginStatus');
  
  // Set up event listeners
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', handleBackClick);
  }
  
  // Add input validation and enhancement
  if (usernameInput) {
    usernameInput.addEventListener('input', handleInputChange);
    usernameInput.addEventListener('focus', handleInputFocus);
    usernameInput.addEventListener('blur', handleInputBlur);
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', handleInputChange);
    passwordInput.addEventListener('focus', handleInputFocus);
    passwordInput.addEventListener('blur', handleInputBlur);
  }
  
  // Add keyboard shortcuts
  addKeyboardShortcuts();
  
  // Add form animations
  addFormAnimations();
  
  // Add password toggle functionality
  addPasswordToggle();
  
  // Focus on username field by default
  if (usernameInput) {
    setTimeout(() => usernameInput.focus(), 100);
  }
  
  console.log('Login page initialized successfully');
}

function handleLoginSubmit(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const rememberMe = document.getElementById('rememberMe').checked;
  
  console.log('Login attempt:', { username, rememberMe });
  
  // Clear any previous status messages
  hideStatus();
  
  // Basic validation
  if (!username || !password) {
    showStatus('Please enter both username and password.', 'error');
    addShakeAnimation();
    return;
  }
  
  if (username.length < 3) {
    showStatus('Username must be at least 3 characters long.', 'error');
    document.getElementById('username').classList.add('error');
    addShakeAnimation();
    return;
  }
  
  if (password.length < 6) {
    showStatus('Password must be at least 6 characters long.', 'error');
    document.getElementById('password').classList.add('error');
    addShakeAnimation();
    return;
  }
  
  // Show loading state
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = '<span class="loading-spinner"></span>Signing In...';
  submitBtn.disabled = true;
  
  showStatus('Authenticating...', '');
  
  // Simulate authentication with network delay
  setTimeout(() => {
    console.log('Attempting authentication for:', username);
    const isAuthenticated = authenticateUser(username, password);
    console.log('Authentication result:', isAuthenticated);
    
    if (isAuthenticated) {
      // Successful login
      showStatus('Login successful! Redirecting to TrueHue...', 'success');
      
      // Store user session if remember me is checked
      if (rememberMe) {
        // In a real app, you'd use secure session storage
        localStorage.setItem('truehue_remember', 'true');
        localStorage.setItem('truehue_username', username);
        console.log('User session stored with remember me option');
      }
      
      // Add success animation
      addSuccessAnimation();
      
      // Redirect to main app after short delay
      setTimeout(() => {
        console.log('Redirecting to index1.html...');
        try {
          window.location.href = 'index1.html'; // Main application page
        } catch (error) {
          console.error('Redirect error:', error);
          // Fallback: try direct navigation
          window.location.replace('index1.html');
        }
      }, 2000);
      
    } else {
      // Failed login
      showStatus('Invalid username or password. Please check your credentials.', 'error');
      
      // Reset form
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Clear password field for security
      document.getElementById('password').value = '';
      document.getElementById('password').focus();
      
      // Add error styling to inputs
      document.getElementById('username').classList.add('error');
      document.getElementById('password').classList.add('error');
      
      // Add shake animation to form
      addShakeAnimation();
    }
  }, 1800); // Simulate network delay
}

function authenticateUser(username, password) {
  // Demo authentication - in a real app, this would call your backend API
  const validCredentials = [
    { username: 'demo', password: 'truehue2025' },
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'password123' },
    { username: 'test', password: 'test123' }
  ];
  
  console.log('Checking credentials:', { username, password });
  console.log('Valid credentials:', validCredentials);
  
  const result = validCredentials.some(cred => 
    cred.username.toLowerCase() === username.toLowerCase() && 
    cred.password === password
  );
  
  console.log('Authentication result:', result);
  return result;
}

function handleBackClick(event) {
  event.preventDefault();
  
  // Add confirmation if form has data
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (username || password) {
    if (!confirm('Are you sure you want to go back? Any entered data will be lost.')) {
      return;
    }
  }
  
  // Add exit animation
  const loginBox = document.querySelector('.login-box');
  loginBox.style.animation = 'slideOutDown 0.5s ease-in';
  
  // Navigate back to title page after animation
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

function handleInputChange(event) {
  const input = event.target;
  const value = input.value.trim();
  
  // Remove error styling when user starts typing
  input.classList.remove('error');
  
  // Real-time validation feedback
  if (value) {
    validateInput(input);
  }
}

function handleInputFocus(event) {
  const input = event.target;
  input.parentElement.classList.add('focused');
  
  // Add focus animation
  input.style.transform = 'translateY(-2px)';
  input.style.boxShadow = '0 0 20px rgba(255, 105, 180, 0.4), 0 0 10px rgba(152, 251, 152, 0.3)';
}

function handleInputBlur(event) {
  const input = event.target;
  input.parentElement.classList.remove('focused');
  
  // Remove focus animation
  input.style.transform = 'translateY(0)';
  input.style.boxShadow = 'none';
  
  // Validate input on blur
  const value = input.value.trim();
  if (value) {
    validateInput(input);
  }
}

function validateInput(input) {
  const value = input.value.trim();
  const inputType = input.type;
  
  // Clear previous validation styles
  input.classList.remove('error', 'valid');
  
  if (!value) {
    return; // Don't show error for empty fields until form submit
  }
  
  let isValid = true;
  
  if (inputType === 'text' && input.name === 'username') {
    // Username validation
    if (value.length < 3) {
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      isValid = false;
    }
  } else if (inputType === 'password') {
    // Password validation
    if (value.length < 6) {
      isValid = false;
    }
  }
  
  // Apply validation styling
  if (isValid) {
    input.classList.add('valid');
  } else {
    input.classList.add('error');
  }
}

function addKeyboardShortcuts() {
  document.addEventListener('keydown', function(event) {
    // Prevent shortcuts if user is typing in an input
    if (event.target.matches('input')) {
      if (event.code === 'Enter') {
        // Allow Enter to submit form when in input field
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
          event.preventDefault();
          loginForm.dispatchEvent(new Event('submit'));
        }
      }
      return;
    }
    
    // Enter key to focus on first empty field or submit
    if (event.code === 'Enter') {
      event.preventDefault();
      const username = document.getElementById('username');
      const password = document.getElementById('password');
      
      if (!username.value.trim()) {
        username.focus();
      } else if (!password.value.trim()) {
        password.focus();
      } else {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
          loginForm.dispatchEvent(new Event('submit'));
        }
      }
    }
    
    // Escape key to go back
    if (event.code === 'Escape') {
      event.preventDefault();
      const backBtn = document.getElementById('backBtn');
      if (backBtn) {
        backBtn.click();
      }
    }
    
    // U key to focus username
    if (event.code === 'KeyU' && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      document.getElementById('username').focus();
    }
    
    // P key to focus password
    if (event.code === 'KeyP' && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      document.getElementById('password').focus();
    }
  });
}

function addFormAnimations() {
  // Add CSS for additional animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOutDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(50px);
        opacity: 0;
      }
    }
    
    @keyframes successPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes colorShift {
      0% { filter: hue-rotate(0deg); }
      25% { filter: hue-rotate(90deg); }
      50% { filter: hue-rotate(180deg); }
      75% { filter: hue-rotate(270deg); }
      100% { filter: hue-rotate(360deg); }
    }
    
    .success-animation {
      animation: successPulse 0.6s ease-in-out, colorShift 2s ease-in-out;
    }
  `;
  document.head.appendChild(style);
}

function addShakeAnimation() {
  const loginBox = document.querySelector('.login-box');
  if (loginBox) {
    // Remove any existing animation class
    loginBox.classList.remove('shake-animation');
    
    // Add shake animation class
    loginBox.classList.add('shake-animation');
    
    // Add the shake animation styles if not already added
    if (!document.querySelector('#shake-styles')) {
      const style = document.createElement('style');
      style.id = 'shake-styles';
      style.textContent = `
        .shake-animation {
          animation: shakeError 0.6s ease-in-out;
        }
        
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
      loginBox.classList.remove('shake-animation');
    }, 600);
  }
}

function addSuccessAnimation() {
  const loginBox = document.querySelector('.login-box');
  if (loginBox) {
    loginBox.classList.add('success-animation');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      loginBox.classList.remove('success-animation');
    }, 2600);
  }
}

function addPasswordToggle() {
  const passwordInput = document.getElementById('password');
  const passwordGroup = passwordInput.parentElement;
  
  // Check if toggle already exists
  if (passwordGroup.querySelector('.password-toggle')) {
    return;
  }
  
  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.className = 'password-toggle';
  toggleButton.innerHTML = '👁';
  toggleButton.setAttribute('aria-label', 'Toggle password visibility');
  
  passwordGroup.style.position = 'relative';
  passwordGroup.appendChild(toggleButton);
  
  toggleButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleButton.innerHTML = '🙈';
      toggleButton.setAttribute('aria-label', 'Hide password');
    } else {
      passwordInput.type = 'password';
      toggleButton.innerHTML = '👁️';
      toggleButton.setAttribute('aria-label', 'Show password');
    }
    
    // Keep focus on password input
    passwordInput.focus();
  });
}

function showStatus(message, type = '') {
  const statusDiv = document.getElementById('loginStatus');
  if (statusDiv) {
    statusDiv.textContent = message;
    statusDiv.className = `status-msg ${type}`;
    statusDiv.style.display = 'block';
    
    // Auto-hide non-success messages after 5 seconds
    if (type !== 'success') {
      setTimeout(() => {
        hideStatus();
      }, 5000);
    }
  }
}

function hideStatus() {
  const statusDiv = document.getElementById('loginStatus');
  if (statusDiv) {
    statusDiv.style.display = 'none';
  }
}

// Form validation helper functions
function validateForm() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  let isValid = true;
  let errors = [];
  
  // Clear previous error states
  document.getElementById('username').classList.remove('error');
  document.getElementById('password').classList.remove('error');
  
  if (!username) {
    errors.push('Username is required');
    document.getElementById('username').classList.add('error');
    isValid = false;
  } else if (username.length < 3) {
    errors.push('Username must be at least 3 characters');
    document.getElementById('username').classList.add('error');
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
    document.getElementById('username').classList.add('error');
    isValid = false;
  }
  
  if (!password) {
    errors.push('Password is required');
    document.getElementById('password').classList.add('error');
    isValid = false;
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
    document.getElementById('password').classList.add('error');
    isValid = false;
  }
  
  if (!isValid) {
    showStatus(errors.join('. '), 'error');
  }
  
  return isValid;
}

// Enhanced user experience features
function addFloatingLabels() {
  const inputs = document.querySelectorAll('.form-input');
  
  inputs.forEach(input => {
    const label = input.parentElement.querySelector('.form-label');
    
    function updateLabel() {
      if (input.value.trim() || input === document.activeElement) {
        label.style.transform = 'translateY(-10px) scale(0.9)';
        label.style.color = '#ff69b4';
      } else {
        label.style.transform = 'translateY(0) scale(1)';
        label.style.color = '#2d5016';
      }
    }
    
    input.addEventListener('focus', updateLabel);
    input.addEventListener('blur', updateLabel);
    input.addEventListener('input', updateLabel);
    
    // Initial state
    updateLabel();
  });
}

// Auto-complete and session management
function handleAutoComplete() {
  const rememberedUsername = localStorage.getItem('truehue_username');
  const rememberMe = localStorage.getItem('truehue_remember');
  
  if (rememberMe === 'true' && rememberedUsername) {
    document.getElementById('username').value = rememberedUsername;
    document.getElementById('rememberMe').checked = true;
    
    // Focus on password field since username is pre-filled
    setTimeout(() => {
      document.getElementById('password').focus();
    }, 100);
  }
}

// Initialize auto-complete on page load
document.addEventListener('DOMContentLoaded', function() {
  handleAutoComplete();
});

// Handle page unload with form data warning
window.addEventListener('beforeunload', function(event) {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if ((username || password) && !event.target.location.href.includes('app.html')) {
    event.preventDefault();
    event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
  }
});

// Error handling for network issues
function handleNetworkError() {
  showStatus('Network error. Please check your connection and try again.', 'error');
  
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.innerHTML = 'Sign In';
  submitBtn.disabled = false;
}

// Enhanced security features
function checkPasswordStrength(password) {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  strength = Object.values(checks).filter(Boolean).length;
  
  return {
    strength,
    checks,
    isStrong: strength >= 3
  };
}

// Add password strength indicator
function addPasswordStrengthIndicator() {
  const passwordInput = document.getElementById('password');
  const passwordGroup = passwordInput.parentElement;
  
  const strengthBar = document.createElement('div');
  strengthBar.className = 'password-strength';
  strengthBar.style.cssText = `
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    margin-top: 5px;
    overflow: hidden;
    transition: all 0.3s ease;
  `;
  
  const strengthFill = document.createElement('div');
  strengthFill.className = 'password-strength-fill';
  strengthFill.style.cssText = `
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #ff6b6b, #ff69b4, #98fb98);
    transition: all 0.3s ease;
    border-radius: 2px;
  `;
  
  strengthBar.appendChild(strengthFill);
  passwordGroup.appendChild(strengthBar);
  
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const { strength } = checkPasswordStrength(password);
    
    const percentage = (strength / 5) * 100;
    strengthFill.style.width = `${percentage}%`;
    
    if (strength <= 2) {
      strengthFill.style.background = '#ff6b6b';
    } else if (strength <= 3) {
      strengthFill.style.background = '#ff69b4';
    } else {
      strengthFill.style.background = '#98fb98';
    }
  });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
  addFloatingLabels();
  addPasswordStrengthIndicator();
});

// Accessibility enhancements
function addAccessibilityFeatures() {
  // Add ARIA labels
  document.getElementById('username').setAttribute('aria-describedby', 'username-help');
  document.getElementById('password').setAttribute('aria-describedby', 'password-help');
  
  // Add screen reader announcements for status changes
  const statusDiv = document.getElementById('loginStatus');
  if (statusDiv) {
    statusDiv.setAttribute('role', 'alert');
    statusDiv.setAttribute('aria-live', 'polite');
  }
  
  // Enhance keyboard navigation
  const focusableElements = document.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])');
  focusableElements.forEach((el, index) => {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        if (index < focusableElements.length - 1) {
          e.preventDefault();
          focusableElements[index + 1].focus();
        }
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        if (index > 0) {
          e.preventDefault();
          focusableElements[index - 1].focus();
        }
      }
    });
  });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
  addAccessibilityFeatures();
});

console.log('TrueHue pink & green login page JavaScript loaded successfully');
console.log('TrueHue pink & green login page JavaScript loaded successfully');