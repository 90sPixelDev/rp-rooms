import React, { useState, useEffect } from 'react';
import { Room } from '../exporter';

type Styles = {
	roomParent: string;
};
interface Props {
	title: string;
	highlightedRoom: string;
	roomChanged: (room: string) => void;
}

const RoomContainer = (props: Props) => {
	const styles: Styles = {
		roomParent:
			'bg-purple-200 w-[100%] rounded-r-full flex flex-col mx-auto',
	};

	const [selectedRoomTitle, setSelectedRoomTitle] = useState<
		string | null
	>();

	const selectRoom = () => {
		props.roomChanged(props.title);
	};

	if (
		selectedRoomTitle === null ||
		selectedRoomTitle === undefined ||
		selectedRoomTitle == ''
	) {
		setSelectedRoomTitle(props.highlightedRoom);
	}

	return (
		<>
			{selectedRoomTitle && (
				<div className={styles.roomParent} onClick={selectRoom}>
					<Room
						selected={
							props.title === selectedRoomTitle
								? true
								: false
						}
						title={props.title}
					/>
				</div>
			)}
			{!selectedRoomTitle && <p>Selected Room Loading!</p>}
		</>
	);
};

export default RoomContainer;
