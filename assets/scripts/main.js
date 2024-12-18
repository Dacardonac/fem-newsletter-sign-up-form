const submitBtn = document.querySelector('.newsletter__form-button');
const formInput = document.querySelector('.newsletter__form-input');
const main = document.querySelector('main');
const article = document.querySelector('.newsletter');

// Función para mostrar mensajes al usuario
function showMessage() {
  const messageContainer = document.createElement('article');
  messageContainer.classList.add('success-message');
  messageContainer.innerHTML = `
    <span class="success-message__icon"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="100%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FF6A3A"/><stop offset="100%" stop-color="#FF527B"/></linearGradient></defs><g fill="none"><circle cx="32" cy="32" r="32" fill="url(#a)"/><path stroke="#FFF" stroke-width="4" d="m18.286 34.686 8.334 7.98 19.094-18.285"/></g></svg></span>
    <h2 class="success-message__title">Thanks for subscribing!</h2>
    <p class="success-message__description">A confirmation email has been sent to ash@loremcompany.com.
      Please open it and click the button inside to confirm your subscription.</p>
    <button class="success-message__btn">Dismiss message</button>
  `;
  main.appendChild(messageContainer);
  article.classList.add('newsletter__hidden');
}

// Validar la entrada del usuario
function validateInput(input) {
  const isValid = input.trim() !== '';
  formInput.classList.toggle('error', !isValid); // Añade o quita la clase 'error' según la validez
  return isValid;
}

// Función para enviar el correo
async function sendEmail(email) {
  try {
    const response = await fetch('http://localhost:3000/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!response.ok) throw new Error('Network response was not ok');

    formInput.value = ''; // Limpia el input en caso de éxito
    showMessage();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Evento para el botón de enviar
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const inputData = formInput.value;

  if (validateInput(inputData)) {
    sendEmail(inputData);
  }
});