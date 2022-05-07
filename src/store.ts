import { reactive } from 'vue';
import { User } from "firebase/auth";

const state = reactive({
    msgs: [],
    user: null,
    currentchatid: ''
});

export interface istate {
    contacttype?:{user1: number,user2: number },
    msgtype?: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name: string },
    msgs: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name: string }[],
    user: User,
    currentchatid: string
}
export default state;