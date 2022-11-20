import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = unknown;
type Styles = {
	container: string;
	btn: string;
	skipBtn: string;
	icon: string;
};

const ChatTypeButtons = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-row overflow-x-auto h-12 overflow-y-hidden xsm:text-sm lg:text-base',
		btn: 'm-1 mt-1 px-2 border-[1px] border-purple-400 bg-purple-300 hover:bg-purple-200 rounded-lg ',
		skipBtn: 'm-1 mt-1 px-2 border-[1px] border-red-400 bg-red-300 hover:bg-red-200 rounded-lg',
		icon: '',
	};

	const skipIcon = (
		<FontAwesomeIcon
			icon={solid('angles-right')}
			size='lg'
			className={styles.icon}
		/>
	);

	return (
		<div className={styles.container}>
			<button className={styles.btn}>Narrator</button>
			<button className={styles.btn}>New Chapter</button>
			<button className={styles.btn}>New Event</button>
			<button className={styles.skipBtn}>Skip Turn {skipIcon}</button>
		</div>
	);
};

export default ChatTypeButtons;
