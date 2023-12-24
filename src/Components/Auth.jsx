import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db, storage } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';

function Auth() {
	useEffect(() => {
		getMovieList();
	}, []);
	const moviesCollectionRef = collection(db, 'movies');
	const [movies, setMovies] = useState([]);
	const [title, setTitle] = useState('');
	const [updatedTitle, sett] = useState('');
	const [date, setDate] = useState();
	const [oscar, setOscar] = useState(false);
	const [file, setFile] = useState();
	const inputElement = useRef();

	const getMovieList = async () => {
		try {
			const data = await getDocs(moviesCollectionRef);
			const a = data.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			setMovies(a);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = async () => {
		try {
			await addDoc(moviesCollectionRef, {
				title,
				release_date: date,
				oscar,
				uid: auth?.currentUser?.uid,
			});
		} catch (err) {
			console.log(err);
		}

		getMovieList();
	};

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, 'movies', id));
		getMovieList();
	};

	const handleUpdate = async (id) => {
		await updateDoc(doc(db, 'movies', id), { title: updatedTitle });
		getMovieList();
	};

	const handleSignout = async () => {
		await signOut(auth);
	};

	const handleSignin = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	};

	const handleFile = async () => {
		if (file) {
			const fileFolderRef = ref(storage, `firstProjectfiles/${file.name}`);
			await uploadBytes(fileFolderRef, file);
		}
	};
	return (
		<div>
			<div>
				<button onClick={handleSignin}>sign in with google</button>
				<button onClick={handleSignout}>sign out</button>
				<br></br>
				<input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
				<button onClick={handleFile}>upload file</button>
				<br></br>
				<input
					type="text"
					placeholder="movie title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				></input>
				<input
					type="number"
					placeholder="movie released date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				></input>
				<input
					type="checkbox"
					id="oscar"
					name="oscar"
					value={oscar}
					onChange={(e) => setOscar(e.target.checked)}
				></input>
				<label htmlFor="oscar">Recives an oscar</label>
				<input
					type="submit"
					value={'submit movie'}
					onClick={handleSubmit}
				></input>
			</div>
			{movies.map((movie) => {
				return (
					<>
						<h2>{movie.title}</h2>
						<p>oscar : {movie.oscar ? 'True' : 'False'}</p>
						<p>released : {movie.release_date}</p>
						<button
							disabled={auth?.currentUser?.uid !== movie.uid}
							onClick={() => handleDelete(movie.id)}
						>
							Delete
						</button>
						<input
							type="text"
							placeholder="enter the title"
							ref={inputElement}
							onChange={(e) => sett(e.target.value)}
						></input>
						<button
							disabled={auth?.currentUser?.uid !== movie.uid}
							onClick={() => handleUpdate(movie.id)}
						>
							Update title
						</button>
					</>
				);
			})}
		</div>
	);
}

export default Auth;
