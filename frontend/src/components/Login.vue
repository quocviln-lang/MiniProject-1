<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <h2>🔑 Đăng nhập</h2>
      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="📧 Email"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="🔒 Mật khẩu"
          required
        />
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <button type="submit">🚀 Đăng nhập</button>
      </form>

      <div class="links">
        <router-link to="/register">📝 Đăng ký</router-link>
        <router-link to="/forgot-password">❓ Quên mật khẩu?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        alert(res.data.message || "Đăng nhập thành công");
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Kiểm tra role và điều hướng
    if (res.data.user.role === "admin") {
      this.$router.push("/admin").then(() => {
        window.location.reload();
      });
    } else {
      this.$router.push("/ad").then(() => {
        window.location.reload();
      });
    }
  } catch (err) {
        this.errorMsg = err.response?.data?.error || "❌ Đăng nhập thất bại";
      }
    },
  },
};
</script>

<style scoped>
/* 🌈 Background gradient full screen */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  animation: bg-gradient 6s infinite alternate;
}

@keyframes bg-gradient {
  0% { background: linear-gradient(135deg, #667eea, #764ba2); }
  100% { background: linear-gradient(135deg, #43cea2, #185a9d); }
}

/* 📦 Container form */
.auth-container {
  max-width: 400px;
  width: 100%;
  padding: 35px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  text-align: center;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.auth-container h2 {
  margin-bottom: 24px;
  color: #ff6600;
  font-size: 24px;
  font-weight: 700;
}

/* Form */
.auth-container form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-container input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
}
.auth-container input:focus {
  border-color: #667eea;
  box-shadow: 0 0 8px rgba(102,126,234,0.6);
}

/* Nút đăng nhập */
.auth-container button {
  background: linear-gradient(135deg, #ff6600, #ff9966);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.3s;
}
.auth-container button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255,102,0,0.4);
}

/* Error */
.error {
  color: red;
  font-size: 14px;
  margin-top: -5px;
  animation: shake 0.3s ease;
}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}

/* Links */
.links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.links a {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}
.links a:hover {
  color: #ff6600;
  text-decoration: underline;
}
</style>
