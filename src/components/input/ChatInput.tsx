import React from 'react';
import { ChatTypeButton, TurnManager, ChatSend } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
	textArea: string;
	button: string;
	bttnArea: string;
	mssgArea: string;
};

const ChatInput = (props: Props) => {
	const styles: Styles = {
		container:
			'overflow-y-auto bg-purple-200 rounded-lg flex flex-col justify-between mb-4 ',
		textArea:
			'h-[70%] w-[90%] resize-none p-1 mx-1 my-auto caret-purple-500 outline-purple-500 rounded-lg',
		button: 'm-1 py-1 px-2 border-2 border-purple-500 bg-purple-300 hover:bg-purple-200',
		bttnArea: 'bg-purple-200',
		mssgArea:
			'flex flex-row h-fit bg-purple-300 rounded-tr-lg rounded-tl-lg h-[45%] border-2 border-purple-400',
	};

	return (
		<div className={styles.container}>
			<div className={styles.bttnArea}>
				<TurnManager />
				<ChatTypeButton />
			</div>
			<div className={styles.mssgArea}>
				<textarea className={styles.textArea} />
				<ChatSend />
			</div>
		</div>
	);
};

export default ChatInput;
