function registerUser() {
    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        bio: document.getElementById("bio").value,
        bannerUrl: document.getElementById("bannerUrl").value,
        bannerAlt: document.getElementById("bannerAlt").value
    };

    if (!userData.name || !userData.email || !userData.password) {
        message.textContent = "Please fill in all required fields.";
        return;
    }

    fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(response => response.json().then(data => {
        if (!response.ok) throw new Error(data.errors?.[0]?.message || "Registration failed");
        return data;
    }))
    .then(() => {
        alert("Registration successful! You can now log in.");
        window.location.href = "/";
    })
    .catch(error => {
        console.error("Error during registration:", error);
        message.textContent = error.message || "An error occurred. Please try again.";
    });
}