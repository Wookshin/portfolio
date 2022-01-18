'use strict'

// Make navbar transparent when it is on the top
let navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

window.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
}); 


// Handle scrolling when tapping on the navbar menu
let navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (e) => {
  let target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Handle click on "contact me" button on home
let contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
}