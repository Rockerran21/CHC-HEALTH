document.addEventListener('DOMContentLoaded', function() {
    const newUserYesRadio = document.querySelector('#newUserYes');
    const newUserNoRadio = document.querySelector('#newUserNo');
    const form = document.querySelector('#healthcareForm'); // Corrected the form ID
    console.log(form); // This should now log the form element

    newUserYesRadio.addEventListener('change', function() {
        if (this.checked) {
            window.location.href = '/Community%20Health%20Companion%20Application/CHC-HEALTH/Front-End/User%20Register%20page/userregister.html';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (newUserNoRadio.checked) {
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            fetch('http://localhost:3000/healthcare-form/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Form submitted successfully') {
                        alert('Form submitted successfully.');
                    } else {
                        alert('There was a problem submitting your form.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while submitting the form.');
                });
        } else {
            alert('Please select if you are a new user or not.');
        }
    });
});
