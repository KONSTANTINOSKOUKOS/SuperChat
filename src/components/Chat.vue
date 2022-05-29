<template>
  <div class="superchat">
    <!-- <Nav /> -->
    <Message v-for="msg in state.msgs" :msg="msg" :key="msg.id" />
    <Form />
    <div ref="dum" style="margin-top: 5rem;height: 1px;"></div>
  </div>
</template>

<script lang="ts" setup>
import { getmsgss } from "../firebase";
import { inject, provide, ref } from "vue";
import { istate } from "../store";

import Message from "./Message.vue";
import Form from "./Form.vue";
import { router } from "../router";

const state: istate = inject("state");
const dum = ref<null | Element>(null);
provide('dum', dum);

getmsgss(state.currentchatid);
</script>

<style scoped>
.superchat {
  min-height: 100vh;
  scroll-behavior: smooth;
}
</style>
