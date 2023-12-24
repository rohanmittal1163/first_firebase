// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDtPB2Nhq8uC9Y3Z3CCWcNYSWpde3kX9pk',
	authDomain: 'fir-course-fb2b3.firebaseapp.com',
	projectId: 'fir-course-fb2b3',
	storageBucket: 'fir-course-fb2b3.appspot.com',
	messagingSenderId: '460496758935',
	appId: '1:460496758935:web:f398a987fa8f8bd84461d2',
	measurementId: 'G-G887G42JE1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
