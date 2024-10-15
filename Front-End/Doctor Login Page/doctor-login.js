document.addEventListener('DOMContentLoaded', function() {
    var doctorLoginForm = document.getElementById('doctorLoginForm');
    doctorLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);
        var jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('http://localhost:3000/doctor-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Redirect or show success message
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message
            });
    });
});
