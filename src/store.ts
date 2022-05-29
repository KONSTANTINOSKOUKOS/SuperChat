import { reactive } from 'vue';

export const state = reactive({
    msgs: [],
    user: null,
    currentchatid: ''
});

export interface istate {
    msgtype?: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name: string },
    msgs: { id: number, liked: string[], sender: string, txt: string, date: number, img: string, name: string }[],
    user: {
        displayName: string,
        photoUrl: string,
        uid: string
    },
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
    name: string,
    photoURL: string,
    uid: string
};

export interface IContact {
    id: string,
    users: string[],
    msgs: IMsg[]
}
