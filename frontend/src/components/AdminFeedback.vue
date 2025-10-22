<template>
  <div class="admin-feedback">
    <AdminSideBar active="feedback" />

    <div class="content">
      <div class="header">
        <h2>💬 Phản hồi từ khách hàng</h2>
        <p>Danh sách tin nhắn được gửi qua trang Liên hệ</p>
      </div>

      <div class="table-container">
        <table class="feedback-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Nội dung</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fb, index) in feedbacks" :key="fb._id">
              <td>{{ index + 1 }}</td>
              <td>{{ fb.name }}</td>
              <td>{{ fb.email }}</td>
              <td>{{ fb.message }}</td>
              <td>{{ formatDate(fb.createdAt) }}</td>
            </tr>
            <tr v-if="feedbacks.length === 0">
              <td colspan="5" class="no-data">Không có phản hồi nào</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "../components/AdminSideBar.vue";

export default {
  name: "AdminFeedback",
  components: { AdminSideBar },
  data() {
    return { feedbacks: [] };
  },
  mounted() {
    this.fetchFeedbacks();
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const res = await fetch("http://localhost:5000/api/feedbacks");
        const data = await res.json();
        this.feedbacks = data;
      } catch (err) {
        console.error("❌ Lỗi lấy feedback:", err);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString("vi-VN");
    },
  },
};
</script>

<style scoped>
.admin-feedback {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
  background-color: #f8fafc;
}

.content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.header {
  margin-bottom: 25px;
  background: linear-gradient(135deg, #ff6600, #ffb347);
  color: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.15);
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  overflow: hidden;
}

.feedback-table {
  width: 100%;
  border-collapse: collapse;
}

.feedback-table th {
  background-color: #ff6600;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 14px 16px;
  text-align: left;
}

.feedback-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.95rem;
}

.feedback-table tr:hover {
  background-color: #fff6f0;
  transition: 0.2s ease;
}

.no-data {
  text-align: center;
  padding: 30px;
  color: #888;
  font-style: italic;
}
</style>
