import React from 'react';

type Props = unknown;
type Styles = {
	container: string;
	charaName: string;
	chatBoxText: string;
};

const ChatBox = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-300 h-fit w-fit p-2 rounded-xl shadow-md shadow-purple-800/50',
		charaName: 'font-bold',
		chatBoxText: 'italic',
	};

	return (
		<div className={styles.container}>
			<p className={styles.charaName}>Character Name:</p>
			<p className={styles.chatBoxText}>
				Test quote from a character.
			</p>
		</div>
	);
};

export default ChatBox;
