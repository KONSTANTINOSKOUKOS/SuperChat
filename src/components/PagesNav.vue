<template>
    <div v-if="state.user" class="cont">
        <router-link class="link" :to="{ name: 'Home', force: true }">
            <svg viewBox="0 0 24 24" width="24">
                <path
                    d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                    :fill="$route.path == '/home' ? '#black' : 'none'" stroke="currentColor" stroke-linejoin="round"
                    stroke-width="2"></path>
            </svg>
        </router-link>
        <!-- {name: 'Chat'} -->
        <router-link class="link" to="/chat">
            <svg v-if="$route.name == 'Chat'" color="#000" fill="#000" height="24" role="img" viewBox="0 0 24 24"
                width="24">
                <path
                    d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
                    fill-rule="evenodd"></path>
            </svg>
            <svg v-else color="#000" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24">
                <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218"
                    y1="3" y2="10.083"></line>
                <polygon :fill="$route.path == '/chat' ? '#black' : 'none'"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor"
                    stroke-linejoin="round" stroke-width="2"></polygon>
            </svg>
        </router-link>
        <router-link class="link" to="/user">
            <img :src="state.user.photoURL" :class="$route.path == '/user' ? 'focused' : ''">
        </router-link>
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
    max-height: 6.3vh;
}

.link {
    /* padding: 0 10rem; */
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
    width: 1.8rem;
    height: 1.8rem;
    /* margin: .1rem 1rem; */
    margin-top: .2rem;
    border-radius: 50%;
}

.focused {
    border: 2px solid black;
    width: 1.8rem;
    height: 1.8rem;
}
</style>