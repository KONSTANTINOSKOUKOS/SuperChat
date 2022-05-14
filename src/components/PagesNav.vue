<template>
    <div v-if="state.user" class="cont">
        <router-link class="link" to="/home">
            <svg width="30" height="30" viewBox="0 0 24 24">
                <path d="M3 10v11h6v-7h6v7h6v-11L12,3z" />
            </svg>
        </router-link>
        <router-link class="link" :to="`/chat`">CHAT</router-link>
        <router-link class="link" to="/user">
            USER</router-link>
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
    max-height: 5.8vh;
}

.link {
    background-color: #828f98;
    color: black;
    border: 0;
    border-radius: .3rem;
    margin: .6em 0;
    /* padding: .1rem .45rem; */
    text-decoration: none;
    text-align: center;
}

.link:hover,
.link:focus {
    filter: brightness(90%);
}
</style>