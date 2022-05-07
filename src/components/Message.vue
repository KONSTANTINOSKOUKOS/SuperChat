<template>
        <span v-if="!ismine()" :class="ismine() ? 'right' : 'left'" class="name">{{ msg.name }}</span>
        <div class="cont" :class="ismine() ? 'right' : 'left'">
            <img v-if="pfpimg != '' && ismine() == false" :src="pfpimg">
            <p @dblclick="likee()" :class="msg.sender == state.user.uid ? 'senders' : 'others'">{{
                    msg.txt
            }}</p>
            <button @click="likee()"> {{ ownliked ? '&#10084;&#65039;' : '&#129293;' }}{{ arrlike.length == 0 ? '' :
                    arrlike.length
            }}</button>
            <!-- <button @click="like">{{ ownliked ? '&#10084;&#65039;' : '&#129293;' }}</button>
        <span>{{ arrlike.length == 0 ? '' : arrlike.length }}</span> -->
        </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { istate } from '../store';
import { Firestore, doc } from 'firebase/firestore';
import { getlikes, like } from '../firebase';

const db = inject<Firestore>('db');

interface iprops {
    msg: {
        id: number,
        liked: string[],
        sender: string,
        txt: string,
        date: number,
        img: string,
        name: string
    }
}
const props = defineProps<iprops>();
const state = inject<istate>('state');

const pfpimg = ref(props.msg.img);

const arrlike = ref(props.msg.liked);
const ownliked = ref(false);

const docc = doc(db, 'messages', props.msg.date.toString());

onMounted(() => {
    getlikes(docc, ownliked, arrlike);
});

const likee = async () => {
    like(docc, ownliked, arrlike);
}

const ismine = () => {
    return props.msg.sender == state.user.uid;
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    margin: 0 0 1.5rem 0;

}

p {
    font-size: 18px;
    font-weight: 400;
    padding: .5vh .7rem;
    border-radius: 1em;
    max-width: 60%;
    overflow-wrap: break-word;
    margin: 0;
}

@media screen and (min-width: 600px) {
    p {
        font-size: 1.7em;
    }
}

.left p {
    background-color: rgb(184, 184, 184);
    margin-left: 2.5vw;
    color: black;
}

.right {
    flex-direction: row-reverse;
    margin-left: 1rem;
}

.right p {
    background-color: rgb(0, 102, 255);
    color: white;
    margin-right: 2vw;
}

button {
    font-size: 1rem;
    border: 0;
    background-color: rgb(226, 224, 224);
    border-radius: 2em;
    padding: .25em;
    /* padding: 0.5rem; */
    margin-top: auto;
    height: fit-content;
}

button:hover {
    filter: brightness(90%);
}

img {
    width: 2rem;
    border-radius: 50%;
    padding: 0;
}

.name {
    color: black;
    display: flex;
    max-width: fit-content;
    margin-left: calc(2rem + 2.5vw);
}
</style>
