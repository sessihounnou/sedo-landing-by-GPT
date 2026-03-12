// Navigation mobile — burger menu
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
  });
  // Fermer le menu sur clic d'un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('nav__links--open'));
  });
}

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('header--scrolled', window.scrollY > 20);
});
