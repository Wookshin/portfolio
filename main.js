"use strict";

// Make navbar transparent when it is on the top
let navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
let navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (e) => {
  let target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen (Hide Navbar when click outside)
window.addEventListener('click', (e) => {
  if(e.target.matches('.navbar__toggle-btn') || e.target.matches('.fa-bars')) {
    navbarMenu.classList.toggle("open");
    return;
  }

  if(!navbarMenu.classList.contains("open")) {
    return;
  }

  if (!e.target.matches('#navbar')) {
    navbarMenu.classList.remove("open");
  }
}, true)

// Auto hover Navbar Item as scrolling
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// Handle click on "contact me" button on home
let contactBtn = document.querySelector(".home__contact");

contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const containers = sectionIds.map(id => document.querySelector(`.${id.replace("#",'')}__container`))

const fadeObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio <= 0) {
      return;
    }

    let offset = 0.3;
    let fadeTargetIndex = sections.indexOf(entry.target);
    let selfPercent = (entry.intersectionRect.height/entry.boundingClientRect.height + offset).toFixed(1)
    let rootPercent = (entry.intersectionRect.height / window.innerHeight + offset).toFixed(1)

    containers[fadeTargetIndex].style.opacity = Math.max(selfPercent, rootPercent);
  })
} 

const fadeObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: Array.from({length: 101}, (v, i) => v = 0.01*i)
}

const fadeObserver = new IntersectionObserver(fadeObserverCallback, fadeObserverOptions);
sections.forEach(section => fadeObserver.observe(section));

// Show "arrow up" button when scrolling down
const homeHeight = home.getBoundingClientRect().height;
const arrowUp = document.querySelector(".arrow-up");

window.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Filter my work
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one.
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });

    projectContainer.classList.remove("anim-out");
  }, 300);
});
