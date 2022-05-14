import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { state } from './store';
import { istate } from './store';
import { onUnmounted, Ref } from 'vue';

import { collection, doc, setDoc, getDocs, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence,
    onAuthStateChanged
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
    const unsub = onSnapshot(q, (docs) => {
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
    const message: istate['msgtype'] = {
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
    const unsub = onSnapshot(docc, (doc) => {
        arrlike.value = doc.data().liked;
        ownliked.value = arrlike.value.indexOf(state.user.uid) != -1;
    });
};

export function persistuser() {
    setPersistence(auth, browserSessionPersistence);

    const unsub = onAuthStateChanged(auth, (user) => {
        state.user = user ? user : null;
    });
};

export async function loginwgoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((res) => {
        state.user = res.user;
        console.log(state.user);
    });
    
    let userexists = false;
    const docs = (await getDocs(collection(db, 'users'))).docs;
    for (const doc of docs) {
        if (doc.id == state.user.uid) {
            userexists = true;
            break;
        }
    }
    if (!userexists) {
        await setDoc(doc(db, 'users', state.user.uid), {
            name: state.user.displayName,
            photoURL: state.user.photoURL,
            uid: state.user.uid
        });
    }
    router.push({ name: 'Home' });
};

export function logout() {
    signOut(auth).then(() => {
        state.user = null;
        state.loggedin = false;
        router.push({ name: 'Auth' });
    });
};


// export async function addcontact() {
//     //const chats = collection(db, 'chats');
//     const contact = {
//         users:[state.user,]
//     }
//     await setDoc(doc(db,'contacts'),contact);
// }