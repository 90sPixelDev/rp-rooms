import { useState } from 'react';
import { UserContext } from '../../context/AuthContext';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase.config';
import { SignUpBtn } from '../exporter';
import { useNavigate, Link } from 'react-router-dom';

type Props = any;
type Styles = {
	body: string;
	container: string;
	title: string;
	formContainer: string;
	userInput: string;
	emailInput: string;
	passInput: string;
	text: string;
	textLink: string;
	errMssg: string;
};

const SignUpForm = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 h-[100vh] w-[100vw] flex flex-col place-content-center place-items-center',
		container:
			'bg-purple-400 min-h-[200px] min-w-[300px] rounded-lg shadow-lg shadow-purple-900',
		title: 'text-lg text-center p-2 bg-purple-300 rounded-t-lg mb-4',
		formContainer: 'flex flex-col place-items-center',
		userInput:
			'p-1 w-fit bg-transparent border-b-2 border-purple-200/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white',
		emailInput:
			'p-1 w-fit mt-2 bg-transparent border-b-2 border-purple-200/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white',
		passInput:
			'p-1 w-fit mt-2 bg-transparent border-b-2 border-purple-200/90 focus:border-white outline-none  placeholder-purple-300 caret-purple-100 text-white ',
		text: 'text-center',
		textLink: 'underline text-purple-900 hover:text-purple-200',
		errMssg: 'text-red-700 font-bold w-full text-center',
	};

	const navigate = useNavigate();

	const [err, setErr] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const usernameInput = e.currentTarget[0] as HTMLInputElement;
		const emailInput = e.currentTarget[1] as HTMLInputElement;
		const passwordInput = e.currentTarget[2] as HTMLInputElement;

		const res = await createUserWithEmailAndPassword(
			auth,
			emailInput.value,
			passwordInput.value
		)
			.then((userCredential) => {
				const user = userCredential.user;
				setUserInfo(user);
			})
			.catch((err) => {
				const errorCode = err.code;
				const errorMessage = err.message;
				setErr(true);
			});
	};

	const setUserInfo = async (user: any) => {
		await updateProfile(user, {
			displayName: 'SetNickname',
		});
		await setDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			displayName: 'SetNickname',
		});

		const newUserDoc = doc(db, 'Rooms', 'Rp Rooms Community');
		// const newUserDoc2 = doc(db, 'Rooms', 'Test Room');
		await setDoc(
			newUserDoc,
			{
				users: arrayUnion(user.uid),
			},

			{ merge: true }
		);
		// await setDoc(
		// 	newUserDoc2,
		// 	{
		// 		users: arrayUnion(user.uid),
		// 	},
		// 	{ merge: true }
		// );
		navigate('/');
	};

	return (
		<div className={styles.body}>
			<div className={styles.container}>
				<h1 className={styles.title}>Sign Up</h1>
				<form
					className={styles.formContainer}
					onSubmit={handleSubmit}
				>
					<input
						type='text'
						placeholder='Username'
						className={styles.userInput}
						required
					/>
					<input
						type='email'
						placeholder='Email'
						className={styles.emailInput}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						className={styles.passInput}
						required
					/>
					{/* <input
					type='password'
					placeholder='Confirm Password'
					className={styles.passInput}
					required
				/> */}
					<SignUpBtn />
				</form>
				{err && (
					<p className={styles.errMssg}>
						Oh no! Something went wrong!
					</p>
				)}
				<p className={styles.text}>
					Already a user ?{' '}
					<Link className={styles.textLink} to='/login'>
						Log In!
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUpForm;
