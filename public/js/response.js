document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointment-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const formData = new FormData(form); // Get form data
        const formDataObject = Object.fromEntries(formData.entries()); // Convert to plain object

        try {
            const response = await fetch('/appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObject) // Send form data as JSON
            });

            const result = await response.json();

            // Display the response message on the page
            responseMessage.innerHTML = `
                <div class="${result.success ? 'alert alert-success' : 'alert alert-danger'}">
                    ${result.message}
                </div>
            `;

            if (result.success) {
                form.reset(); // Clear form fields if the email is sent successfully
            }

        } catch (error) {
            console.error('Error:', error);
            responseMessage.innerHTML = `
                <div class="alert alert-danger">
                    Something went wrong. Please try again later.
                </div>
            `;
        }
    });
});
