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
    displayName: string,
    photoUrl: string,
    uid: string
};

export interface IContact {
    users: string[],
    msgs: IMsg[]
}
