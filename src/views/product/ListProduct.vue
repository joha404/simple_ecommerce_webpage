<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3>{{ category.categoryName }}</h3>
        <h3>{{ msg }}</h3>
      </div>
    </div>
    <div class="row">
      <div
        v-for="product in category.products"
        :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3"
      >
        <product-box :product="product"></product-box>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "../../components/product/ProductBox.vue";
export default {
  components: { ProductBox },
  data() {
    return {
      id: null,
      category: { products: [] },
      msg: "",
    };
  },
  props: ["categories"],
  mounted() {
    this.id = this.$route.params.id;
    this.category = this.categories.find(
      (category) => category.id == this.id
    ) || { products: [] };

    if (this.category.products.length == 0) {
      this.msg = "product not Available";
    } else if (this.category.products.length == 1) {
      this.msg = "Only 1Product Availabel";
    } else {
      this.msg = this.category.products.length + " Product Available";
    }
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
