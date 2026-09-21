const themeSwitch = document.querySelector('.header-switch');

if (themeSwitch && document.documentElement.classList.contains('dark')) {
  themeSwitch.classList.add('dark');
  setTimeout(() => {
    document.documentElement.classList.remove('dark-init');
  }, 50);
}

if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      themeSwitch.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Set LIGHT');
    } else {
      document.documentElement.classList.add('dark');
      themeSwitch.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Set DARK');
    }
    themeSwitch.classList.add('is-clicking');
  });

  themeSwitch.addEventListener('mouseleave', () => {
    themeSwitch.classList.remove('is-clicking');
  });
}