import React from 'react';
import { ChatTypeButton, TurnManager } from '../exporter';

type Props = unknown;

const ChatInput = (props: Props) => {
	const styles = {
		container:
			'overflow-y-auto bg-purple-200 rounded-lg flex flex-col justify-between mb-4 ',
		textArea:
			'h-[25%] w-[90%] resize-none p-1 mx-1 my-1 caret-purple-500 outline-purple-500 rounded-lg',
		button: 'm-1 py-1 px-2 border-2 border-purple-500 bg-purple-300 hover:bg-purple-200',
	};

	return (
		<div className={styles.container}>
			<div>
				<TurnManager />
				<ChatTypeButton />
			</div>
			<textarea className={styles.textArea} />
		</div>
	);
};

export default ChatInput;
