document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('userRegistrationForm');
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);
        var jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle the response
            })
            .catch(error => console.error('Error:', error));
    });
});
