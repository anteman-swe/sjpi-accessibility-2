// Vase Vista - script.js
//
// The original script blocked the main thread for a full second every
// third second, trapped the browser back button, delayed the page by
// five seconds and logged 110 000 lines to the console. All of that is
// gone. What remains is small, event-driven and non-blocking:
// the product filter and the newsletter form.

// ---- Product category filter ----
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    productCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

// ---- Newsletter form ----
const form = document.querySelector('.newsletter-form');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (emailInput.value.trim() === '' || !emailInput.checkValidity()) {
    formMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  formMessage.textContent = 'Thank you for subscribing! A welcome email is on its way.';
  form.reset();
});
