<template>
  <div class="container">
    <div class="row">
      <div class="text-center">
        <h3 class="pt-5">Add Category</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group mt-3">
            <label> Category Name</label>
            <input type="text" class="form-control" v-model="categoryName" />
          </div>
          <div class="form-group mt-3">
            <label> Description</label>
            <textarea type="text" class="form-control" v-model="description" />
          </div>
          <div class="form-group mt-3">
            <label> Category Image</label>
            <input type="text" class="form-control" v-model="imageUrl" />
          </div>
          <button
            type="button"
            class="btn btn-primary mt-3"
            @click="addCategory"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sweetalert from "sweetalert";
import CategoryBox from "../../components/category/CategoryBox.vue";
export default {
  components: { CategoryBox },
  data() {
    return {
      categoryName: "",
      description: "",
      imageUrl: "",
    };
  },
  methods: {
    addCategory() {
      const newCategory = {
        categoryName: this.categoryName,
        description: this.description,
        imageUrl: this.imageUrl,
      };
      const baseURL = "https://limitless-lake-55070.herokuapp.com";

      axios({
        method: "post",
        url: `${baseURL}/category/create`,
        data: JSON.stringify(newCategory),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          sweetalert({
            text: "catagory added successfully",
            icon: "success",
          });
          this.$router.push({ name: "Category" });
        })
        .catch((err) => {
          console.error(err.response ? err.response.data : err.message);
          sweetalert({
            text: "Please enter another Category",
            icon: "error",
          });
        });
    },
    beforeUnmount() {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  },
};
</script>

<style></style>
