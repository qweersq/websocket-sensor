// socket io
const socket = io();

// Get DOM elements
const sensorStatus = document.getElementById('sensor-status');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const popupPasswordInput = document.getElementById('popup-password');
const popupBtn = document.getElementById('popup-btn');

// login DOM
const overlayLogin = document.getElementById('overlay-login');
const popupLogin = document.getElementById('popup-login');
const popupUsernameInputLogin = document.getElementById('popup-username-login');
const popupBranchInputLogin = document.getElementById('popup-branch-login');
const popupBtnLogin = document.getElementById('popup-btn-login');
const personLogin = document.getElementById('person-login');


const { username, branch } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

login();
updateSensorStatus(false);

function login() {
    if (username && branch) {
        overlayLogin.style.display = 'none';
        popupLogin.style.display = 'none';
        personLogin.textContent = `${username} - ${branch}`;
    } else {
        overlayLogin.style.display = 'block';
        popupLogin.style.display = 'block';
    }
}

// Function to update sensor status
function updateSensorStatus(status) {
    if (status) {
        sensorStatus.textContent = 'ON';
        sensorStatus.style.color = 'red';
        // Show pop-up
        overlay.style.display = 'block';
        popup.style.display = 'block';
    } else {
        sensorStatus.textContent = 'OFF';
        sensorStatus.style.color = 'green';
        // Hide pop-up
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }
}

// Event listener for pop-up button
popupBtn.addEventListener('click', function () {
    // Check if password is correct
    const password = popupPasswordInput.value;
    if (password === 'password123') {
        updateSensorStatus(false);
    } else {
        errorMessage.textContent = 'Incorrect password!';
    }
});

// SOCKET IO

socket.emit('joinBranch', { username, branch });



socket.on('message', message => {
    console.log(message);
});