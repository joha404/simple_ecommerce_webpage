<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-4">
        <h3>Wishlist</h3>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 py-3"
        v-for="product in products"
        :key="product.id"
      >
        <product-box :product="product"></product-box>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductBox from "../../components/product/ProductBox.vue";

export default {
  components: { ProductBox },

  props: ["baseURL"],

  data() {
    return {
      token: null,
      products: [], // Initialize products array
    };
  },

  methods: {
    fetchWishlist() {
      if (!this.token) {
        console.error("Token not found");
        return;
      }

      axios
        .get(`${this.baseURL}/wishlist/${this.token}`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.error("Error fetching wishlist:", err);
        });
    },
  },

  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.fetchWishlist();
    } else {
      console.error("No token found in localStorage");
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
