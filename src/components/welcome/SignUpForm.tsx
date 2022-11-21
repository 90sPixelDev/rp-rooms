import react, { useState, useEffect, useReducer } from 'react';
import { UserContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
	doc,
	setDoc,
	arrayUnion,
	collection,
	getDoc,
} from 'firebase/firestore';
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
	passSection: string;
	eyeIconShow: string;
	eyeIconHide: string;
};

const SignUpForm = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 h-[100vh] w-[100vw] flex flex-col place-content-center place-items-center',
		container:
			'bg-purple-400 min-h-[200px] min-w-[300px] rounded-lg shadow-lg shadow-purple-900',
		title: 'text-lg text-center p-2 bg-purple-300 rounded-t-lg mb-4',
		formContainer: 'flex flex-col',
		userInput:
			'p-1 mx-14 bg-transparent border-b-2 border-purple-300/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white transition',
		emailInput:
			'p-1 mt-2 mx-14 bg-transparent border-b-2 border-purple-300/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white transition',
		passInput:
			'p-1 mt-2 ml-14 bg-transparent border-b-2 border-purple-300/90 focus:border-white outline-none  placeholder-purple-300 caret-purple-100 text-white transition',
		text: 'text-center',
		textLink: 'underline text-purple-900 hover:text-purple-200',
		errMssg: 'text-red-700 font-bold w-full text-center',
		passSection: 'flex flex-row items-center ',
		eyeIconShow:
			'cursor-pointer hover:bg-[rgba(100,0,255,0.5)] p-2 flow-root rounded-lg',
		eyeIconHide:
			'cursor-pointer hover:bg-[rgba(100,0,255,0.5)] p-2 rounded-lg',
	};

	const navigate = useNavigate();

	const [err, setErr] = useState(false);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);

	const [pass, setPass] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const usernameInput = e.currentTarget[0] as HTMLInputElement;
		const emailInput = e.currentTarget[1] as HTMLInputElement;
		const passwordInput = e.currentTarget[2] as HTMLInputElement;

		if (emailValid && username.length > 3) {
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
		}
	};

	const setUserInfo = async (userInfo: any) => {
		const uid = userInfo.uid;
		await updateProfile(userInfo, {
			displayName: username,
		});
		await setDoc(doc(db, 'users', userInfo.uid), {
			email: userInfo.email,
			displayName: username,
		});

		const newRoomRef = doc(db, 'rooms', 'RP Rooms Community');
		const newRoomRef2 = doc(db, 'rooms', 'Test Room');
		const docSnap = await getDoc(newRoomRef);
		const docSnap2 = await getDoc(newRoomRef);

		if (docSnap.exists()) {
			await setDoc(
				doc(db, 'rooms', 'RP Rooms Community'),
				{
					user: arrayUnion(uid),
				},
				{ merge: true }
			);
		} else {
			await setDoc(
				newRoomRef,
				{
					roomTitle: 'RP Rooms Community',
					currentTurn: '',
					currentChapter: {
						num: '0',
						desc: 'A new beginning!',
					},
					user: arrayUnion(uid),
					messages: [],
				},
				{ merge: true }
			);
		}
		if (docSnap2.exists()) {
			await setDoc(
				doc(db, 'rooms', 'Test Room'),
				{
					user: arrayUnion(uid),
				},
				{ merge: true }
			);
		} else {
			await setDoc(
				newRoomRef2,
				{
					roomTitle: 'Test Room',
					currentTurn: '',
					currentChapter: {
						num: '0',
						desc: 'A new beginning!',
					},
					user: arrayUnion(uid),
					messages: [],
				},
				{ merge: true }
			);
		}
		navigate('/');
	};

	const passUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPass((prevState) => (prevState = e.target.value));
	};

	const validateEmail = (e: react.ChangeEvent<HTMLInputElement>) => {
		setEmail((prevState) => (prevState = e.target.value));

		if (e.target.value.includes('@') && e.target.value.includes('.')) {
			setEmailValid(true);
		} else {
			setEmailValid(false);
		}
	};

	// const passwordConfirmShow = (
	// 	<div className={styles.passSection}>
	// 		<input
	// 			type='test'
	// 			placeholder='Confirm Password'
	// 			className={styles.passInput}
	// 			required
	// 		/>
	// 		<FontAwesomeIcon
	// 			icon={solid('eye')}
	// 			className={styles.eyeIconShow}
	// 			onClick={() => {
	// 				setShowPasswordConfirm((prevState) => !prevState);
	// 			}}
	// 		/>
	// 	</div>
	// );
	// const passwordConfirmHide = (
	// 	<div className={styles.passSection}>
	// 		<input
	// 			type='password'
	// 			placeholder='Confirm Password'
	// 			className={styles.passInput}
	// 			required
	// 		/>
	// 		<FontAwesomeIcon
	// 			icon={solid('eye-slash')}
	// 			className={styles.eyeIconShow}
	// 			onClick={() => {
	// 				setShowPasswordConfirm((prevState) => !prevState);
	// 			}}
	// 		/>
	// 	</div>
	// );

	const passwordShow = (
		<div className={styles.passSection}>
			<input
				type='text'
				placeholder='Password'
				className={styles.passInput}
				required
			/>
			<FontAwesomeIcon
				icon={solid('eye')}
				className={styles.eyeIconShow}
				onClick={() => {
					setShowPassword((prevState) => !prevState);
				}}
			/>
		</div>
	);
	const passwordHide = (
		<div className={styles.passSection}>
			<input
				type='password'
				placeholder='Password'
				className={styles.passInput}
				onChange={(e) => {
					passUpdate(e);
				}}
				required
			/>
			<FontAwesomeIcon
				icon={solid('eye-slash')}
				className={styles.eyeIconHide}
				onClick={() => {
					setShowPassword((prevState) => !prevState);
				}}
			/>
		</div>
	);

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
						onChange={(e) => {
							setUsername(
								(prevState) =>
									(prevState = e.target.value)
							);
						}}
						required
					/>
					<input
						type='email'
						placeholder='Email'
						className={styles.emailInput}
						onChange={(e) => {
							validateEmail(e);
						}}
						required
					/>
					{showPassword ? passwordShow : passwordHide}
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