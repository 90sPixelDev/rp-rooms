import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = unknown;
type Styles = {
	body: string;
	icon: string;
};

const ChatSend = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-400 w-20 ml-2 rounded-tr-lg flex flex-row justify-center hover:text-purple-700',
		icon: 'm-auto h-[40%] w-[40%]',
	};

	const sendIcon = (
		<FontAwesomeIcon
			icon={solid('paper-plane')}
			size='lg'
			className={styles.icon}
		/>
	);

	return <button className={styles.body}>{sendIcon}</button>;
};

export default ChatSend;
