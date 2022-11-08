import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import {
	collection,
	query,
	where,
	getDocs,
	getDoc,
	doc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';

import {
	ChatBody,
	ChatInput,
	UserControlsContainer,
	LeftBar,
	RightBar,
} from '../exporter';

type Props = unknown;
interface MessageInfo {
	userName: string;
	message: string;
	uid: string;
	timeSent: string;
}
type InitialMssgInfo = {
	message: string;
};
type Styles = {
	wrapper: string;
};

const ChatRooms = (props: Props) => {
	const styles = {
		wrapper: 'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[85%_minmax(50px,_350px)] absolute',
	};

	const { currentUser } = useContext(UserContext);

	const [userRooms, setUserRooms] = useState<string[]>([]);
	const [selectedRoomTitle, setSelectedRoomTitle] = useState('');
	const [update, setUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [messagesArray, setMessagesArray] = useState<MessageInfo[]>([
		{
			userName: 'Endless',
			message: 'A test message.',
			uid: 'wfTlmqJph6bSXjWl7u0bBpCI0NC3',
			timeSent: '11-2-22',
		},
		{
			userName: 'Rafiki',
			message: 'The 2nd one to write!',
			uid: 'QMnCEYjjwMSeIDXqkVYvkHGNmAG2',
			timeSent: '11-5-22',
		},
		{
			userName: 'Gigi',
			message: 'A big random message to write so that I can fill the whole width to test how the timestamp shows up on the screen hurrah!!',
			uid: 'QMnCEYjjwMSeIDXqkVYvkHGNmAG2',
			timeSent: '11-5-22',
		},
	]);
	const [newMssg, setNewMssg] = useState<MessageInfo | InitialMssgInfo>({
		message: '',
	});

	const refreshRooms = () => {
		setUpdate((prevState: boolean) => !prevState);
	};

	const GetRooms = async () => {
		const roomsRef = collection(db, 'Rooms');
		const userRoomsQuery = query(
			roomsRef,
			where('users', 'array-contains', currentUser.uid)
		);
		// console.log(userRoomsQuery);

		const querySnapshot = await getDocs(userRoomsQuery);
		!querySnapshot
			? console.log('No Data')
			: setUserRooms(querySnapshot.docs.map((doc: any) => doc.id));

		if (
			selectedRoomTitle === '' ||
			selectedRoomTitle === null ||
			selectedRoomTitle == undefined
		) {
			setSelectedRoomTitle(userRooms[0]);
			getMessages();
		}
	};

	const getMessages = async () => {
		const roomRef = doc(db, 'Rooms', selectedRoomTitle);
		const messagesDocSnap = await getDoc(roomRef);

		console.log(messagesDocSnap);

		// if (messagesDocSnap.exists()) {
		// 	console.log('Document data:', messagesDocSnap.data());
		// } else {
		// 	// doc.data() will be undefined in this case
		// 	console.log('No such document!');
		// }
	};

	useEffect(() => {
		return () => {
			GetRooms();
		};
	}, [, update]);

	setTimeout(() => setIsLoading(false), 500);

	return (
		<div className={styles.wrapper}>
			<LeftBar
				selectedRoom={selectedRoomTitle}
				listOfRooms={userRooms}
			/>
			<ChatBody
				roomTitle={selectedRoomTitle}
				messages={messagesArray}
			/>
			<RightBar />
			<UserControlsContainer />
			<ChatInput roomSelectedInfo={selectedRoomTitle} />
		</div>
	);
};

export default ChatRooms;
