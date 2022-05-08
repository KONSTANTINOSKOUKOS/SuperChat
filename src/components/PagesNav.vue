<template>
    <div v-if="state.user" class="cont">
        <router-link class="link" to="/home">HOME</router-link>
        <router-link class="link" :to="`/chat`">CHAT</router-link>
        <router-link class="link" to="/user">USER</router-link>
    </div>
</template>
<script setup lang="ts">
import { state } from "../store";
</script>

<style scoped>
.cont {
    position: fixed;
    bottom: 0;
    min-width: 100vw;
    background-color: #828f98;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.link {
    background-color: #707a82;
    color: black;
    border: 0;
    border-radius: .3rem;
    margin: .7em 0;
    padding: .2em .45em;
    text-decoration: none;
}

.link:hover {
    filter: brightness(90%);
}
</style>