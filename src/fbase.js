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
	where,
	query,
	orderBy,
} from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

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
const storage = getStorage(app);

async function wrapAddDoc(tweet) {
	await addDoc(collection(db, 'nweets'), tweet);
}

async function wrapGetDocs(uid) {
	const q = query(
		collection(db, 'nweets'),
		where('creatorId', '==', uid),
		orderBy('createdAt', 'asc'),
	);
	const querySnapshot = await getDocs(q);
	const result = [];
	querySnapshot.forEach((doc) => {
		const nweetObject = { ...doc.data(), id: doc.id };
		result.push(nweetObject);
	});
	return result;
}

function wrapOnSnapshot(cb) {
	const unsub = onSnapshot(collection(db, 'nweets'), cb);
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
	getDocsList: wrapGetDocs,
	onSnapshot: wrapOnSnapshot,
	deleteDoc: wrapDeleteDoc,
	updateDoc: wrapUpdateDoc,
};
export const storageService = {
	ref,
	storage,
	uploadString,
	getDownloadURL,
	deleteObject,
};
