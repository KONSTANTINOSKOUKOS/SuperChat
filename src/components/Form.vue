<template>
    <button v-if="!bottom" @click="scroll('smooth')" class="bottom">
        &#8681;
    </button>
    <div class="cont">
        <form @submit.prevent="sendd();">
            <!-- <textarea v-model="msg" placeholder="Πείτε κάτι" cols="30" rows="10"></textarea> -->
            <input type="text" v-model="msg" placeholder="Πείτε κάτι" />
            <button class="submit" type="submit">Send</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, inject } from "vue";
import { send, getmsgs } from '../firebase';

const msg = ref('');
const bottom = ref(false);
const dum = inject<null | Ref<Element>>('dum');

const scroll = (bhvr: ScrollBehavior) => {
    dum.value.scrollIntoView({ behavior: bhvr });
}

onMounted(async () => {
    scroll('auto');
    getmsgs();
    const obs = new IntersectionObserver(e => {
        e.forEach(entry => {
            if (entry.isIntersecting) {
                bottom.value = true;
            } else {
                bottom.value = false;
            }
        });
    }, {
        root: null,
        threshold: 0,
    });
    obs.observe(dum.value);
});

const sendd = async () => {
    if (msg.value == '')
        return;
    send(msg);
    scroll('smooth');
}

</script>

<style scoped>
.cont {
    z-index: 999;
    position: fixed;
    bottom: 0;
    width: 100%;
    /* height: 4vh; */
    display: flex;
    margin-bottom: 7vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

form {
    background-color: white;
    border: 1px solid rgba(128, 128, 128, 0.5);
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    min-width: 80%;
    border-radius: 10rem;
    display: flex;
    max-height: 3rem;
}

textarea {
    width: 80%;
    border: 0;
    /* height: 70%; */
    background-color: transparent;
    outline-width: 0;
    margin-left: 1rem;
    overflow: auto;
    overflow-wrap: break-word;
    resize: none;
    height: 2.5em;
}

input {
    width: 80%;
    border: 0;
    /* height: 70%; */
    background-color: transparent;
    outline-width: 0;
    margin-left: 1rem;
    overflow-wrap: break-word;
    resize: none;
    min-height: 2.5em;
}

.submit {
    border: 0;
    background-color: transparent;
    color: rgb(0, 153, 255);
    font-size: 1.1em;
    margin-right: 2%;
}

.submit:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.bottom {
    position: fixed;
    bottom: 13vh;
    font-size: 1.5rem;
    margin: 0 85vw;
    padding: .3rem .8rem;
    border: 0;
    border-radius: 50%;
    background-color: rgb(184, 184, 184);
}

.bottom:hover {
    filter: brightness(90%);
}
</style>