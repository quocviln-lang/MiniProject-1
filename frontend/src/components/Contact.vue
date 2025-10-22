<template>
  <div class="contact-page">
    <!-- Banner -->
    <div class="contact-hero">
      <h1>📞 Liên hệ với chúng tôi</h1>
      <p>Kết nối nhanh chóng để được hỗ trợ 24/7</p>
    </div>

    <!-- Thông tin team -->
    <section class="team-section">
      <h2>👨‍💻 Host</h2>
      <div class="team-grid">
        <div v-for="(member, i) in members" :key="i" class="team-card">
          <img :src="member.avatar" :alt="member.name" />
          <h3>{{ member.name }}</h3>
          <p class="role">{{ member.role }}</p>
          <p class="email">📧 {{ member.email }}</p>
          <p class="phone">📱 {{ member.phone }}</p>
          <div class="socials">
            <a :href="member.facebook" target="_blank">🌐 Facebook</a>
            <a :href="member.github" target="_blank">💻 GitHub</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Form liên hệ -->
    <section class="form-section">
      <h2>✍️ Gửi tin nhắn cho chúng tôi</h2>
      <form @submit.prevent="submitForm">
        <input
          type="text"
          placeholder="Họ và tên"
          v-model="form.name"
          required
        />
        <input
          type="email"
          placeholder="Email của bạn"
          v-model="form.email"
          required
        />
        <textarea
          placeholder="Nội dung tin nhắn"
          v-model="form.message"
          required
        ></textarea>
        <button type="submit">Gửi ngay 🚀</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      members: [
        {
          name: "Nguyễn Văn Quốc Vĩ",
          role: "Frontend Developer",
          email: "vana@example.com",
          phone: "0123 456 789",
          avatar: "https://i.pravatar.cc/200?img=11",
          facebook: "https://facebook.com",
          github: "https://github.com",
        },
        {
          name: "Nguyễn Quốc Tuấn",
          role: "Backend Developer",
          email: "vanb@example.com",
          phone: "0987 654 321",
          avatar: "https://i.pravatar.cc/200?img=22",
          facebook: "https://facebook.com",
          github: "https://github.com",
        },
      ],
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    async submitForm() {
      if (!this.form.name || !this.form.email || !this.form.message) {
        alert("Vui lòng nhập đầy đủ thông tin trước khi gửi!");
        return;
      }

      try {
        console.log("📨 Đang gửi dữ liệu:", this.form);

        const res = await fetch("http://localhost:5000/api/feedbacks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });

        console.log("📡 Phản hồi server:", res.status, res.statusText);

        if (res.ok) {
          alert(
            `✅ Cảm ơn ${this.form.name}, chúng tôi sẽ phản hồi qua email: ${this.form.email}`
          );
          this.form = { name: "", email: "", message: "" };
        } else {
          const errText = await res.text();
          console.error("❌ Phản hồi lỗi:", errText);
          alert("Đã xảy ra lỗi khi gửi tin nhắn! (Xem console để biết chi tiết)");
        }
      } catch (err) {
        console.error("🚫 Lỗi kết nối máy chủ:", err);
        alert("Không thể kết nối tới máy chủ. Vui lòng kiểm tra backend!");
      }
    },
  },
};
</script>

<style scoped>
.contact-page {
  padding: 30px;
  max-width: 1200px;
  margin: auto;
}

.contact-hero {
  text-align: center;
  margin-bottom: 40px;
}
.contact-hero h1 {
  font-size: 2.5rem;
  color: #ff6600;
}
.contact-hero p {
  color: #555;
}

.team-section {
  margin-bottom: 50px;
}
.team-section h2 {
  text-align: center;
  margin-bottom: 20px;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}
.team-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s;
}
.team-card:hover {
  transform: translateY(-5px);
}
.team-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
}
.role {
  font-style: italic;
  color: #777;
}
.email,
.phone {
  margin: 5px 0;
}
.socials {
  margin-top: 10px;
}
.socials a {
  margin: 0 8px;
  text-decoration: none;
  color: #ff6600;
  font-weight: bold;
}

.form-section {
  margin-bottom: 50px;
  text-align: center;
}
.form-section form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  gap: 15px;
}
.form-section input,
.form-section textarea {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.form-section button {
  padding: 12px;
  background: #ff6600;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}
.form-section button:hover {
  background: #e65c00;
}
</style>
