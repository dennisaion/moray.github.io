/*
  MORAY sign-on page
  ------------------
  AUTH_ENDPOINT is intentionally blank because no authentication backend was
  supplied. Set it to your HTTPS login endpoint when the MORAY licensing /
  account server is ready, e.g. "/api/login".
*/
const AUTH_ENDPOINT = "";

const form = document.getElementById("signin-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const toggle = document.getElementById("password-toggle");
const statusMessage = document.getElementById("status-message");

toggle.addEventListener("click", () => {
  const show = password.type === "password";
  password.type = show ? "text" : "password";
  toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
  toggle.setAttribute("title", show ? "Hide password" : "Show password");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.className = "status-message";

  if (!email.checkValidity()) {
    statusMessage.textContent = "Enter a valid email address.";
    statusMessage.classList.add("error");
    email.focus();
    return;
  }

  if (!password.value) {
    statusMessage.textContent = "Enter your password.";
    statusMessage.classList.add("error");
    password.focus();
    return;
  }

  if (!AUTH_ENDPOINT) {
    statusMessage.textContent = "Sign-in is ready for connection to the MORAY account/licensing server.";
    return;
  }

  try {
    statusMessage.textContent = "Signing in…";
    const response = await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email.value.trim(), password: password.value })
    });

    if (!response.ok) throw new Error("Authentication failed");
    const result = await response.json();

    if (result.redirect) {
      window.location.assign(result.redirect);
      return;
    }

    statusMessage.textContent = "Signed in successfully.";
    password.value = "";
  } catch (error) {
    statusMessage.textContent = "Sign-in failed. Check your credentials and try again.";
    statusMessage.classList.add("error");
  }
});
