// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	onSnapshot,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
};

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

async function wrapAddDoc(tweet) {
	await addDoc(collection(db, 'nweet'), tweet);
}

async function wrapGetDocs() {
	const querySnapshot = await getDocs(collection(db, 'nweet'));
	const result = [];
	querySnapshot.forEach((doc) => {
		const nweetObject = { ...doc.data(), id: doc.id };
		result.push(nweetObject); // 최근 글이 먼저
	});
	return result;
}

function wrapOnSnapshot(cb) {
	const unsub = onSnapshot(collection(db, 'nweet'), cb);
}

async function wrapDeleteDoc(id) {
	const docRef = doc(db, 'nweet', id);
	await deleteDoc(docRef);
}

async function wrapUpdateDoc(id, text) {
	const docRef = doc(db, 'nweet', id);
	await updateDoc(docRef, { text: text });
}

export const firebaseInstance = {
	auth: {
		GoogleAuthProvider,
		GithubAuthProvider,
	},
};
export const dbService = {
	insertDoc: wrapAddDoc,
	getList: wrapGetDocs,
	onSnapshot: wrapOnSnapshot,
	deleteDoc: wrapDeleteDoc,
	updateDoc: wrapUpdateDoc,
};
