import React from 'react';
import RoomContainer from './RoomContainer';
import RoomsSearch from './RoomsSearch';

import { UserRoomsList } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
};

const RoomListContainer = (props: Props) => {
	const styles: Styles = {
		container: 'bg-purple-200 rounded-2xl ml-4',
	};

	return (
		<div className={styles.container}>
			<RoomContainer />
			<RoomContainer />
			<RoomContainer />
			<RoomContainer />
		</div>
	);
};

export default RoomListContainer;
