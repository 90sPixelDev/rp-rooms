import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import RoomContainer from './RoomContainer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

import loadingAnim from '../../resources/ui/loading-anim.svg';

import RoomsSearch from './RoomsSearch';

interface Props {
	listOfRooms: string[];
	callRefreshMessages: (text: string) => void;
}
type Styles = {
	container: string;
};

const RoomListContainer = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-200 rounded-tr-lg overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-full transition',
	};

	const [isLoading, setIsLoading] = useState(true);
	const [highlightedRoom, setHighLightedRoom] = useState('');

	const roomSelectionHandler = (selection: string) => {
		setHighLightedRoom(selection);
		props.callRefreshMessages(selection);
	};

	useEffect(() => {
		if (props.listOfRooms && highlightedRoom === '') {
			setHighLightedRoom(props.listOfRooms[0]);
			setIsLoading(false);
		}
	}, [, props.listOfRooms]);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<img src={loadingAnim} />
			) : (
				props.listOfRooms.map((room: any) => (
					<RoomContainer
						key={Math.random() * 9}
						title={room}
						highlightedRoom={highlightedRoom}
						roomChanged={roomSelectionHandler}
					/>
				))
			)}
		</div>
	);
};

export default RoomListContainer;
