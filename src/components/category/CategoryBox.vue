<template>
  <div class="row">
    <div
      v-for="category in categories"
      :key="category.id"
      class="col-xl-4 col-md-6 col-sm-12 d-flex p-2 categoryBoxClass"
    >
      <div class="card category-box">
        <div class="embed-responsive embed-responsive-16by9">
          <img :src="category.imageUrl" alt="" class="card-img-top" />
        </div>
        <div class="card-body">
          <router-link
            :to="{ name: 'ListProduct', params: { id: category.id } }"
          >
            <h5 class="card-title">{{ category.categoryName }}</h5>
          </router-link>
          <p class="card-text">{{ category.description }}</p>
          <router-link
            :to="{ name: 'EditCategory', params: { id: category.id } }"
            v-show="$route.name == 'Category'"
            ><button class="btn btn-primary">Edit</button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryBox",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  height: 300px;
  border: none;
}
.categoryBoxClass .card {
  width: 100%;
}
</style>
