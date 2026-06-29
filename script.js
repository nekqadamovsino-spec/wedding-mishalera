const weddingDate = new Date('2026-08-15T15:40:00+07:00');

function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;

  days.textContent = Math.floor(diff / (1000*60*60*24));
  hours.textContent = String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,'0');
  minutes.textContent = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,'0');
  seconds.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2,'0');
}

tick();
setInterval(tick,1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:.14});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymNleO2sjH6v6C30-qhH0PPNigAcdE7Hq2tFx0zaPKsMMUvgwwN5uC67l_2eIwZyAj/exec";

const openRsvp = document.getElementById('openRsvp');
const closeRsvp = document.getElementById('closeRsvp');
const rsvpModal = document.getElementById('rsvpModal');
const submitRsvp = document.getElementById('submitRsvp');

const inputs = rsvpModal.querySelectorAll('input');

openRsvp.onclick = () => {
  rsvpModal.style.display = 'flex';
};

closeRsvp.onclick = () => {
  rsvpModal.style.display = 'none';
};

rsvpModal.onclick = (e) => {
  if(e.target === rsvpModal){
    rsvpModal.style.display = 'none';
  }
};

submitRsvp.onclick = async () => {
  const name = inputs[0].value.trim();
  const surname = inputs[1].value.trim();
  const phone = inputs[2].value.trim();

  if(!name || !surname || !phone){
    alert('Заполните имя, фамилию и телефон');
    return;
  }

  submitRsvp.textContent = 'Отправляем...';

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, surname, phone })
  });

  submitRsvp.textContent = 'Отправлено';
  alert('Спасибо! Ваш ответ принят ❤️');
  rsvpModal.style.display = 'none';

  inputs.forEach(input => input.value = '');
  submitRsvp.textContent = 'Подтвердить';
};
