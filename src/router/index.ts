import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ProductView from "@/views/ProductView.vue";
import CatalogView from "@/views/CatalogView.vue";
import DownloadsView from "@/views/DownloadsView.vue";
import CertificatesView from "@/views/CertificatesView.vue";
import ContactsView from "@/views/ContactsView.vue";
import ProductSlidingDrivesView from "@/views/ProductSlidingDrivesView.vue";
import ProductProffView from "@/views/ProductProffView.vue";
import ProductTelescopicView from "@/views/ProductTelescopicView.vue";
import ProductAccessoriesView from "@/views/ProductAccessoriesView.vue";
import ProductShowView from "@/views/ProductShowView.vue";
import AdminSignInView from "@/views/AdminSignInView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";
import AdminCertificatesView from "@/views/AdminCertificatesView.vue";
import AdminProductsView from "@/views/AdminProductsView.vue";
import AdminVacanciesView from "@/views/AdminVacanciesView.vue";
import VacanciesView from "@/views/VacanciesView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/products", name: "products", component: ProductView },
  { path: "/catalog", name: "catalog", component: CatalogView },
  { path: "/downloads", name: "downloads", component: DownloadsView },
  { path: "/certificates", name: "certificates", component: CertificatesView },
  { path: "/contacts", name: "contacts", component: ContactsView },
  { path: "/vacancies", name: "vacancies", component: VacanciesView },
  { path: "/products/:slug", name: "product-show", component: ProductShowView },
  { path: "/product/sliding-drives", name: "product-sliding-drives", component: ProductSlidingDrivesView },
  { path: "/product/proff", name: "product-proff", component: ProductProffView },
  { path: "/product/telescopic", name: "product-telescopic", component: ProductTelescopicView },
  { path: "/product/accessories", name: "product-accessories", component: ProductAccessoriesView },
  { path: "/admin", redirect: "/admin/dashboard" },
  { path: "/admin/sign_in", name: "admin-sign-in", component: AdminSignInView },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/certificates",
    name: "admin-certificates",
    component: AdminCertificatesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/products",
    name: "admin-products",
    component: AdminProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/vacancies",
    name: "admin-vacancies",
    component: AdminVacanciesView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to: any, _from: any, next: any) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      next({ name: "admin-sign-in" });
      return;
    }
  }
  next();
});

export default router;
