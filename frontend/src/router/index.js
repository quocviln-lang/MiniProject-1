import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import PhoneList from "../components/PhoneList.vue";
import Promotions from "../components/Promotions.vue";
import News from "../components/News.vue";
import Contact from "../components/Contact.vue";
import Policy from "../components/Policy.vue";
import PhoneDetail from "../components/PhoneDetail.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import ForgotPassword from "../components/Forgotpassword.vue";
import Profile from "../components/Profile.vue";
import Cart from "../components/Cart.vue";
import PaymentManager from "../components/PaymentManager.vue";
import PurchaseDetail from "../components/PurchaseDetail.vue";
import PurchaseStatus from "../components/PurchaseStatus.vue";
import AirPodsPromo from "../components/AirPodsPromo.vue";
import AccessoriesPromo from "../components/AccessoriesPromo.vue";
import StudentDealPromo from "../components/StudentDealPromo.vue";
import TradeInPromo from "../components/TradeInPromo.vue";
import AddressManager from "../components/AddressManager.vue";
import Admin from "../components/Admin.vue";
import Admin2 from "../components/Admin2.vue";
import AddPin from "../components/AddPin.vue";
import Specs from "../components/Specs.vue";
import Review from "../components/Review.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/phones", name: "Phones", component: PhoneList },
  { path: "/phones/:id", name: "PhoneDetail", component: PhoneDetail, props: true },

  { path: "/promotions", name: "Promotions", component: Promotions },
  { path: "/promotions/september", name: "PromoSeptember", component: Promotions },
  { path: "/promotions/back-to-school", name: "PromoBackToSchool", component: Promotions },
  { path: "/promotions/students", name: "PromoStudents", component: Promotions },

  { path: "/news", name: "News", component: News },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/policy", name: "Policy", component: Policy },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  { path: "/forgot-password", name: "ForgotPassword", component: ForgotPassword },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/payment", name: "Payment", component: PaymentManager },

  // ✅ Thêm route tĩnh để đọc giỏ hàng từ localStorage
  { path: "/purchase-detail", name: "PurchaseDetailLocal", component: PurchaseDetail },

  // ✅ Route động khi đã có purchaseId (từ DB)
  { path: "/purchases/:purchaseId", name: "PurchaseDetail", component: PurchaseDetail, props: true },
  { path: "/purchases/:purchaseId/status", name: "PurchaseStatus", component: PurchaseStatus, props: true },

  { path: "/airpodspromo", name: "AirPodsPromo", component: AirPodsPromo },
  { path: "/accessoriespromo", name: "AccessoriesPromo", component: AccessoriesPromo },
  { path: "/studentdealpromo", name: "StudentDealPromo", component: StudentDealPromo },
  { path: "/tradeInpromo", name: "TradeInPromo", component: TradeInPromo },
  { path: "/addressmanager", name: "AddressManager", component: AddressManager },
  { path: "/admin", name: "Admin", component: Admin },
  { path: "/admin2", name: "Admin2", component: Admin2 },
  { path: "/addpin", name: "AddPin", component: AddPin },
  { path: "/specs", name: "Specs", component: Specs },
  { path: "/review", name: "Review", component: Review },
  { path: "/admin/potential-customers",name: "AdminPotentialCustomers",component: () => import("../components/AdminPotentialCustomers.vue"),},
  { path: "/admin/top-products",name: "AdminTopProducts",component: () => import("../components/AdminTopProducts.vue"),},
  { path: "/admin/feedbacks",name: "AdminFeedback",component: () => import("../components/AdminFeedback.vue"),},
  { path: "/ad", name: "AdVideoPage", component: () => import("../components/AdVideoPage.vue"),},


,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
