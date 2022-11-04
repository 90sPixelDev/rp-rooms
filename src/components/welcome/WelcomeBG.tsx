import React from 'react';

import { LogInForm } from '../exporter';

type Props = unknown;
type Styles = {
	body: string;
};

const WelcomeBG = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 h-[100vh] w-[100vw] flex place-content-center place-items-center',
	};

	return (
		<div className={styles.body}>
			<LogInForm />
		</div>
	);
};

export default WelcomeBG;
