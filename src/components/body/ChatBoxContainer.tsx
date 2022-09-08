import React from 'react';
import { ChatBox } from '../exporter';

type Props = unknown;
type Styles = {
	chatBoxContainer: string;
};

const ChatBoxContainer = (props: Props) => {
	const styles: Styles = {
		chatBoxContainer:
			'flex flex-col-reverse justify-items-end gap-4 m-2 h-[94.5%] overflow-y-scroll scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
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
