function submitLoginForm() {
    var form = document.getElementById('loginForm');
    var formData = new FormData(form);

    fetch('http://localhost:3000/login', { // Update the URL here
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
