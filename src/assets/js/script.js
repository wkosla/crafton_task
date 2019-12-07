const nav = document.querySelector('.nav'),
  hamburger = document.querySelector('.hamburger'),
  sections = Array.from(document.querySelectorAll('.row')),
  sectionNavBtns = Array.from(document.querySelectorAll('.sections__btn')),
  form = document.querySelector('.form__form'),
  inputs = Array.from(document.querySelectorAll('.input__input')),
  checkbox = document.querySelector('.input__checkbox');

// Initialize smooth-scroll lib
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
});

// Detect dot entering white background
function onWhite(el) {
  return el.offsetTop + (el.clientHeight / 2) >= sections[1].getBoundingClientRect().top;
}

// Detect section scrolling into view
function inView(section) {
  return section.getBoundingClientRect().top < window.innerHeight / 2 && section.getBoundingClientRect().bottom > window.innerHeight / 2;
}

function emailCheck(val) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(val);
}

function textCheck(val) {
  const re = /[^\s]/;
  return re.test(val);
}

function inputValidate(input, type = 'input', arr = false) {
  let isValid;

  if (type === 'input') {  
    isValid = input.getAttribute('name') === 'email' ? emailCheck(input.value) : textCheck(input.value);
  } else {
    isValid = input.checked;
  }

  if (!isValid) {
    input.classList.add(`input__${type}--invalid`);
    if (arr) arr.push(false);
  } else {
    input.classList.remove(`input__${type}--invalid`);
    if (arr) arr.push(true);
  }
}

window.addEventListener('scroll', function() {
  // Add white background to nav after scrolling down
  if (this.scrollY > 0) {
    nav.classList.add('nav--scroll');
  } else {
    nav.classList.remove('nav--scroll');
  }

  // Change sections navigation buttons colors when entering white background
  sectionNavBtns.forEach(btn => {
    if (onWhite(btn)) {
      btn.classList.add('sections__btn--dark');
    } else {
      btn.classList.remove('sections__btn--dark');
    }
  });

  // Highlight sections navigation buttons when entering relevant section
  sections.forEach((section, i) => {
    if (inView(section)) {
      sectionNavBtns[i].classList.add('sections__btn--active');
    } else {
      sectionNavBtns[i].classList.remove('sections__btn--active');
    }
  });
});

// Toggle mobile nav
hamburger.addEventListener('click', function() {
  this.classList.toggle('is-active');
  nav.classList.toggle('nav--toggled');
});

inputs.forEach(input => {
  input.addEventListener('change', function() {
    // "Activate" label if input is not empty
    if (this.value.length > 0) {
      this.nextElementSibling.classList.add('input__label--active');
      inputValidate(this);
    } else {
      this.nextElementSibling.classList.remove('input__label--active');
    }
  });
});

checkbox.addEventListener('change', function() {
  if (this.checked) {
    this.classList.remove('input__checkbox--invalid');
  }
});

form.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const validatedInputs = [];

  // Validate text inputs
  inputs.forEach(input => {
    inputValidate(input, 'input', validatedInputs);
  });
  // Validate checkbox
  inputValidate(checkbox, 'checkbox', validatedInputs);

  // Check if there are any invalid inputs
  if (!validatedInputs.some(el => !el)) {
    const formData = new FormData(form);
    
    fetch('../mail.php', {
      method: 'POST',
      body: formData      
    }).then(({ status }) => {
      const msg = this.lastElementChild;

      if (status !== 200) {
        msg.innerText = 'Nie udało się wysłać wiadomości. Spróbuj ponownie poźniej.';
      } else {
        msg.innerText = 'Wiadomość wysłana.';
      }
      msg.classList.add('form__message--show');
    });
  }
});
