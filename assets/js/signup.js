// signup.js

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect form data
    const formData = new FormData(event.target);

    // Display the collected data (this is where you would send an email and export to Excel)
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });
});
