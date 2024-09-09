<template>
  <h1>hello</h1>
  <h1>{{ name }}</h1>
</template>

<script>
import axios from "axios";
export default {
  props: ["baseURL"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    async getApi() {
      axios
        .post(`${this.baseURL}user/signIn/data/firstName`)
        .then((data) => {
          this.name = data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
