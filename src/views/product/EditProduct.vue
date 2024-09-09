<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-5">Edit Product</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <form v-if="product">
          <div class="form-group m-3">
            <label>Category</label>
            <select class="form-control" v-model="product.categoryId" required>
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
              >
                {{ category.categoryName }}
              </option>
            </select>
          </div>
          <div class="form-group m-3">
            <label>Name</label>
            <input class="form-control" type="text" v-model="product.name" />
          </div>
          <div class="form-group m-3">
            <label>Description</label>
            <input
              class="form-control"
              type="text"
              v-model="product.description"
            />
          </div>
          <div class="form-group m-3">
            <label>Image URL</label>
            <input
              class="form-control"
              type="text"
              v-model="product.imageURL"
            />
          </div>
          <div class="form-group m-3">
            <label>Price</label>
            <input class="form-control" type="number" v-model="product.price" />
          </div>
          <button
            type="button"
            class="btn btn-primary m-3"
            @click="editProductBtn"
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
import swal from "sweetalert";
export default {
  data() {
    return {
      product: null,
      id: null,
    };
  },
  props: ["baseURL", "categories", "products"],
  mounted() {
    this.id = this.$route.params.id;
    this.product = this.products.find((product) => product.id == this.id);
  },
  methods: {
    async editProductBtn() {
      console.log(this.product);
      await axios
        .post(`${this.baseURL}product/update/${this.id}`, this.product)
        .then((res) => {
          swal({
            text: "product updated successfully",
            icon: "success",
          }).then(() => {
            this.$router.push({ name: "AdminProduct" });
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
