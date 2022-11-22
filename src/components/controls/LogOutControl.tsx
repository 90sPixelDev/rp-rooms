import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

interface Props {
	isOpened: boolean;
}
type Styles = {
	container: string;
	text: string;
	icon: string;
	iconClosed: string;
};

const LogOutControl = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-row gap-1 bg-purple-400 rounded-xl w-fit pr-2 hover:text-purple-200 min-w-fit w-[7rem]',
		text: 'm-auto',
		icon: 'bg-purple-500 p-2 rounded-l-xl',
		iconClosed: 'bg-purple-500 p-2 rounded-r-xl',
	};

	if (props.isOpened)
		return (
			<button
				className={styles.container}
				onClick={() => signOut(auth)}
			>
				<FontAwesomeIcon
					icon={solid('arrow-right-from-bracket')}
					className={styles.icon}
				/>
				<p className={styles.text}>Log Out</p>
			</button>
		);
	return (
		<FontAwesomeIcon
			icon={solid('arrow-right-from-bracket')}
			className={styles.iconClosed}
		/>
	);
};

export default LogOutControl;
