<template>
  <nav>
    <h1>CHATROOM</h1>
    <h2>Log in to send messages</h2>
  </nav>
  <button @click="loginwgoogle()"> Log In With Google</button>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { persistuser, loginwgoogle, logout, spch } from "../firebase";

onMounted(() => {
  logout();
  persistuser();
  const docs = spch();
});
</script>

<style scoped>
nav {
  width: 100vw;
  /* min-height: 10vh; */
  background-color: rgb(130, 143, 152);
}

button {
  border: 0;
  margin: 1rem auto;
  background-color: rgb(184, 184, 184);
  border-radius: 1rem;
  font-size: 2rem;
  padding: .2rem .5rem;
  display: flex;
  justify-items: center;
}

button:hover {
  background-color: #7b83dc;
  /* color: #fff; */
}

h1 {
  font-size: 3em;
  text-align: center;
  padding-bottom: .1rem;
  color: black;
}

h2 {
  font-size: 2em;
  text-align: center;
  color: black;
}
</style>
