(function() {
  'use strict';

  // Set current year in footer
  const yearElements = document.querySelectorAll('#current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(function(el) {
    el.textContent = currentYear;
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (mobileNavToggle && primaryNav) {
    mobileNavToggle.addEventListener('click', function() {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('is-open');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileNavToggle.contains(e.target) && !primaryNav.contains(e.target)) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });

    // Close mobile nav when clicking a link
    const navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      });
    });
  }

  // Form handling for Social form only
  // Consulting form submits directly to Formspree via native HTML form submission
  const socialForm = document.getElementById('social-form');

  function handleFormSubmission(form, statusElementId, successMessage) {
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const statusElement = document.getElementById(statusElementId);
      
      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--color-error)';
        } else {
          field.style.borderColor = 'var(--color-border)';
        }
      });

      if (!isValid) {
        statusElement.textContent = 'Please fill in all required fields.';
        statusElement.className = 'form-status error';
        return;
      }

      // Social form does not have a configured backend
      statusElement.textContent = 'Form submission is not configured. Please contact us directly at lexmathai@gmail.com';
      statusElement.className = 'form-status error';
    });
  }

  handleFormSubmission(socialForm, 'social-form-status', 'Thank you for your interest. We will reach out when there is something to share.');

})();
