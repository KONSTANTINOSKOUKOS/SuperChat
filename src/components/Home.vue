<template>
    <div class="cont">
        <div v-if="!loading" class="contact" v-for="contact in contacts">
            <!-- {{other(contacts[0].users)}} -->
            <h1>{{ contact.id == 'superchat' ? 'SuperChat' : getuser(other(contact.users)) }}</h1>
            <img :src="contact.id == 'superchat' ? state.user.photoURL : ''" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getcontacts, getuser } from "../firebase";
import { IContact, state } from "../store";

const loading = ref(true);//wait to load

const contacts: IContact[] = [];

const other = (users: string[]) => {
    return users.find(id => {
        return id != state.user.uid;
    });
};
onMounted(() => {
    scroll(0, 0);
    getcontacts(state.user.uid, contacts, loading);

    console.log(getuser('Q0ItRiYUbGTvDSOvPqAa0D7XQux2').then(user => { return user }));
    console.log(contacts);

    const users = [];
    contacts.forEach(() => {
        console.log('ok');
    });
});
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