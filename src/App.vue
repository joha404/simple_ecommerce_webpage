<template>
  <navbar-page
    :nameFirst="nameFirst"
    :cartCount="cartCount"
    @resetCartCount="resetCartCount"
  ></navbar-page>

  <div v-if="loading" class="spinner-container">
    <!-- Loading Spinner -->
    <div class="spinner"></div>
  </div>

  <div v-else>
    <router-view
      v-if="categories && products"
      :baseURL="baseURL"
      :categories="categories"
      :products="products"
      @nameFirst="updateNameFirst"
    ></router-view>

    <!-- Footer only appears after loading is done -->
    <footer-page></footer-page>
  </div>
</template>

<script>
import axios from "axios";
import NavbarPage from "./components/NavbarPage.vue";
import FooterPage from "./components/FooterPage.vue";

export default {
  components: { NavbarPage, FooterPage },
  data() {
    return {
      baseURL: "https://limitless-lake-55070.herokuapp.com/",
      products: null,
      categories: null,
      cartCount: 0,
      nameFirst: localStorage.getItem("nameFirst") || "",
      token: null,
      loading: true, // Add loading state
    };
  },
  methods: {
    async fetchData() {
      try {
        const categoriesResponse = await axios.get(this.baseURL + "category/");
        this.categories = categoriesResponse.data;

        const productsResponse = await axios.get(this.baseURL + "product/");
        this.products = productsResponse.data;
      } catch (error) {
        console.log(error);
      }

      if (this.token) {
        const url = `${this.baseURL}cart/?token=${this.token}`;

        axios
          .get(url)
          .then((res) => {
            const result = res.data;
            this.cartCount = result.cartItems.length;
          })
          .catch((error) => {
            console.error("Error fetching cart items:", error);
            swal({
              text: "Failed to load cart items. Please try again later.",
              icon: "error",
            });
          });
      }

      this.loading = false; // Set loading to false after data is fetched
    },
    updateNameFirst(emitData) {
      this.nameFirst = emitData; // Update nameFirst when the event is received
      localStorage.setItem("nameFirst", emitData); // Save nameFirst to localStorage
      console.log("Name First:", emitData);
    },
    resetCartCount() {
      this.cartCount = 0;
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.fetchData();
  },
};
</script>

<style>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
