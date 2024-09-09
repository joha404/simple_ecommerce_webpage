<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img :src="product.imageURL" alt="Product Image" class="card-img-top" />
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'ShowProductPage', params: { id: product.id } }"
      >
        <h5 class="card-title" alt="No Product Name">{{ product.name }}</h5>
      </router-link>
      <p class="card-text">{{ product.description }}....</p>
      <router-link
        :to="{ name: 'EditProduct', params: { id: product.id } }"
        v-show="$route.name == 'AdminProduct'"
        ><button class="btn btn-primary">Edit</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Productox",
  props: ["product"],
};
</script>

<style>
.card-img-top {
  background-size: cover;
  height: 300px;
}
</style>
