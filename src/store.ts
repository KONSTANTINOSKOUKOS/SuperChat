import { reactive } from 'vue';

export const state = reactive({
    contacts: [] as IContact[],
    msgs: [] as IMsg[],
    user: null,
    currentchatid: 'superchat',
});

export interface istate {
    msgtype?: IMsg,
    msgs: IMsg[],
    user: {
        displayName: string,
        photoUrl: string,
        uid: string
    },
    currentchatid: string,
    contacts: IContact[]
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
    othername: string,
    otherphoto: string
}
