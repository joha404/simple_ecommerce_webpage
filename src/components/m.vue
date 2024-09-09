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

<script></script>

<style scoped></style>
