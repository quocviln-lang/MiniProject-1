<template>
  <nav class="admin-sidebar">
    <router-link
      to="/admin"
      class="sidebar-item"
      :class="{ active: isActive('/admin') }"
    >
      📦 Quản lý sản phẩm
    </router-link>

    <router-link
      to="/admin2"
      class="sidebar-item"
      :class="{ active: isActive('/admin2') }"
    >
      💰 Doanh thu
    </router-link>

    <router-link
      to="/admin/potential-customers"
      class="sidebar-item"
      :class="{ active: active === 'potential-customers' }"
    >
      👥 Khách hàng tiềm năng
    </router-link>

    <router-link
      to="/admin/top-products"
      class="sidebar-item"
      :class="{ active: active === 'top-products' }"
    >
      📊 Sản phẩm bán chạy
    </router-link>

    <router-link
  to="/admin/feedbacks"
  class="sidebar-item"
  :class="{ active: active === 'feedback' }"
>
  💬 Phản hồi khách hàng
</router-link>

    <!-- Sau này có thể thêm mục khác ở đây -->
  </nav>
</template>

<script>
export default {
  name: "AdminSideBar",
  props: {
    active: String,
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
.admin-sidebar {
  width: 220px;
  padding: 25px 15px;
  background-color: #2c3e50;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.sidebar-item {
  color: #ecf0f1;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-item:hover {
  background-color: #34495e;
  transform: translateX(3px);
}

.sidebar-item.active {
  background: linear-gradient(135deg, #2980b9, #6dd5fa);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}
</style>
