<template>
    <div v-if="state.user" class="cont">
        <router-link class="link" to="/home">
            <svg viewBox="0 0 24 24" width="24">
                <path
                    d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                    :fill="$route.path == '/home' ? '#black' : 'none'" stroke="currentColor" stroke-linejoin="round"
                    stroke-width="2"></path>
            </svg>
        </router-link>
        <router-link class="link" :to="`/chat`">a
        </router-link>
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

img {
    width: 1.5rem;
}
</style>