<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-5">
        <h3>Edit Category</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <form v-if="category">
          <div class="form-group m-3">
            <label>Category Name</label>
            <input
              type="text"
              class="form-control"
              v-model="category.categoryName"
              required
            />
          </div>
          <div class="form-group m-3">
            <label>Description</label>
            <input
              type="text"
              class="form-control"
              v-model="category.description"
              required
            />
          </div>
          <div class="form-group m-3">
            <label>ImageURL</label>
            <input
              type="text"
              class="form-control"
              v-model="category.imageUrl"
              required
            />
            <button
              type="button"
              class="btn btn-primary mt-3"
              @click="editCategoryBtn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      category: null,
      id: null,
    };
  },
  props: ["baseURL", "categories"],
  methods: {
    async editCategoryBtn() {
      delete this.category["products"];
      await axios
        .post(`${this.baseURL}category/update/${this.id}`, this.category)
        .then((res) => {
          swal({
            text: "Category updated successfully",
            icon: "success",
          }).then(() => {
            this.$router.push({ name: "Category" });
          });
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.category = this.categories.find((category) => category.id == this.id);
  },
};
</script>

<style></style>
