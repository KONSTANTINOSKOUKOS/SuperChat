<template>
    <div class="cont">
        <div class="contact" v-for="contact in contacts">
            <img :src="getuser(contact.users).photoURL">
        </div>
    </div>
</template>

<script setup lang="ts">
import { getcontacts, getuser } from "../firebase";
import { state } from "../store";

const contacts = getcontacts(state.user.uid);
console.log(contacts);
</script>

<style scoped>
.cont {
    margin-top: 3rem;
    background-color: blue;
}
</style>