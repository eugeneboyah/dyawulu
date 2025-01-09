document.getElementById('subscribeBtn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('responseMessage');

    // Clear previous messages
    responseMessage.textContent = '';

    // Validate email
    if (!email) {
      responseMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    // Send AJAX request using Fetch API
    fetch('/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.text())
      .then((message) => {
        responseMessage.textContent = message; // Display response message
      })
      .catch((error) => {
        console.error('Error:', error);
        responseMessage.textContent = 'An error occurred. Please try again.';
      });
  });