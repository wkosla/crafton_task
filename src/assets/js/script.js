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



// Google maps
let map;

function initMap() {
  const myLatLng = new google.maps.LatLng(52.4165045, 16.9320826);

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 15,
    disableDefaultUI: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });

  const marker = new google.maps.Marker({
      position: myLatLng,
      icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="50" viewBox="0 0 384 512"><path fill="rgb(0,182,220)" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>'
  });

  marker.setMap(map);
}
