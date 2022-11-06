import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { LogInBtn } from '../exporter';

type Props = any;
type Styles = {
	body: string;
	container: string;
	title: string;
	formContainer: string;
	userInput: string;
	passInput: string;
	text: string;
	textLink: string;
	errMssg: string;
};

const LogInForm = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 h-[100vh] w-[100vw] flex flex-col place-content-center place-items-center',
		container:
			'bg-purple-400 max-w-[300px] max-h-[300px] min-h-[200px] min-w-[300px]  rounded-lg shadow-lg shadow-purple-900',
		title: 'text-lg text-center p-2 bg-purple-300 rounded-t-lg mb-4',
		formContainer: 'flex flex-col place-items-center',
		userInput:
			'p-1 w-fit mb-6 bg-transparent border-b-2 border-purple-200/90 focus:border-white outline-none placeholder-purple-300 caret-purple-100 text-white',
		passInput:
			'p-1 w-fit bg-transparent border-b-2 border-purple-200/90 focus:border-white outline-none  placeholder-purple-300 caret-purple-100 text-white',
		text: ' text-center',
		textLink: 'underline text-purple-900 hover:text-purple-200',
		errMssg: 'text-red-700 font-bold w-full text-center',
	};

	const navigate = useNavigate();

	const [err, setErr] = useState(false);

	const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailInput = e.currentTarget[0] as HTMLInputElement;
		const passwordInput = e.currentTarget[1] as HTMLInputElement;

		signInWithEmailAndPassword(
			auth,
			emailInput.value,
			passwordInput.value
		)
			.then((userCredential) => {
				const user = userCredential.user;
				navigate('/');
			})
			.catch((err) => {
				const errorCode = err.code;
				const errorMessage = err.message;
			});
	};

	return (
		<div className={styles.body}>
			<div className={styles.container}>
				<h1 className={styles.title}>Log In</h1>
				<form
					className={styles.formContainer}
					onClick={handleLogIn}
				>
					<input
						type='email'
						placeholder='Email'
						className={styles.userInput}
					/>
					<input
						type='password'
						placeholder='Password'
						className={styles.passInput}
					/>
					<LogInBtn />
				</form>
				{err && (
					<p className={styles.errMssg}>
						Oh no! Something went wrong!
					</p>
				)}
				<p className={styles.text}>
					Not a user ?{' '}
					<Link className={styles.textLink} to='/signup'>
						Sign Up!
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LogInForm;
