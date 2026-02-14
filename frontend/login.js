const loginBtn = document.getElementById("loginBtn");
const forgotBtn = document.getElementById("forgotBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    errorMsg.textContent = "Please enter email and password";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.error || "Login failed";
    } else {
      errorMsg.textContent = "";
      alert("Login successful! Welcome " + data.user.name);
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    }

  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Server error. Try again later.";
  }
});

// Forgot Password
forgotBtn.addEventListener("click", async () => {
  const email = prompt("Enter your registered email:");
  if (!email) return;

  const newPassword = prompt("Enter new password:");
  if (!newPassword) return;

  try {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error updating password");
    } else {
      alert("Password updated successfully! You can now login.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Try again later.");
  }
});
