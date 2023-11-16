// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Newsletter form validation
    const validateNewsletterForm = function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address for the newsletter subscription.');
            return false;
        }

        return true;
    };

    // Contact form validation
    const validateContactForm = function (name, email, message) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            alert('All fields in the contact form are required.');
            return false;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address in the contact form.');
            return false;
        }

        return true;
    };

    // Get the newsletter form
    const newsletterForm = document.getElementById('newsletterForm');

    // Add event listener for the newsletter form
    newsletterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the email input value
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value;

        // Validate the email
        if (validateNewsletterForm(email)) {
            // Perform the AJAX request or any other logic to handle the subscription
            console.log('Newsletter form submitted with email:', email);
            // You can use fetch() or another method to send the data to the server

            // Clear the email input
            emailInput.value = '';
        }
    });

    // Get the contact form
    const contactForm = document.getElementById('contactForm');

    // Add event listener for the contact form
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form input values
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        // Validate the inputs
        if (validateContactForm(name, email, message)) {
            // Perform the AJAX request or any other logic to handle the contact form
            console.log('Contact form submitted with data:', { name, email, message });
            // You can use fetch() or another method to send the data to the server

            // Clear the form inputs
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
        }
    });
});
