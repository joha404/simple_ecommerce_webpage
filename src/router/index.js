import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomePage.vue";
import AboutView from "../views/AboutPage.vue";
import SignUp from "../views/SignUpPage.vue";
import SignIn from "../views/SignInPage.vue";
import categoryAdd from "../views/catagory/AddCatagory.vue";
import editCategory from "../views/catagory/EditCategory.vue";
import category from "../views/catagory/CategoryPage.vue";
import admin from "../views/catagory/AdminPage.vue";
import product from "../views/product/ProductPage.vue";
import addProduct from "../views/product/AddProduct.vue";
import EditProduct from "../views/product/EditProduct.vue";
import ShowProduct from "../views/product/ShowDetails.vue";
import ListProduct from "../views/product/ListProduct.vue";
import Wishlist from "../views/product/WishlistPage.vue";
import cart from "../views/CartDetails.vue";
import api from "../components/category/ApiCalled.vue";

const routes = [
  { path: "/", component: HomeView, name: "Home" },
  { path: "/about", component: AboutView },
  { path: "/api", component: api },
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
  { path: "/admin/category/add", component: categoryAdd },
  { path: "/admin/category", component: category, name: "Category" },
  { path: "/admin", component: admin },
  { path: "/admin/product", component: product, name: "AdminProduct" },
  { path: "/admin/product/new", component: addProduct },
  { path: "/admin/product/:id", component: EditProduct, name: "EditProduct" },
  { path: "/category/show/:id", component: ListProduct, name: "ListProduct" },
  { path: "/wishlist", component: Wishlist, name: "Wishlist" },
  { path: "/cart", component: cart, name: "Cart" },
  {
    path: "/product/show/:id",
    component: ShowProduct,
    name: "ShowProductPage",
  },
  {
    path: "/admin/category/:id",
    component: editCategory,
    name: "EditCategory",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
