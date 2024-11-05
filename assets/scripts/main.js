const submitBtn = document.querySelector('.newsletter__form-button');
const formInput = document.querySelector('.newsletter__form-input');
const article = document.querySelector('.newsletter');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const inputData = formInput.value.trim();

  if (!inputData) {
    formInput.classList.add('error');
    return;
  }
  else {
    formInput.classList.remove('error');
  }

    fetch('http://localhost:3000/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: inputData })
    })
    .then(response => response.json())
    .then(() => {
      formInput.value = ''; // Limpia el input
      alert('Email sent successfully!'); // Mensaje de éxito
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send email.'); // Mensaje de error
    });
});
