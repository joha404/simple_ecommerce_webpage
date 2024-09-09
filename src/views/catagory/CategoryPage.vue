<template>
  <div class="container">
    <div class="row">
      <div class="text-center">
        <h3 class="pt-5">Our Categories</h3>
        <router-link to="/admin/category/add" class="addCategoryBtn">
          <button class="btn btn-primary">Add Categori</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <category-box :categories="categories">{{ categories }}</category-box>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryBox from "../../components/category/CategoryBox.vue";

export default {
  name: "Category",
  props: ["categories"],
  components: { CategoryBox },
  data() {
    return {
      baseURL: "https://limitless-lake-55070.herokuapp.com",
    };
  },
  methods: {},
  mounted() {
    // this.fetchCategories();
  },
};
</script>

<style>
.addCategoryBtn {
  float: right;
  padding: 30px;
}
</style>
