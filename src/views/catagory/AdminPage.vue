<template>
  <div class="adminPanel">
    <router-link to="/admin/category">
      <button class="btn btn-primary btn-lg">
        Admin Category
      </button></router-link
    >
  </div>
  <div class="adminPanel">
    <router-link to="/admin/product">
      <button class="btn btn-primary btn-lg">
        Admin products
      </button></router-link
    >
  </div>
  <div class="adminPanel">
    <button class="btn btn-primary btn-lg">Admin Producs</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.adminPanel {
  display: flex;
  justify-content: center;
  padding: 50px;
}
</style>
