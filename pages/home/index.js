const themeSwitch = document.querySelector('.header-switch');

themeSwitch.addEventListener('click', () => {
  themeSwitch.classList.toggle('dark');
  themeSwitch.classList.add('is-clicking');
});
themeSwitch.addEventListener('mouseleave', () => {
  themeSwitch.classList.remove('is-clicking');
});