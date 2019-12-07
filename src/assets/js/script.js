const nav = document.querySelector('.nav'),
  hamburger = document.querySelector('.hamburger'),
  sections = Array.from(document.querySelectorAll('.row')),
  sectionNavBtns = Array.from(document.querySelectorAll('.sections__btn'));

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
});

function onWhite(el) {
  return el.offsetTop + (el.clientHeight / 2) >= sections[1].getBoundingClientRect().top;
}

function inView(section) {
  return section.getBoundingClientRect().top < window.innerHeight / 2 && section.getBoundingClientRect().bottom > window.innerHeight / 2;
}

window.addEventListener('scroll', function() {
  if (this.scrollY > 0) {
    nav.classList.add('nav--scroll');
  } else {
    nav.classList.remove('nav--scroll');
  }

  sectionNavBtns.forEach(btn => {
    if (onWhite(btn)) {
      btn.classList.add('sections__btn--dark');
    } else {
      btn.classList.remove('sections__btn--dark');
    }
  });

  sections.forEach((section, i) => {
    if (inView(section)) {
      sectionNavBtns[i].classList.add('sections__btn--active');
    } else {
      sectionNavBtns[i].classList.remove('sections__btn--active');
    }
  })
});

hamburger.addEventListener('click', function() {
  this.classList.toggle('is-active');
  nav.classList.toggle('nav--toggled');
})
