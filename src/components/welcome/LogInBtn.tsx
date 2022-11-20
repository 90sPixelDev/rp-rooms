import React from 'react';

type Props = unknown;
type Styles = {
	body: string;
};

const LogInBtn = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-700 h-8 w-20 rounded-lg text-white hover:bg-purple-600 my-4 m-auto',
	};

	return <button className={styles.body}>Log In</button>;
};

export default LogInBtn;
