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

    // Function to handle form submission using fetch
    const handleFormSubmission = function (url, data, successCallback, errorCallback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => successCallback(data))
        .catch(error => errorCallback(error));
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
            // Perform the AJAX request to the Netlify function
            handleFormSubmission(
                'https://shopmerch.netlify.app/.netlify/functions/subscribe',
                { email },
                (data) => {
                    console.log('Newsletter form submitted:', data);
                    // You can customize the success handling here
                    alert('Subscription successful!');
                },
                (error) => {
                    console.error('Newsletter form submission error:', error);
                    // You can customize the error handling here
                    alert('An error occurred during subscription.');
                }
            );

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
            // Perform the AJAX request to the Netlify function
            handleFormSubmission(
                'https://shopmerch.netlify.app/.netlify/functions/contact',
                { name, email, message },
                (data) => {
                    console.log('Contact form submitted:', data);
                    // You can customize the success handling here
                    alert('Message sent successfully!');
                },
                (error) => {
                    console.error('Contact form submission error:', error);
                    // You can customize the error handling here
                    alert('An error occurred while sending the message.');
                }
            );

            // Clear the form inputs
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
        }
    });
});
