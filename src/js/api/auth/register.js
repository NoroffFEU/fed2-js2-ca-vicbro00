import { API_KEY } from "../constants.js";
import { JWT_TOKEN } from "../constants.js";

function registerUser() {
    const userData = {
        username: document.getElementById("username").value.trim,
        email: document.getElementById("email").value.trim,
        password: document.getElementById("password").value.trim
    };

    fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT_TOKEN}`,
            "X-Noroff-API-Key": API_KEY
    },
    body: JSON.stringify(userData)
    })
    if (!userData.username || !userData.email || !userData.password) {
        alert("Please fill in all required fields (Name, Email, and Password).");
        return;
    }
}

document.getElementById("registerButton").addEventListener("click", registerUser);