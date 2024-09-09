<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-4"></div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 text-center pt-3">
        <div id="signup-div" class="flex-item-border">
          <h2 class="pt-4 pl-4">Sign In</h2>
          <form @submit.prevent="signIn" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label for="Email"> Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
              />
            </div>

            <div class="form-group mt-3">
              <label for="Password"> Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                required
              />
            </div>

            <button
              class="btn btn-primary mt-3"
              type="submit"
              v-if="!isLoading"
            >
              Sign In
            </button>
            <div class="text-center">
              <img
                v-if="isLoading"
                src="../assets/spinner.gif"
                alt="Loading..."
                id="spinner"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  props: ["baseURL"],
  data() {
    return {
      email: null,
      password: null,

      isLoading: false, // Added isLoading to the data
    };
  },
  methods: {
    async signIn() {
      this.isLoading = true; // Show loading spinner

      const body = {
        email: this.email,
        password: this.password,
      };

      try {
        const res = await axios.post(`${this.baseURL}user/signIn`, body);
        localStorage.setItem("token", res.data.token);
        // Emit the nameFirst to the parent component
        this.$router.replace("/");
        swal({
          text: "Log In Successfully",
          icon: "success",
        });
      } catch (error) {
        swal({
          text: "Log In Failed",
          icon: "error",
        });
      } finally {
        this.isLoading = false; // Hide loading spinner
      }
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
