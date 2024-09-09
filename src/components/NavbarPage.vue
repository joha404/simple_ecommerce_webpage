<template>
  <nav
    :class="[
      'navbar',
      'navbar-expand-lg',
      'navbar-light',
      'bg-light',
      { 'navbar-fixed': isFixed },
    ]"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="./favicon.png" alt="Logo" id="logoImg" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/cart">
              <span id="nav-cart-count">{{ cartCount }}</span>
              <i class="fa-solid fa-cart-shopping"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">
              Home
            </router-link>
          </li>
          <li v-if="token" class="nav-item">
            <router-link class="nav-link" to="/wishlist">
              Wishlist
            </router-link>
          </li>
          <li v-if="!token" class="mx-3">
            <router-link class="nav-link" to="/signup"> Sign Up </router-link>
          </li>
          <li v-if="!token">
            <router-link class="nav-link" to="/signin"> Log In </router-link>
          </li>

          <li class="nav-item dropdown" v-if="token">
            <a
              class="nav-link"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="profile">
                <div class="avatar">{{ nameFirst || "N/A" }}</div>
              </div>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/admin">
                  Admin
                </router-link>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="signOut">
                  Sign Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  props: {
    cartCount: {
      type: Number,
      required: true,
    },
    nameFirst: {
      type: String,
      default: "", // Ensure it defaults to an empty string
    },
  },
  data() {
    return {
      token: null,
      isFixed: false, // State to control the fixed navbar
    };
  },
  methods: {
    handleScroll() {
      this.isFixed = window.scrollY > 400;
      if (this.isFixed) {
        document.querySelector(".navbar").classList.add("scrolled");
      } else {
        document.querySelector(".navbar").classList.remove("scrolled");
      }
    },
    signOut() {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log Out",
      })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("token");
            this.token = null;
            this.$emit("resetCartCount");
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.error("SweetAlert2 error:", error);
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");

    // Add scroll event listener
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Remove scroll event listener
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
a {
  text-decoration: none;
}

#logo {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
}

#nav-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  font-size: 15px;
  margin-left: 12px;
  margin-top: -12px;
}

#cart {
  position: relative;
}

.fa-cart-shopping {
  font-size: 30px;
  color: #242424;
}

.profile {
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(230, 152, 7);
  border-radius: 50%;
  margin-top: -10px;
}

.avatar {
  color: #fff;
  font-weight: bold;
  font-size: 26px;
}

#navbarDropdoenProfile {
  margin-left: -75px;
}

#logoImg {
  height: 60px;
  width: 80px;
}

.nav-item {
  padding-right: 30px;
}

.nav-item a {
  color: red;
}

.router-link-active {
  color: #141414 !important;
}

.dropdown-menu {
  margin-left: -100px !important;
}
.navbar-fixed {
  position: fixed;
  top: -60px;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease-in-out, background-color 0.3s ease-in-out;
  background-color: rgb(255, 255, 255);
  backdrop-filter: blur(50%);
}

.navbar-fixed.scrolled {
  top: 0;
  background-color: rgba(255, 255, 255, 1); /* Solid background when scrolled */
}

@media screen and (max-width: 768px) {
  #logoImg {
    height: 40px;
    width: 50px;
  }

  .nav-item {
    padding-right: 0px;
    margin-top: 10px;
  }
}
</style>
