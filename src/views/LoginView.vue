<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { useNotification } from "naive-ui";

const store = useStore();
const router = useRouter();
const notification = useNotification();

const username = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {
    await store.dispatch("auth/login", {
      username: username.value,
      password: password.value,
    });
    router.push("/"); // Redirect to home after successful login
  } catch (err) {
    error.value = "Invalid username or password";
  }
};

// Show notification after 5 seconds
let timeoutId: any;

onMounted(() => {
  timeoutId = setTimeout(() => {
    notification.create({
      title: "Still there?",
      content: "Username: emilys, Password: emilyspass  ",
      //duration: 5000,
    });
  }, 5000);
});

//Clear the timeout when the component is unmounted
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-header">
        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>
      </div>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="input-icon"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="input-icon"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <button type="submit" class="login-button">
          <span>Sign In</span>
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: "Arial", sans-serif;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  animation: fadeIn 0.6s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.login-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #a0aec0;
  transition: color 0.3s ease;
}

input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

input:focus + .input-icon {
  color: #667eea;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
