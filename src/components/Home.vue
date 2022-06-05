<template >
    <div class="cont">
        <div @click="handlecontact(contact.id)" class="contact" v-for="contact in state.contacts">
            <div>
                <h1>{{ contact.id == 'superchat' ? 'SuperChat' : contact.othername }}</h1>
                <img :src="contact.id == 'superchat' ? state.user.photoURL : contact.otherphoto" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getcontacts } from "../firebase";
import { router } from "../router";
import { state } from "../store";

onMounted(async () => {
    // testt();
    scroll(0, 0);
    getcontacts(state.user.uid, state.contacts);
    console.log(state.contacts);
});

const handlecontact = (id: string) => {
    state.currentchatid = id;
    localStorage.setItem('chatid', state.currentchatid);
    router.push({ name: 'Chat' });
}
</script>

<style scoped>
.cont {
    margin-top: 4rem;
}

.contact {
    margin-top: 1rem;
    background-color: aqua;
}
</style>