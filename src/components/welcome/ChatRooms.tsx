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

interface MessageInfo {
	userName: string;
	message: string;
	uid: string;
	timeSent: string;
	email: string;
}
type InitialMssgInfo = {
	message: string;
};
type Styles = {
	wrapperROpen: string;
	wrapperRClosed: string;
};

const ChatRooms = () => {
	const styles = {
		wrapperROpen:
			'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute',
		wrapperRClosed:
			'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute',
	};

	const { currentUser } = useContext(UserContext);

	const [userRooms, setUserRooms] = useState<string[]>([]);
	const [selectedRoomTitle, setSelectedRoomTitle] = useState('');
	const [update, setUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isOpened, setIsOpened] = useState(false);

	const refreshMessages = (newRoomName: string) => {
		setSelectedRoomTitle(newRoomName);

		setUpdate((prevState: boolean) => !prevState);
	};

	const GetRooms = async () => {
		const userRoomsQuery = query(
			collection(db, 'rooms'),
			where('user', 'array-contains', currentUser.uid)
		);

		const userRoomsData = await getDocs(userRoomsQuery);

		setUserRooms(userRoomsData.docs.map((doc: any) => doc.id));
	};

	const toggleRightBar = () => {
		setIsOpened((prevState: boolean) => !prevState);
	};

	useEffect(() => {
		GetRooms();
	}, [update, isLoading]);

	useEffect(() => {
		if (
			userRooms != undefined &&
			userRooms != null &&
			(selectedRoomTitle == null ||
				selectedRoomTitle == undefined ||
				selectedRoomTitle == '')
		) {
			setSelectedRoomTitle(userRooms[0]);
			setIsLoading(false);
		}
	}, [userRooms.length]);

	if (isOpened)
		return (
			<div className={styles.wrapperROpen}>
				<LeftBar
					listOfRooms={userRooms}
					callRefreshMessages={refreshMessages}
				/>
				<ChatBody roomTitle={selectedRoomTitle} refresh={update} />
				<RightBar
					toggleRightBar={toggleRightBar}
					isOpened={isOpened}
				/>
				<UserControlsContainer />
				<ChatInput
					roomSelectedInfo={selectedRoomTitle}
					callRefreshMessages={refreshMessages}
				/>
			</div>
		);

	return (
		<div className={styles.wrapperRClosed}>
			<LeftBar
				listOfRooms={userRooms}
				callRefreshMessages={refreshMessages}
			/>
			<ChatBody roomTitle={selectedRoomTitle} refresh={update} />
			<RightBar toggleRightBar={toggleRightBar} isOpened={isOpened} />
			<UserControlsContainer />
			<ChatInput
				roomSelectedInfo={selectedRoomTitle}
				callRefreshMessages={refreshMessages}
			/>
		</div>
	);
};

export default ChatRooms;
