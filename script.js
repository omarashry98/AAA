let menubar = document.querySelector('#menu-bar');
let mynav = document.querySelector('.nav');
let searchbar = document.querySelector('#search-bar');
let search = document.querySelector('.search-form');

document.getElementById('scrollButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the default behavior of the link
    window.scrollBy({ 
        top: 900, 
        behavior: 'smooth' 
    });
});

document.getAnimations

document.getElementById('submitBtn').addEventListener('click', function(event) {
    const emailInput = document.getElementById('email').value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const emailError = document.getElementById('emailError');

    if (!emailRegex.test(emailInput)) {
        event.preventDefault(); // Prevent form submission
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = ''; // Clear any previous error messages

        const formData = {
            name: document.getElementById('name').value,
            email: emailInput, // Use the validated email value
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Alert the message from the server
            window.location.assign('/thankyou.html')
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('.input-text');

    inputFields.forEach(function(input) {
        input.addEventListener('input', function() {
            const label = input.nextElementSibling;
            if (input.value.trim() !== '') {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });
    });
});


menubar.onclick = () =>{
    menubar.classList.toggle('fa-times')
    mynav.classList.toggle('active')
}

