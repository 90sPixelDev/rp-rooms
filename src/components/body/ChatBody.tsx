import React from 'react';
import { ChatBoxContainer, RoomTopTitle } from '../exporter';

type Props = unknown;
type Styles = {
	body: string;
	chatBoxContainer: string;
};

const ChatBody = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 rounded-2xl',
		chatBoxContainer: 'flex flex-col gap-2',
	};

	return (
		<div className={styles.body}>
			<RoomTopTitle />
			<ChatBoxContainer />
		</div>
	);
};

export default ChatBody;
