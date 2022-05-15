import { reactive } from 'vue';
// import { User } from "firebase/auth";

export const state = reactive({
    msgs: [],
    user: null,
    loggedin: false,
    currentchatid: ''
});

export interface istate {
    msgtype?: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name: string },
    msgs: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name: string }[],
    user: IUser,
    currentchatid: string
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface IMsg {
    id: number,
    liked: string[],
    sender: string,
    txt: string,
    date: number,
    img: string,
    name: string
};

export interface IUser {
    displayName: string,
    photoUrl: string,
    uid: string
};

export interface IChat{
    users: string[],
    msgs: IMsg[]
}
