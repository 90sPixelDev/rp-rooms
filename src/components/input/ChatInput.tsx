import React, { useState, useContext } from 'react';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';
import {
	doc,
	setDoc,
	addDoc,
	Timestamp,
	arrayUnion,
	query,
	where,
	collection,
	updateDoc,
} from 'firebase/firestore';

import { ChatTypeButton, TurnManager, ChatSend } from '../exporter';

interface Props {
	roomSelectedInfo: string;
	callRefreshMessages: (text: string) => void;
}
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
			'overflow-hidden bg-purple-200 rounded-lg flex flex-col justify-around px-1',
		textArea:
			'h-[70%] w-[90%] h-fit resize-none sd mx-1 my-auto caret-purple-500 outline-purple-500 rounded-lg grow-0',
		button: 'm-1 py-1 px-2 border-2 border-purple-500 bg-purple-300 hover:bg-purple-200',
		bttnArea: 'bg-purple-200',
		mssgArea:
			'flex flex-row bg-purple-300 rounded-tr-lg rounded-tl-lg border-2 border-purple-400 h-fit',
	};

	const [tempTypedMssg, setTempTypedMssg] = useState<string>('');
	const { currentUser } = useContext(UserContext);

	const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const typedText = e.target.value;
		setTempTypedMssg(typedText);
	};

	const validateKeyPress = async (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (e.code === 'Enter') {
			sendMessage();
		}
	};

	const sendMessage = async () => {
		const uid = currentUser.uid;
		const mssgFormat = {
			message: tempTypedMssg,
			email: currentUser.email,
			userName: currentUser.displayName,
			uid: uid,
			timeSent: Timestamp.now(),
		};

		const roomRef = doc(db, 'rooms', props.roomSelectedInfo);
		await updateDoc(roomRef, {
			messages: arrayUnion({ ...mssgFormat }),
		});
		props.callRefreshMessages(props.roomSelectedInfo);
		setTempTypedMssg('');
	};

	return (
		<div className={styles.container}>
			<div className={styles.bttnArea}>
				<TurnManager />
				<ChatTypeButton />
			</div>
			<div className={styles.mssgArea}>
				<textarea
					className={styles.textArea}
					onChange={(e) => updateText(e)}
					onKeyDown={(e) => validateKeyPress(e)}
					value={tempTypedMssg}
				/>
				<ChatSend sendMssg={sendMessage} />
			</div>
		</div>
	);
};

export default ChatInput;
