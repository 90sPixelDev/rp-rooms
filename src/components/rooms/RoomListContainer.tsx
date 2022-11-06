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
		container:
			'bg-purple-200 rounded-2xl ml-4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
	};

	return (
		<div className={styles.container}>
			<RoomContainer />
		</div>
	);
};

export default RoomListContainer;
