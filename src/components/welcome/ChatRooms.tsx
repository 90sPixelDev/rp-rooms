import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
	RoomControlsContainer,
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
	wrapperLOpen: string;
	wrapperBOpen: string;
	wrapperClosed: string;
};

const ChatRooms = () => {
	const styles = {
		wrapperROpen:
			'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute',
		wrapperLOpen:
			'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[250px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute',
		wrapperBOpen:
			'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute',
		wrapperClosed:
			'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[45px_1fr_45px] grid-rows-[minmax(50%,_85%)_minmax(170px,_20%)] absolute',
	};

	const { currentUser } = useContext(UserContext);

	const [userRooms, setUserRooms] = useState<string[] | null>(null);
	const [selectedRoomTitle, setSelectedRoomTitle] = useState('');
	const [update, setUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isRBOpened, setRBIsOpened] = useState(false);
	const [isLBOpened, setLBIsOpened] = useState(false);
	const [currentTab, setCurrentTab] = useState('chat');

	const changeTab = (tab: string) => {
		setCurrentTab(tab);
	};

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
		setRBIsOpened((prevState: boolean) => !prevState);
	};
	const toggleLeftBar = () => {
		setLBIsOpened((prevState: boolean) => !prevState);
	};

	useEffect(() => {
		GetRooms();
	}, [update, isLoading, currentTab]);

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
	}, [userRooms?.length]);

	const renderSideBarsConditionally = () => {
		switch (true) {
			case isLBOpened && isRBOpened:
				return (
					<div className={styles.wrapperBOpen}>
						<LeftBar
							listOfRooms={userRooms as string[]}
							callRefreshMessages={refreshMessages}
							toggleLeftBar={toggleLeftBar}
							isOpened={isLBOpened}
						/>
						<ChatBody
							roomTitle={selectedRoomTitle}
							refresh={update}
							currentTab={currentTab}
							changeTab={changeTab}
						/>
						<RightBar
							toggleRightBar={toggleRightBar}
							isOpened={isRBOpened}
						/>
						<UserControlsContainer isOpened={isLBOpened} />
						<ChatInput
							roomSelectedInfo={selectedRoomTitle}
							callRefreshMessages={refreshMessages}
							currentTab={currentTab}
						/>
						<RoomControlsContainer
							roomTitle={selectedRoomTitle}
						/>
					</div>
				);
			case !isLBOpened && !isRBOpened:
				return (
					<div className={styles.wrapperClosed}>
						<LeftBar
							listOfRooms={userRooms as string[]}
							callRefreshMessages={refreshMessages}
							toggleLeftBar={toggleLeftBar}
							isOpened={isLBOpened}
						/>
						<ChatBody
							roomTitle={selectedRoomTitle}
							refresh={update}
							currentTab={currentTab}
							changeTab={changeTab}
						/>
						<RightBar
							toggleRightBar={toggleRightBar}
							isOpened={isRBOpened}
						/>
						<UserControlsContainer isOpened={isLBOpened} />
						<ChatInput
							roomSelectedInfo={selectedRoomTitle}
							callRefreshMessages={refreshMessages}
							currentTab={currentTab}
						/>
						<RoomControlsContainer
							roomTitle={selectedRoomTitle}
						/>
					</div>
				);
			case !isLBOpened && isRBOpened:
				return (
					<div className={styles.wrapperROpen}>
						<LeftBar
							listOfRooms={userRooms as string[]}
							callRefreshMessages={refreshMessages}
							toggleLeftBar={toggleLeftBar}
							isOpened={isLBOpened}
						/>
						<ChatBody
							roomTitle={selectedRoomTitle}
							refresh={update}
							currentTab={currentTab}
							changeTab={changeTab}
						/>
						<RightBar
							toggleRightBar={toggleRightBar}
							isOpened={isRBOpened}
						/>
						<UserControlsContainer isOpened={isLBOpened} />
						<ChatInput
							roomSelectedInfo={selectedRoomTitle}
							callRefreshMessages={refreshMessages}
							currentTab={currentTab}
						/>
						<RoomControlsContainer
							roomTitle={selectedRoomTitle}
						/>
					</div>
				);
			case isLBOpened && !isRBOpened:
				return (
					<div className={styles.wrapperLOpen}>
						<LeftBar
							listOfRooms={userRooms as string[]}
							callRefreshMessages={refreshMessages}
							toggleLeftBar={toggleLeftBar}
							isOpened={isLBOpened}
						/>
						<ChatBody
							roomTitle={selectedRoomTitle}
							refresh={update}
							currentTab={currentTab}
							changeTab={changeTab}
						/>
						<RightBar
							toggleRightBar={toggleRightBar}
							isOpened={isRBOpened}
						/>
						<UserControlsContainer isOpened={isLBOpened} />
						<ChatInput
							roomSelectedInfo={selectedRoomTitle}
							callRefreshMessages={refreshMessages}
							currentTab={currentTab}
						/>
						<RoomControlsContainer
							roomTitle={selectedRoomTitle}
						/>
					</div>
				);
			default:
				return <p>FATAL ERROR!</p>;
		}
	};

	return <>{renderSideBarsConditionally()}</>;
};

export default ChatRooms;
