<template>
  <div class="container">
    <div class="row mt-4">
      <h3 class="text-center">Cart Details</h3>
    </div>
    <div v-for="cartItem in cartItems" :key="cartItem.id" class="row mt-3 pt-3">
      <div class="col-2"></div>
      <div class="col-md-3">
        <img
          :src="cartItem.product.imageURL"
          class="w-100 cartDetailsImage"
          :alt="cartItem.product.name"
        />
      </div>
      <div class="col-md-5">
        <div class="card-block px-3" id="cartDetailsItemsDetails">
          <h3 class="card-title">
            {{ cartItem.product.name }}
          </h3>
          <p class="mb-0 per">${{ cartItem.product.price }} Per unit</p>
          <p class="mb-0 quantity">Quantity: {{ cartItem.quantity }}</p>
          <p class="mb-0 price">
            Total
            <span class="font-weight-bold">
              {{ cartItem.product.price * cartItem.quantity }}
            </span>
          </p>
          <a href="#" @click="deleteItem(cartItem.id)" class="removeItem mt-3"
            >Remove from Cart</a
          >
        </div>
      </div>
      <div class="col-3"></div>
      <hr class="mt-5" />
    </div>
  </div>

  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <h3 class="totalCost">Total : {{ totalCost }}$</h3>
      <button class="btn btn-primary" @click="confirmOrder">Confirm</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      cartItems: [], // Corrected: cartItems, not cartItem
      token: null,
      totalCost: 0,
    };
  },
  props: ["baseURL"],
  methods: {
    listCardItem() {
      axios
        .get(`${this.baseURL}/cart/?token=${this.token}`) // Ensure baseURL ends with a slash if necessary
        .then((res) => {
          const result = res.data;
          this.cartItems = result.cartItems; // Corrected: cartItems, not cartItem
          this.totalCost = result.totalCost;
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          swal({
            text: "Failed to load cart items. Please try again later.",
            icon: "error",
          });
        });
    },
    deleteItem(itemId) {
      axios
        .delete(`${this.baseURL}cart/delete/${itemId}/?token=${this.token}`)
        .then((res) => {
          if (res.status === 200) {
            swal({
              text: "Cart Removed Successfully",
              icon: "success",
            });
          }
        })
        .then(() => {
          this.$router.go(0);
        })
        .catch((err) => {
          swal({
            text: "Cart Remove Failed",
            icon: "error",
          });
        });
    },
    confirmOrder() {
      Swal.fire({
        title: "Are you sure?",
        text: "Are  you sure to confirm this Product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/");
          } else {
            console.log("User cancelled the action");
          }
        })
        .catch((error) => {
          console.error("SweetAlert2 error:", error);
        });

      console.log("Sign out method end");
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.listCardItem();
    } else {
      swal({
        text: "You need to be logged in to view the cart.",
        icon: "warning",
      });
    }
  },
};
</script>

<style scoped>
.cartDetailsImage {
  height: 250px;
}
#cartDetailsItemsDetails {
  padding-top: 20px;
}
#cartDetailsItemsDetails h3 {
  font-size: 36px;
  font-weight: bold;
}
#cartDetailsItemsDetails .per {
  font-size: 16px;
  margin-top: 10px;
}
#cartDetailsItemsDetails .price {
  font-size: 20px;
  color: #141414;
  font-weight: bolder;
  margin-top: 10px;
}
#cartDetailsItemsDetails .quantity {
  font-size: 18px;
  color: #494949;
  font-weight: bold;
  margin-top: 10px;
}
.totalCost {
  font-size: 28px;
  font-weight: bold;
  color: #141414;
}
@media screen and (max-width: 768px) {
  #cartDetailsItemsDetails h3 {
    font-size: 22px;
  }
  #cartDetailsItemsDetails .per {
    font-size: 14px;
    margin-top: 8px;
  }
  #cartDetailsItemsDetails .price {
    font-size: 18px;
    margin-top: 8px;
  }
  #cartDetailsItemsDetails .quantity {
    font-size: 16px;
    margin-top: 8px;
  }
  #cartDetailsItemsDetails {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .totalCost {
    font-size: 20px;
  }
}
</style>
