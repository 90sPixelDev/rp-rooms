import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

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
	refresh: boolean;
}
type Styles = {
	body: string;
};

const ChatBody = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 rounded-b-2xl h-full flex flex-col',
	};

	const [messagesArray, setMessagesArray] = useState<MessageInfo[]>([]);
	const [currentCh, setCurrentCh] = useState<object>({});
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);

	const getRoomInfo = () => {
		// TODO getDocs of Room like Room Story Events, Room Characters, Room Chapters, as well as Room messages of course and then conver to need state formate and pass down as prop to children
	};

	const getMessages = async () => {
		const roomRef = doc(db, 'rooms', props.roomTitle);
		const docSnap = await getDoc(roomRef);

		if (docSnap.exists()) {
			setCurrentCh(docSnap.data().currentChapter);
			const mssgArr = docSnap.data().messages;

			setMessagesArray(mssgArr.map((msg: any) => msg));
		} else {
			// doc.data() will be undefined in this case
			console.log('No such document!');
		}
	};

	useEffect(() => {
		props.roomTitle && getMessages();
	}, [props.roomTitle, props.refresh]);

	useEffect(() => {
		if (messagesArray[0] !== undefined) {
			setIsLoading(false);
		}
	}, [messagesArray[0]]);

	return (
		<div className={styles.body}>
			<RoomTopTitle currentChInfo={currentCh} />
			<ChatBoxContainer
				messages={messagesArray}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default ChatBody;
