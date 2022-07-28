import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = unknown;
type Styles = {
	container: string;
	text: string;
	icon: string;
};

const LogOutControl = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-row gap-1 bg-purple-400 rounded-xl w-fit pr-2',
		text: 'm-auto',
		icon: 'bg-purple-500 p-2 rounded-l-xl',
	};

	const logOutIcon = (
		<FontAwesomeIcon
			icon={solid('arrow-right-from-bracket')}
			className={styles.icon}
		/>
	);

	return (
		<button className={styles.container}>
			{logOutIcon}
			<p className={styles.text}>Log Out</p>
		</button>
	);
};

export default LogOutControl;
