function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
  }

  fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
  })
  .then(response => response.json().then(data => {
      if (!response.ok) throw new Error(data.message || "Login failed");
      return data;
  }))
  .then(data => {
      const accessToken = data.data.accessToken;
      localStorage.setItem("jwt", accessToken);
      localStorage.setItem("email", email.toLowerCase());

      alert("You are now signed in!");
      window.location.href = "#";
  })
  .catch(error => {
      console.error("Error during login:", error);
      alert(error.message || "An error occurred. Please try again.");
  });
}