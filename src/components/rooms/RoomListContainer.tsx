import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import RoomContainer from './RoomContainer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

import RoomsSearch from './RoomsSearch';
import { UserRoomsList } from '../exporter';

type Props = any;
type Styles = {
	container: string;
};

const RoomListContainer = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-200 rounded-2xl ml-4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
	};

	const [isLoading, setIsLoading] = useState(true);

	const { currentUser } = useContext(UserContext);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<p>Loading Rooms...</p>
			) : (
				props.userRooms.map((room: any) => (
					<RoomContainer
						key={Math.random() * 9}
						title={room}
						roomIsSelected={props.roomInfoReceived}
					/>
				))
			)}
		</div>
	);
};

export default RoomListContainer;
