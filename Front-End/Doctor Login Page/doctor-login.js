document.addEventListener('DOMContentLoaded', function() {
    var doctorLoginForm = document.getElementById('doctorLoginForm'); // Make sure this ID matches the form ID in your HTML
    doctorLoginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this);
        fetch('http://localhost:3000/doctor-login', { // Make sure this matches your server endpoint for doctor login
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // You can redirect the doctor to their dashboard or show a success message here
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors, e.g., show an error message to the doctor
            });
    });
});
