<template>
  <div class="sign-in-page">
    <div class="sign-in-card">
      <h1 class="sign-in-title">Вход для администратора</h1>

      <form class="sign-in-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            autocomplete="email"
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Введите пароль"
              autocomplete="current-password"
              :disabled="loading"
            />
            <button
              type="button"
              class="eye-toggle"
              tabindex="-1"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? "Вход..." : "Войти" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { post } from "@/services/api";

export default defineComponent({
  name: "AdminSignInView",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref("");

    const handleSubmit = async () => {
      errorMessage.value = "";
      loading.value = true;

      const result = await post<{ token: string }>("/admin/sign_in", {
        email: email.value,
        password: password.value,
      });

      loading.value = false;

      if (result.ok && result.data) {
        localStorage.setItem("admin_token", result.data.token);
        router.push("/admin/dashboard");
      } else {
        errorMessage.value = "Не верная почта или пароль";
      }
    };

    return {
      email,
      password,
      showPassword,
      loading,
      errorMessage,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.sign-in-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.sign-in-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 40px 36px;
  width: 100%;
  max-width: 400px;
}

.sign-in-title {
  margin: 0 0 32px;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group input:disabled {
  background: #f9fafb;
  cursor: not-allowed;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 44px;
}

.eye-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-toggle:hover {
  color: #374151;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: #4f46e5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #4338ca;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
