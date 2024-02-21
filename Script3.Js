// JavaScript code for switching content sections
function switchContent(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active-content');
    });
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active-content');
}

// Function to add a notification
function addNotification(binId, message) {
    const notificationsContainer = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.id = 'notification-' + binId;
    notification.innerText = message;
    notificationsContainer.appendChild(notification);
}

// Function to remove a notification
function removeNotification(binId) {
    const notificationToRemove = document.getElementById('notification-' + binId);
    if (notificationToRemove) {
        notificationToRemove.remove();
    }
}

// Initialize Firebase with your Firebase project config
var firebaseConfig = {
    apiKey: "AIzaSyDetCM1MO81c0yAzE-kHWcTdLfJXkUx2II",
    authDomain: "noname-e757f.firebaseapp.com",
    databaseURL: "https://noname-e757f-default-rtdb.firebaseio.com/",
    projectId: "noname-e757f",
};

firebase.initializeApp(firebaseConfig);

// Reference to your Firebase database
var db = firebase.database();

// Listen for changes in real-time data for bin1 and update the webpage
db.ref("binData/bin1").on("value", function (snapshot) {
    var binLevel = snapshot.val();
    var fill = document.querySelector('#bin1 .bin-fill');
    fill.style.height = `${binLevel}%`;
    adjustBinAppearance(binLevel, fill, 'bin1');
});

// Listen for changes in real-time data for bin2 and update the webpage
db.ref("binData/bin2").on("value", function (snapshot) {
    var binLevel = snapshot.val();
    var fill = document.querySelector('#bin2 .bin-fill');
    fill.style.height = `${binLevel}%`;
    adjustBinAppearance(binLevel, fill, 'bin2');
});

// Helper function to adjust the appearance of bins based on the level
function adjustBinAppearance(binLevel, fillElement, binId) {
    // Change bin color to red if the level is above 75%
    if (binLevel >= 75) {
        fillElement.style.backgroundColor = '#f44336'; // Red color
        // Add a notification if it hasn't been notified
        if (!document.getElementById('notification-' + binId)) {
            addNotification(binId, `Recycle Bin ${binId} is ${binLevel}% full. Please empty it.`);
        }
    } else {
        fillElement.style.backgroundColor = '#4caf50'; // Original green color
        // If the level is below 75%, remove the notification
        removeNotification(binId);
    }
}
