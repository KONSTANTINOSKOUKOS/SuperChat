import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { IContact, state } from './store';
import { IMsg } from './store';
import { onUnmounted, Ref } from 'vue';

import { collection, doc, setDoc, getDocs, getDoc, updateDoc, onSnapshot, query, orderBy, arrayUnion } from "firebase/firestore";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { router } from "./router";

const firebaseConfig = {
    apiKey: "AIzaSyBQIzMt7WX15ElNiUUXDKjSAmM5g-qQl-k",
    authDomain: "chat-c41f5.firebaseapp.com",
    projectId: "chat-c41f5",
    storageBucket: "chat-c41f5.appspot.com",
    messagingSenderId: "503653424889",
    appId: "1:503653424889:web:6a828486b7b59b2754cc28",
    measurementId: "G-PESXKQ3L3X",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export function getmsgs() {
    state.msgs = [];
    const coll = collection(db, 'messages');
    const q = query(coll, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, docs => {
        state.msgs = [];
        docs.forEach(doc => {
            state.msgs.push(doc.data());
        });
    });
    onUnmounted(() => {
        unsub();
    })
};

export async function send(txt: Ref<string>) {
    const date = Date.now();
    const message: IMsg = {
        id: Math.random(),
        liked: [],
        sender: state.user.uid,
        txt: txt.value,
        date: date,
        img: state.user.photoURL,
        name: state.user.displayName
    };
    await setDoc(doc(db, 'messages', date.toString()), message);
    txt.value = '';
};

export async function like(docc: any, ownliked: Ref<boolean>, arrlike: Ref<string[]>) {
    ownliked.value = !ownliked.value;

    let newarr = arrlike.value;
    if (!newarr.includes(state.user.uid)) {
        newarr.push(state.user.uid);
    } else {
        newarr = newarr.filter(item => item != state.user.uid);
    }

    await updateDoc(docc, {
        'liked': newarr
    });
};

export function getlikes(docc: any, ownliked: Ref<boolean>, arrlike: Ref<string[]>) {
    const unsub = onSnapshot(docc, doc => {
        arrlike.value = doc.data().liked;
        ownliked.value = arrlike.value.indexOf(state.user.uid) != -1;
    });
};

export function persistuser() {
    state.user = JSON.parse(localStorage.getItem('user'));
};

export async function loginwgoogle() {
    const provider = new GoogleAuthProvider();
    const signin = await signInWithPopup(auth, provider);
    state.user = signin.user;
    localStorage.setItem('user', JSON.stringify(state.user));
    console.log(state.user);

    //if user doesn't exist in users collection
    let userexists = false;
    const docs = (await getDocs(collection(db, 'users'))).docs;
    for (const doc of docs) {
        if (doc.id == state.user.uid) {
            userexists = true;
            break;
        }
    }
    //make doc w/his info & update users array in superchat doc
    if (!userexists) {
        await setDoc(doc(db, 'users', state.user.uid), {
            name: state.user.displayName,
            photoURL: state.user.photoURL,
            uid: state.user.uid
        });

        await updateDoc(doc(db, 'contacts', 'superchat'), {
            'users': arrayUnion(state.user.uid)
        });
    }
    router.push({ name: 'Home' });
};

export function logout() {
    // signOut(auth).then(() => {
    //     state.user = null;
    //     localStorage.clear();
    //     router.push({ name: 'Auth' });
    // });
    localStorage.clear();
    state.user = null;
    router.push({ name: 'Auth' });
};

export async function getuser(uid: string) {
    const docc = await getDoc(doc(db, 'users', uid));
    return docc.data();
}

export async function getcontacts(uid: string) {
    const contacts: IContact[] = [];

    // const docs = await getDocs(collection(db, 'contacts'));
    // docs.docs.forEach(doc => {
    //     if (doc.data().users.indexOf(uid) != -1) {
    //         contacts.push(doc.data());
    //     }
    // });

    getDocs(collection(db, 'contacts')).then(docs => {
        docs.docs.forEach(doc => {
            if (doc.data().users.indexOf(uid) != -1) {
                contacts.push(doc.data());
            }
        });
    });
    return contacts;
}
// export async function addcontact() {
//     //const chats = collection(db, 'chats');
//     const contact = {
//         users:[state.user,]
//     }
//     await setDoc(doc(db,'contacts'),contact);
// }

export async function spch() {
    const allusers = (await getDocs(collection(db, 'users'))).docs;
    console.log(allusers);
    return allusers;
}
    // const chat: IContact = {
    //     users: 1,
    //     msgs:[]
    // };
    // setDoc(doc(db,'contacts','superchat'),chat);