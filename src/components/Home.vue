<template >
    <div class="cont">
        <div @click="handlecontact(contact.id)" v-if="pressed" class="contact" v-for="contact in contacts">
            <div>
                <h1>{{ contact.id == 'superchat' ? 'SuperChat' : contact.othername }}</h1>
                <img :src="contact.id == 'superchat' ? state.user.photoURL : contact.otherphoto" />
            </div>
        </div>
        <button style="position: fixed; margin:10rem" @click="pressed = !pressed">noice</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getcontacts } from "../firebase";
import { router } from "../router";
import { state } from "../store";

const loading = ref(true);//wait to load
const pressed = ref(false);

const contacts = [];

onMounted(async () => {
    loading.value = true;
    scroll(0, 0);
    getcontacts(state.user.uid, contacts, loading);
    console.log(contacts);

});

const handlecontact = (id: string) => {
    router.push({ name: 'Chat', params: { id: id } });
    state.currentchatid = id;
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