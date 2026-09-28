const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.burger-menu');

if (burgerBtn && mobileMenu) {
  const closeMenu = () => {
    burgerBtn.classList.remove('burger-btn--open');
    mobileMenu.classList.remove('burger-menu--open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }

  const openMenu = () => {
    burgerBtn.classList.add('burger-btn--open');
    mobileMenu.classList.add('burger-menu--open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  burgerBtn.addEventListener('click', () => {
    if (burgerBtn.classList.contains('burger-btn--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerBtn.classList.contains('burger-btn--open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769 && burgerBtn.classList.contains('burger-btn--open')) {
      closeMenu();
    }
  });
}