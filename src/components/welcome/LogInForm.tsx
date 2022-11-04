import React from 'react';

import { LogInBtn } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
	title: string;
	formContainer: string;
	userInput: string;
	passInput: string;
};

const LogInForm = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-400 h-[30vw] max-w-[300px] w-[30vw] max-h-[300px] rounded-lg shadow-lg shadow-purple-900',
		title: 'text-lg text-center p-2 bg-purple-300 rounded-t-lg mb-4',
		formContainer: 'flex flex-col place-items-center',
		userInput:
			'p-1 w-[17vw] mb-6 bg-transparent border-b-2 border-white outline-none placeholder-purple-300 caret-purple-100 text-white',
		passInput:
			'p-1 w-[17vw] bg-transparent border-b-2 border-white outline-none  placeholder-purple-300 caret-purple-100 text-white',
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Log In</h1>
			<form className={styles.formContainer}>
				<input
					type='text'
					placeholder='Username'
					className={styles.userInput}
				/>
				<input
					type='text'
					placeholder='Password'
					className={styles.passInput}
				/>
				<LogInBtn />
			</form>
		</div>
	);
};

export default LogInForm;
