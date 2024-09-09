<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover">
      <div class="container">
        <div class="innerDiv">
          <h2 id="homeHeading">Start Shopping</h2>
          <div class="headerBtn">
            <a href="start-shopping" id="hearderBtnId" class="btn btn-primary"
              >Start</a
            >
          </div>
          <p class="mt-3" id="homeparagraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            commodi rerum hic exercitationem natus asperiores explicabo beatae,
            fuga, perspiciatis maxime illo at, quisquam itaque modi velit eaque
            in deleniti. Animi?
          </p>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="container">
    <div class="row productsItem">
      <div class="text-left">
        <h2 class="pt-3">Top Products</h2>
      </div>
    </div>
    <div class="row mt-3">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="col-sm-12 col-md-6 col-lg-4 py-3"
      >
        <product-box :product="product"></product-box>
      </div>
    </div>
  </div>
</template>

<script>
// import CategoryBox from "../components/category/CategoryBox.vue";
import ProductBox from "../components/product/ProductBox.vue";

export default {
  name: "Home",
  components: { ProductBox },
  props: ["baseURL", "products", "categories"],
  computed: {
    // displayedCategories() {
    //   return this.categories.slice(0, Math.min(6, this.categories.length));
    // },
    displayedProducts() {
      return this.products.slice(0, Math.min(20, this.products.length));
    },
  },
  mounted() {
    console.log("Products received:", this.products); // Debugging output
  },
};
</script>

<style scoped>
.page-holder {
  min-height: 100vh;
}
#background-div {
  background: url("../assets/banner.jpg");

  background-repeat: no-repeat;
  background-size: cover;
}
.innerDiv {
  position: absolute;
  top: 40%;
  width: 40%;
}
.innerDiv p {
  color: #b1b1b1;
  font-size: 20px;
}
#homeHeading {
  font-size: 72px;
  font-weight: 600 !important;
  color: #262626;
}
#productsHome {
  width: 100%;
}
#homeparagraph {
  font-size: 20px;
  font-weight: 400px;
  color: #e60764;
}
@media screen and (max-width: 768px) {
  #homeHeading {
    font-size: 36px !important;
    font-weight: 500 !important;
  }
  .innerDiv {
    position: absolute;
    margin-top: 0%;
    width: auto;
    padding: 5px;
  }
  #background-div {
    height: 320px !important;
  }
  .headerBtn {
    margin-top: 30px;
    width: 60%;
  }
  #hearderBtnId {
    width: 60%;
  }
  #homeparagraph {
    display: none;
  }
  #footerFluid {
    padding: 10px !important;
  }
  #background-div {
    height: 320px;
    background-position: right top;
  }
}
</style>
