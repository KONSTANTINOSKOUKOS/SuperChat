<template>
<div class="cont" style="margin-top: 3rem; background-color: blue;">
    <!-- <div class="contact" v-for="contact in contacts"> -->
    <img src="1" alt="">
    </div>
<!-- </div> -->
</template>

<script setup lang="ts">
import { getcontacts } from "../firebase";
import { state } from "../store";
const contacts = getcontacts(state.user)
</script>

<style scoped>

</style>