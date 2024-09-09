<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-4"></div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 text-center pt-3">
        <div id="signup-div" class="flex-item-border">
          <h2 class="pt-4 pl-4">Create Account</h2>
          <form class="pt-4 pl-4 pr-4" @submit.prevent="signUp">
            <div class="form-group">
              <label for="Email">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
                :class="{
                  'is-invalid': email && !isValidEmail(email) && touched.email,
                }"
                @blur="touched.email = true"
              />
              <div
                v-if="touched.email && !isValidEmail(email)"
                class="invalid-feedback"
              >
                Please enter a valid email.
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <div class="form-group">
                  <label for="FirstName">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="firstName"
                    required
                    :class="{
                      'is-invalid': firstName === '' && touched.firstName,
                    }"
                    @blur="touched.firstName = true"
                  />
                  <div
                    v-if="touched.firstName && firstName === ''"
                    class="invalid-feedback"
                  >
                    First name is required.
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="LastName">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="lastName"
                    required
                    :class="{
                      'is-invalid': lastName === '' && touched.lastName,
                    }"
                    @blur="touched.lastName = true"
                  />
                  <div
                    v-if="touched.lastName && lastName === ''"
                    class="invalid-feedback"
                  >
                    Last name is required.
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group mt-3 position-relative">
              <label for="Password">Password</label>
              <input
                :type="passwordVisible ? 'text' : 'password'"
                v-model="password"
                class="form-control"
                required
                :class="{
                  'is-invalid': password.length < 6 && touched.password,
                }"
                @blur="touched.password = true"
                @input="checkPasswordInput"
              />
              <button
                v-if="password.length > 0"
                type="button"
                class="btn password-toggle"
                @click="togglePasswordVisibility"
              >
                <i
                  :class="
                    passwordVisible
                      ? 'fa-solid fa-eye-slash'
                      : 'fa-solid fa-eye'
                  "
                ></i>
              </button>
              <div
                v-if="touched.password && password.length < 6"
                class="invalid-feedback"
              >
                Password must be at least 6 characters.
              </div>
            </div>
            <div class="form-group mt-3 position-relative">
              <label for="ConfirmPassword">Confirm Password</label>
              <input
                :type="passwordConfirmVisible ? 'text' : 'password'"
                v-model="passwordConfirm"
                class="form-control"
                required
                :class="{
                  'is-invalid':
                    password !== passwordConfirm && touched.passwordConfirm,
                }"
                @blur="touched.passwordConfirm = true"
                @input="checkPasswordConfirmInput"
              />
              <button
                v-if="passwordConfirm.length > 0"
                type="button"
                class="btn password-toggle2"
                @click="togglePasswordConfirmVisibility"
              >
                <i
                  :class="
                    passwordConfirmVisible
                      ? 'fa-solid fa-eye-slash'
                      : 'fa-solid fa-eye'
                  "
                ></i>
              </button>
              <div
                v-if="touched.passwordConfirm && password !== passwordConfirm"
                class="invalid-feedback"
              >
                Passwords do not match.
              </div>
            </div>
            <button
              class="btn btn-primary mt-3"
              v-if="!isLoading"
              type="submit"
            >
              Create Account
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
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isLoading: false,
      passwordVisible: false,
      passwordConfirmVisible: false,
      touched: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        passwordConfirm: false,
      },
    };
  },
  props: ["baseURL"],
  methods: {
    async signUp() {
      this.isLoading = true;

      if (this.password !== this.passwordConfirm) {
        swal({
          text: "Sign Up Failed! Passwords do not match.",
          icon: "error",
        });
        this.isLoading = false;
        return;
      }

      const user = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };

      try {
        await axios.post(`${this.baseURL}user/signup`, user);
        const nameFirst = this.firstName.charAt(0);
        localStorage.setItem("nameFirst", nameFirst); // Save nameFirst in localStorage
        this.handleNameFirst(nameFirst);
        this.$router.replace("/");
        swal({
          text: "User Sign Up Successfully! Please Log In",
          icon: "success",
        });
      } catch (error) {
        swal({
          text: "ERROR: " + (error.response?.data?.message || "Sign Up Failed"),
          icon: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    handleNameFirst(nameFirst) {
      this.$emit("firstName", nameFirst);
    },
    isValidEmail(email) {
      // Basic email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    checkPasswordInput() {
      // Trigger reactivity when the password field has input
      this.passwordVisible = this.password.length > 0;
    },
    checkPasswordConfirmInput() {
      // Trigger reactivity when the confirm password field has input
      this.passwordConfirmVisible = this.passwordConfirm.length > 0;
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordConfirmVisibility() {
      this.passwordConfirmVisible = !this.passwordConfirmVisible;
    },
  },
};
</script>

<style>
.form-group label {
  margin-bottom: 7px;
}

#signup-div {
  position: relative;
}

.text-center img {
  display: block;
  margin: 10px auto;
  width: 50px;
  height: 50px;
}

#spinner {
  height: 70px;
  width: 70px;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
}

.position-relative {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}
.password-toggle2 {
  position: absolute;
  top: 35%;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}
.password-toggle:hover {
  background-color: none !important;
}

.password-toggle i {
  color: #6c757d;
}
@media screen and (max-width: 768px) {
  .password-toggle {
    position: absolute;
    top: 28%;
    right: 10px;
  }
  .password-toggle2 {
    position: absolute;
    top: 35%;
    right: 10px;
  }
}
</style>
