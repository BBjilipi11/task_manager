const token = localStorage.getItem("token");
if (token) {
  window.location.href = "dashboard.html";
}

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const switchToRegister = document.querySelector(".switch-to-register");
const switchToLogin = document.querySelector(".switch-to-login");
const loginAlert = document.querySelector(".login-alert");
const registerAlert = document.querySelector(".register-alert");

switchToRegister.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  clearAlerts();
});

switchToLogin.addEventListener("click", () => {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  clearAlerts();
});

function clearAlerts() {
  loginAlert.style.display = "none";
  registerAlert.style.display = "none";
  loginAlert.classList.remove("text-success", "text-danger");
  registerAlert.classList.remove("text-success", "text-danger");
}

function showAlert(alertElement, message, isSuccess = false) {
  alertElement.style.display = "block";
  alertElement.textContent = message;
  alertElement.classList.remove("text-success", "text-danger");
  alertElement.classList.add(isSuccess ? "text-success" : "text-danger");
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAlerts();

  const formData = new FormData(loginForm);
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post("/api/v1/auth/login", loginData);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    showAlert(loginAlert, "Login successful! Redirecting...", true);

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    showAlert(loginAlert, message);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAlerts();

  const formData = new FormData(registerForm);
  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post("/api/v1/auth/register", registerData);

    showAlert(registerAlert, "Registration successful! Please login.", true);

    setTimeout(() => {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
      clearAlerts();
    }, 2000);
  } catch (error) {
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    showAlert(registerAlert, message);
  }
});
