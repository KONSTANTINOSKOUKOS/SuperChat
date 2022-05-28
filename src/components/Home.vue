<template>
    <div class="cont">
        <div v-if="!loading" class="contact" v-for="contact in contacts">
            <!-- {{other(contacts[0].users)}} -->
            <h1>{{ contact.id == 'superchat' ? 'SuperChat' : getuser(other(contact.users)) }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getcontacts, getuser } from "../firebase";
import { IContact, state } from "../store";

scroll(0, 0);
const loading = ref(true);//wait to load

const contacts: IContact[] = [];
getcontacts(state.user.uid, contacts, loading);
console.log(contacts);

const other = (users: string[]) => {
    return users.find((id) => {
        return id != state.user.uid;
    });
};
</script>

<style scoped>
.cont {
    margin-top: 4rem;
    /* background-color: blue; */
}
</style>