document.addEventListener('DOMContentLoaded', function() {
    var adminLoginForm = document.getElementById('adminLoginForm');
    adminLoginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this);
        var jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('http://localhost:3000/admin-login', {
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
                // Handle success, e.g., redirect or show a message
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors, e.g., show an error message
            });
    });
});
