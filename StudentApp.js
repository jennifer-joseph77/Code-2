// Validation functions
function validateName() {
    const name = document.getElementById('name').value;
    const nameError = document.getElementById('nameError');
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(name)) {
        nameError.textContent = "Name should contain only alphabets and spaces.";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validateDOB() {
    const dob = document.getElementById('dob').value;
    const dobError = document.getElementById('dobError');
    const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!dobRegex.test(dob)) {
        dobError.textContent = "Date of birth should be in dd/mm/yyyy format.";
        return false;
    }

    const [, day, month, year] = dob.match(dobRegex);
    const date = new Date(year, month - 1, day);
    if (date.getDate() != day || date.getMonth() + 1 != month || date.getFullYear() != year) {
        dobError.textContent = "Invalid date.";
        return false;
    }

    dobError.textContent = "";
    calculateAge(dob);
    return true;
}

function calculateAge(dob) {
    const [day, month, year] = dob.split('/');
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    document.getElementById('age').value = age;
}

function validateMobile() {
    const mobile = document.getElementById('mobile').value;
    const mobileError = document.getElementById('mobileError');
    const mobileRegex = /^[1-9]\d{9}$/;

    if (!mobileRegex.test(mobile)) {
        mobileError.textContent = "Mobile number should be 10 digits and not start with 0.";
        document.getElementById('mobile').value = "";
        return false;
    }
    mobileError.textContent = "";
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email format. Should contain @ and end with .com or .in";
        document.getElementById('email').value = "";
        return false;
    }
    emailError.textContent = "";
    return true;
}

// Form submission
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateName() && validateDOB() && validateMobile() && validateEmail()) {
        const studentData = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            age: document.getElementById('age').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value
        };

        // Store in cookie
        document.cookie = `studentData=${JSON.stringify(studentData)}; path=/`;

        // Redirect to the retrieve.html page
        window.location.href = 'retrieve.html';
    }
});

// Function to retrieve data from cookie
function retrieveData() {
    const mobile = document.getElementById('retrieveMobile').value;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'studentData') {
            const studentData = JSON.parse(decodeURIComponent(value));
            if (studentData.mobile === mobile) {
                alert(JSON.stringify(studentData, null, 2));
                return;
            }
        }
    }
    alert('No data found for this mobile number.');
}
