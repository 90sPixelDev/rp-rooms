import React, { useState, useContext, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { ChatBox } from '../exporter';
import { UserContext } from '../../context/AuthContext';

interface MessagesInfo {
	userName: string;
	message: string;
	uid: string;
	timeSent: string;
}
type Props = {
	messages: MessagesInfo[];
};
type Styles = {
	chatBoxContainer: string;
};

const ChatBoxContainer = (props: Props) => {
	const styles: Styles = {
		chatBoxContainer:
			'flex flex-col justify-end gap-2 m-2 h-[96%] overflow-y-scroll scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
	};

	const [messages, setMessages] = useState<MessagesInfo[] | null>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [refreshMssgs, setRefreshMssgs] = useState<boolean>(false);
	const { currentUser } = useContext(UserContext);

	return (
		<div className={styles.chatBoxContainer}>
			{props.messages.map((mssg) => (
				<ChatBox
					key={Math.random() * 9}
					charaName={mssg.userName}
					charaMssg={mssg.message}
				/>
			))}
			{/* <ChatBox /> */}
		</div>
	);
};

export default ChatBoxContainer;
