document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission (page reload)
    
    const formData = new FormData(this);
    
    fetch('/appointment', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check if you're receiving the correct response

        const messageElement = document.getElementById('response-message');
        messageElement.style.display = 'block'; // Show message

        if (data.success) {
            messageElement.classList.add('alert-success');
            messageElement.classList.remove('alert-danger');
        } else {
            messageElement.classList.add('alert-danger');
            messageElement.classList.remove('alert-success');
        }

        messageElement.textContent = data.message; // Display the message
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

