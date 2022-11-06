import React from 'react';

type Props = unknown;
type Styles = {
	body: string;
};

const SignUpBtn = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-700 h-8 w-20 rounded-lg text-white hover:bg-purple-600 m-4',
	};

	return <button className={styles.body}>Sign Up</button>;
};

export default SignUpBtn;
