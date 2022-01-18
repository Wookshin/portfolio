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

  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({behavior: "smooth"});
});

let contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
  const scrollTo = document.querySelector('#contact');
  scrollTo.scrollIntoView({behavior: "smooth"});
});