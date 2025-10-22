<template>
  <div class="ad-page">
    <!-- Video quảng cáo -->
    <video
      ref="video"
      class="ad-video"
      autoplay
      controls
      playsinline
      @ended="goHome"
    >
      <source src="/videos/Tạo_Video_Giới_Thiệu_Logo.mp4" type="video/mp4" />
      Trình duyệt của bạn không hỗ trợ video.
    </video>



    <!-- Nút bỏ qua -->
    <button class="skip-btn" @click="goHome">Bỏ qua ✖</button>
  </div>
</template>

<script>
export default {
  name: "AdVideoPage",
  methods: {
    goHome() {
      this.$router.push("/"); // Trở lại trang chủ
    },
  },
};
</script>

<style scoped>
.ad-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: black;
  overflow: hidden;
}

/* Video full màn hình */
.ad-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Overlay logo + tagline */
.ad-overlay {
  position: absolute;
  top: 20%;
  width: 100%;
  text-align: center;
  color: white;
  animation: fadeIn 2s ease-out forwards;
}

.logo-text {
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 20px #00ffff;
}

.tagline {
  font-size: 1.3rem;
  color: #cceeff;
  margin-top: 10px;
}

/* Nút "bỏ qua" */
.skip-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 18px;
  font-size: 16px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: 0.3s;
}
.skip-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
