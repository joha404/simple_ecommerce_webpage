<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 d-flex justify-content-between align-items-center mt-3"
      >
        <h4>Our Products</h4>
        <router-link to="/admin/product/new" class="addCategoryBtn">
          <button class="btn btn-primary">Add Categori</button>
        </router-link>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <product-box :product="product"></product-box>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "../../components/product/ProductBox.vue";

export default {
  components: { ProductBox },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  // beforeUnmount() {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 3000);
  // },
};
</script>

<style>
.addNewProduct {
  margin-right: 20px;
}
</style>
