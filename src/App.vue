<template>
  <Nav />
  <router-view></router-view>
  <PagesNav />
</template>
<script setup lang="ts">
import { state } from "./store";
import { onMounted, provide } from "vue";
import { db, auth, persistuser } from "./firebase";

import Nav from "./components/Nav.vue";
import PagesNav from "./components/PagesNav.vue";

provide("db", db);
provide("state", state);
provide("auth", auth);

onMounted(() => {
  // persistuser();
})
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
  