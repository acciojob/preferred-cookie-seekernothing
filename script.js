//your JS code here. If required.
// Function to get cookie by name
function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// Function to apply saved preferences
function applyPreferences() {
    let savedFontSize = getCookie("fontsize");
    let savedFontColor = getCookie("fontcolor");

    if (savedFontSize) {
        document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
        document.getElementById("fontsize").value = savedFontSize;
    }

    if (savedFontColor) {
        document.documentElement.style.setProperty("--fontcolor", savedFontColor);
        document.getElementById("fontcolor").value = savedFontColor;
    }
}

// Save preferences when the form is submitted
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    let fontSize = document.getElementById("fontsize").value;
    let fontColor = document.getElementById("fontcolor").value;

    setCookie("fontsize", fontSize, 365); // Save for 1 year
    setCookie("fontcolor", fontColor, 365);

    applyPreferences(); // Apply changes immediately
});

// Apply preferences when the page loads
window.onload = applyPreferences;
