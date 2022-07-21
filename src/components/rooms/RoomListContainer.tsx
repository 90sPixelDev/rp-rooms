import React from 'react';
import RoomContainer from './RoomContainer';

type Props = {};

const RoomListContainer = (props: Props) => {
	const styles = {
		sideBar: 'bg-purple-300 rounded-br-2xl rounded-tr-2xl',
		roomsTitle: 'text-center font-bold text-lg',
	};

	return (
		<div className={styles.sideBar}>
			<p className={styles.roomsTitle}>RP Rooms</p>
			<RoomContainer />
			<RoomContainer />
			<RoomContainer />
			<RoomContainer />
		</div>
	);
};

export default RoomListContainer;
