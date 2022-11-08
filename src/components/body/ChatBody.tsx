import React, { useState, useEffect } from 'react';
import { ChatBoxContainer, RoomTopTitle } from '../exporter';

interface MessageInfo {
	userName: string;
	message: string;
	uid: string;
	timeSent: string;
}
type InitialMssgInfo = {
	message: string;
};
interface Props {
	roomTitle: string;
	messages: MessageInfo[];
}
type Styles = {
	body: string;
	chatBoxContainer: string;
};

const ChatBody = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 rounded-2xl',
		chatBoxContainer: 'flex flex-col gap-2',
	};

	const [users, setUsers] = useState({});

	const getRoomInfo = () => {
		// TODO getDocs of Room like Room Story Events, Room Characters, Room Chapters, as well as Room messages of course and then conver to need state formate and pass down as prop to children
	};

	// useEffect(() => {
	// 	const unsub = () => console.log(props.messages);

	// 	return unsub;
	// }, [, props.messages]);

	return (
		<div className={styles.body}>
			<RoomTopTitle />
			<ChatBoxContainer messages={props.messages} />
		</div>
	);
};

export default ChatBody;
