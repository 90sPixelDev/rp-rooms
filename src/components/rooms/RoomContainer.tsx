import React, { useState } from 'react';

type Props = unknown;
type Styles = {
	selectedRoomBG: string;
	unselectedRoomBG: string;
	topPad: string;
	roomTitle: string;
	bottomPad: string;
};

const RoomContainer = (props: Props) => {
	const styles: Styles = {
		selectedRoomBG: 'bg-purple-100 w-[100%] flex flex-col transition',
		unselectedRoomBG:
			'bg-purple-200 w-[90%] rounded-r-full flex flex-col mx-auto',
		topPad: 'bg-purple-200 h-[10px] rounded-br-full transition',
		roomTitle: 'ml-2',
		bottomPad: 'bg-purple-200 h-[10px] rounded-tr-full transition',
	};

	const [selectedRoom, setSelectedRoom] = useState(false);

	const roomDisplay = (
		<div>
			<div className={styles.topPad} />
			<p className={styles.roomTitle}>Room Title</p>
			<div className={styles.bottomPad} />
		</div>
	);

	const selectRoom = () => {
		setSelectedRoom((prevState) => !prevState);
	};

	return (
		<div
			className={
				selectedRoom
					? styles.selectedRoomBG
					: styles.unselectedRoomBG
			}
			onClick={selectRoom}
		>
			{roomDisplay}
		</div>
	);
};

export default RoomContainer;
