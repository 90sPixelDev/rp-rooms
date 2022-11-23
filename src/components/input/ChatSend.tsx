import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface Props {
	sendMssg: () => void;
}
type Styles = {
	body: string;
	icon: string;
};

const ChatSend = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-400 rounded-tr-lg flex flex-row justify-center hover:text-purple-700 grow w-[10%]',
		icon: 'm-auto h-[40%] w-[40%]',
	};

	const sendIcon = (
		<FontAwesomeIcon
			icon={solid('paper-plane')}
			size='lg'
			className={styles.icon}
		/>
	);

	return (
		<button className={styles.body} onClick={props.sendMssg}>
			{sendIcon}
		</button>
	);
};

export default ChatSend;
