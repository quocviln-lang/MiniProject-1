<template>
  <div class="promo-page">
    <!-- Banner chính -->
    <div class="promo-hero">
      <h1>🎉 Khuyến mãi cực HOT</h1>
      <p>Săn deal sốc – Giảm giá khủng – Quà tặng hấp dẫn</p>
    </div>

    <!-- Flash sale -->
    <section class="flash-sale">
      <div class="flash-header">
        <h2>⚡ Flash Sale hôm nay</h2>
        <div class="countdown-box">
          <div class="countdown-label">⏰ Còn lại:</div>
          <div class="countdown-value">{{ countdownText }}</div>
        </div>
      </div>

      <div class="flash-grid">
        <div
          v-for="(item, index) in flashItems"
          :key="index"
          class="flash-card"
        >
          <img :src="item.img" :alt="item.name" />
          <h3>{{ item.name }}</h3>

          <div class="price-row">
            <div class="old-price">{{ item.oldPrice }}</div>
            <div class="new-price">{{ item.newPrice }}</div>
          </div>

          <!-- progress -->
          <div class="progress-wrap">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: progressPercent + '%' }"
                :aria-valuenow="progressPercent"
              ></div>
            </div>
            <div class="progress-text">{{ progressPercent }}% bán</div>
          </div>

          <button class="buy-btn" @click="onBuy(item)">Mua ngay</button>
        </div>
      </div>
    </section>

    <!-- Danh sách khuyến mãi -->
    <section class="promo-list">
      <h2>🎁 Ưu đãi đặc biệt</h2>
      <div class="promo-grid">
        <div v-for="(deal, i) in promoList" :key="i" class="promo-card">
          <img :src="deal.img" :alt="deal.title" />
          <div class="deal-text">
            <h3>{{ deal.title }}</h3>
            <p>{{ deal.desc }}</p>
            <a href="#" @click.prevent="viewDeal(deal.route)">Xem chi tiết →</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Promotions",
  data() {
    return {
      // Thời lượng flash sale (ms) — giữ 2 giờ nếu bạn muốn flash sale chỉ kéo 2h.
      SALE_DURATION_MS: 2 * 60 * 60 * 1000,

      saleEndAt: null,
      countdownText: "",
      progressPercent: 0,
      intervalId: null,

      flashItems: [
        {
          name: "iPhone 15 Pro Max",
          oldPrice: "34.990.000₫",
          newPrice: "29.990.000₫",
          img:
            "https://taoxinh.vn/wp-content/uploads/2024/11/iphone-15-thuong-vs-iphone-15-plus-128gb-256gb-512gb-mau-den-768x768.jpg",
        },
        {
          name: "Samsung Galaxy S24 Ultra",
          oldPrice: "31.990.000₫",
          newPrice: "26.990.000₫",
          img:
            "https://cdn2.cellphones.com.vn/358x/media/catalog/product/g/a/galaxy-s24-ultra-vang_1_3.png",
        },
        {
          name: "Xiaomi 15 Ultra",
          oldPrice: "29.990.000₫",
          newPrice: "22.990.000₫",
          img:
            "https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/i/dien-thoai-xiaomi-15-ultra_17_.png",
        },
      ],

      promoList: [
        {
          title: "Mua iPhone tặng AirPods",
          desc:
            "Mua các model iPhone 14/15 series, nhận ngay AirPods 2 trị giá 3 triệu đồng.",
          img:
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQb2CsQQenNTIqICE0k-Is9JezjFutzFiVeRLSnJRay7fLTiXkymxO3CPMA1iCn3ja7OXTjBwOyXpb3LgU3AGEnEURvb_OQXnMn__tqmB-gejfQc2r1W6bVcgcM0VQeCZqRfqEnQdk&usqp=CAc",
          route: "/airpodspromo",
        },
        {
          title: "Giảm 50% phụ kiện",
          desc: "Ốp lưng, tai nghe, sạc nhanh đồng loạt giảm sốc.",
          img: "../assets/full/giamgia.jpg",
          route: "/accessoriespromo",
        },
        {
          title: "Trade-in đổi cũ lấy mới",
          desc:
            "Thu cũ lên đời — giá trị đổi máy cao, thủ tục nhanh trong 5 phút.",
          img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREypnQ7fpoAcXrlkux--Vsj1tFlHTgtOUaHQ&s",
          route: "/tradeinpromo",
        },
        {
          title: "Student Deal",
          desc:
            "Ưu đãi riêng cho HSSV: mã giảm thêm 5% + trả góp 0% cho sinh viên.",
          img: "",
          route: "/studentdealpromo",
        },
      ],
    };
  },
  methods: {
    // format ms -> "Xd HH:MM:SS" (nếu có days) hoặc "HH:MM:SS"
    formatRemaining(ms) {
      if (ms <= 0) return "00:00:00";
      const totalSec = Math.floor(ms / 1000);
      const days = Math.floor(totalSec / 86400);
      const hours = Math.floor((totalSec % 86400) / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;

      const hh = String(hours).padStart(2, "0");
      const mm = String(mins).padStart(2, "0");
      const ss = String(secs).padStart(2, "0");

      if (days > 0) return `${days}d ${hh}:${mm}:${ss}`;
      return `${hh}:${mm}:${ss}`;
    },

    updateCountdown() {
      const now = Date.now();
      const startAt = this.saleEndAt - this.SALE_DURATION_MS;
      // Nếu sale chưa bắt đầu: hiển thị thời gian tới khi bắt đầu
      if (now < startAt) {
        const untilStart = startAt - now;
        this.countdownText =  this.formatRemaining(untilStart);
        this.progressPercent = 0;
        return;
      }

      // Sale đã bắt đầu -> hiển thị thời gian còn lại tới saleEndAt
      const remaining = this.saleEndAt - now;
      if (remaining <= 0) {
        // đã kết thúc
        this.countdownText = "Kết thúc";
        this.progressPercent = 100;
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        return;
      }

      // cập nhật text và progress
      this.countdownText = this.formatRemaining(remaining);

      const elapsed = now - startAt;
      let percent = Math.round((elapsed / this.SALE_DURATION_MS) * 100);
      percent = Math.max(0, Math.min(100, percent));
      this.progressPercent = percent;
    },

    startCountdown() {
      this.saleEndAt = new Date(2025, 9, 20, 12, 0, 0).getTime();

      // Run lần đầu rồi bắt interval
      this.updateCountdown();
      this.intervalId = setInterval(this.updateCountdown, 1000);
    },

    onBuy(item) {
      alert(`Đã hết hàng: ${item.name}.`);
    },

    viewDeal(route) {
      // đi tới route tương ứng (đảm bảo router đã cấu hình)
      this.$router.push(route);
    },
  },

  mounted() {
    this.startCountdown();
  },

  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.promo-page {
  font-family: "Segoe UI", sans-serif;
  color: #333;
  padding-bottom: 60px;
}

/* Hero */
.promo-hero {
  background: linear-gradient(135deg, #ff6600, #ff9900);
  color: white;
  text-align: center;
  padding: 60px 20px;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.promo-hero h1 {
  font-size: 40px;
  margin-bottom: 8px;
}
.promo-hero p { margin: 0; font-weight: 600; }

/* Flash sale */
.flash-sale {
  max-width: 1100px;
  margin: 30px auto;
  padding: 20px;
}
.flash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.flash-header h2 {
  color: #ff6600;
  margin: 0;
}
.countdown-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.countdown-label { font-weight: 600; color: #333; }
.countdown-value {
  color: #e60000;
  font-weight: 700;
  font-size: 18px;
}

/* grid of flash cards */
.flash-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.flash-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  padding: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.flash-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
.flash-card h3 {
  margin: 0;
  font-size: 16px;
}
.price-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: baseline;
}
.old-price {
  text-decoration: line-through;
  color: #888;
  font-size: 14px;
}
.new-price {
  font-size: 18px;
  font-weight: 800;
  color: #e60000;
}

/* progress */
.progress-wrap {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 6px;
}
.progress-bar {
  flex: 1;
  height: 10px;
  background: #f1f1f1;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,#ff6600,#ff8533);
  width: 0%;
  transition: width 0.6s ease;
}
.progress-text {
  min-width: 56px;
  text-align: right;
  font-size: 13px;
  color: #555;
}

/* buy button */
.buy-btn {
  margin-top: auto;
  padding: 10px 14px;
  border: none;
  background: #ff6600;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
}
.buy-btn:hover { background: #e65c00; }

/* Promo list below */
.promo-list {
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px 40px;
}
.promo-list h2 {
  color: #ff6600;
  margin-bottom: 18px;
}
.promo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.promo-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.promo-card img {
  width: 40%;
  object-fit: cover;
}
.deal-text {
  padding: 14px;
}
.deal-text h3 {
  margin: 0 0 8px;
  font-size: 18px;
}
.deal-text p {
  margin: 0 0 12px;
  color: #444;
}
.deal-text a {
  color: #ff6600;
  font-weight: 600;
  text-decoration: none;
}

</style>
