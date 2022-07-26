import React from 'react';
import { ChatBox } from '../exporter';

type Props = unknown;
type Styles = {
	chatBoxContainer: string;
};

const ChatBoxContainer = (props: Props) => {
	const styles: Styles = {
		chatBoxContainer:
			'flex flex-col-reverse justify-items-end gap-4 m-2 h-[100%] overflow-y-scroll',
	};

	return (
		<div className={styles.chatBoxContainer}>
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
			<ChatBox />
		</div>
	);
};

export default ChatBoxContainer;
