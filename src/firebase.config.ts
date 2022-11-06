// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'rp-rooms.firebaseapp.com',
	projectId: 'rp-rooms',
	storageBucket: 'rp-rooms.appspot.com',
	messagingSenderId: '398235159157',
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: 'G-QPF6XMEG76',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);
