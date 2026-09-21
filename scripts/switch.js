if (document.documentElement.classList.contains('dark-init')) {
  document.body.style.transition = 'none';
  document.body.classList.add('dark');
  document.body.classList.remove('dark-init');

  setTimeout(() => {
    document.body.style.transition = '';
  }, 50);
}

const themeSwitch = document.querySelector('.header-switch');

if (themeSwitch && document.body.classList.contains('dark')) {
  themeSwitch.classList.add('dark');
}
// if (theme === 'dark') {
//   document.body.classList.add('dark');
//   if (themeSwitch) themeSwitch.classList.add('dark');
// } else {
//   document.body.classList.remove('dark');
//   if (themeSwitch) themeSwitch.classList.remove('dark');
// }

// initTheme();

themeSwitch.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeSwitch.classList.toggle('dark');
  themeSwitch.classList.add('is-clicking');

  if (isDark) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
themeSwitch.addEventListener('mouseleave', () => {
  themeSwitch.classList.remove('is-clicking');
});