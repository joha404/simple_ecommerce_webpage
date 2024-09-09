<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-lg-6 col-mg-12 col-sm-12">
        <img
          :src="product.imageURL"
          alt="Product Image"
          class="showProductDetailsImg"
        />
      </div>
      <div class="col-lg-6 col-mg-12 col-sm-12 mt-3">
        <div class="showProductDetailsDiv">
          <h3>{{ product.name }}</h3>
          <h5>{{ category.categoryName }}</h5>
          <p>{{ product.description }}</p>
          <h4 class="mt-3">${{ product.price }}</h4>
        </div>
        <div class="CartDetailsDiv">
          <div class="d-flex">
            <div class="input-group-prepend">
              <span class="input-group-text">Quality</span>
            </div>
            <input
              type="number"
              v-model="quantity"
              class="form-control"
              id="quantityInputId"
            />
          </div>
          <div class="d-flex">
            <button
              class="btn btn-primary"
              id="addToCartBtn"
              @click="addToCart"
            >
              {{ addToCartString }}
            </button>
          </div>
        </div>

        <div class="wishlistBtnDiv">
          <button class="btn mr-3 p-2 btn-primary" @click="addToWishlist">
            {{ wishlistString }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  props: ["baseURL", "products", "categories"],
  data() {
    return {
      product: {},
      category: {},
      id: null,
      wishlistString: "Add to Wishlist",
      addToCartString: "Add to Cart",
      quantity: 1,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.product = this.products.find((product) => product.id == this.id);
    if (this.product) {
      this.category =
        this.categories.find(
          (category) => category.id === this.product.categoryId
        ) || {};
    }
    this.token = localStorage.getItem("token");
  },
  methods: {
    addToWishlist() {
      if (!this.token) {
        swal({
          text: "Please Log in to add item in wishlist",
          icon: "error",
        });
        return;
      }
      axios
        .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
          id: this.product.id,
        })
        .then((res) => {
          if (res.status === 201) {
            this.wishlistString = "Added to Wishlist";

            swal({
              text: "Wishlist added successfully",
              icon: "success",
            });
            this.$emit("fetchData");
          }
        })

        .catch(() => {
          swal({
            text: "Error",
            icon: "error",
          });
        });
    },
    addToCart() {
      if (!this.token) {
        swal({
          text: "Please Log in to add item in wishlist",
          icon: "error",
        });
        return;
      }
      axios
        .post(`${this.baseURL}cart/add?token=${this.token}`, {
          productId: this.id,
          quantity: this.quantity,
        })
        .then((res) => {
          if (res.status === 201) {
            this.addToCartString = "Added to Cart";
            swal({
              text: "product added cart successfully",
              icon: "success",
            });
          }
        })
        .catch(() => {
          swal({
            text: "Error",
            icon: "error",
          });
        });
    },
  },
};
</script>

<style>
.showProductDetailsImg {
  height: 100%;
  width: 100%;
}
#addToCartBtn {
  background-color: #febd69;
  border: none;
}
.showProductDetailsDiv {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.CartDetailsDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
}
.wishlistBtnDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
#quantityInputId {
  width: 50px;
  height: 39px;
  margin-left: -1px;
  border-left: none;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.showProductDetailsDiv h3 {
  font-size: 48px;
  font-weight: bold;
}
.showProductDetailsDiv h5 {
  font-size: 18px;
  margin-top: -10px;
  color: #393939;
}
.showProductDetailsDiv p {
  font-size: 14px;
  color: #595959;
}
.showProductDetailsDiv h4 {
  font-size: 28px;
  color: #141414;
  font-weight: bold;
}
@media screen and (max-width: 768px) {
  .showProductDetailsDiv h3 {
    font-size: 24px;
    font-weight: bold;
  }
  .showProductDetailsDiv h5 {
    font-size: 16px;
    margin-top: -10px;
    color: #393939;
  }
  .showProductDetailsDiv p {
    font-size: 14px;
    color: #595959;
  }
  .showProductDetailsDiv h4 {
    font-size: 20px;
    color: #141414;
    font-weight: bold;
  }
}
</style>
