import React, { useState } from 'react';

type Styles = {
	selectedRoomBG: string;
	unselectedRoomBG: string;
	topPad: string;
	roomTitle: string;
	bottomPad: string;
	bottomPadSelected: string;
};

const RoomContainer = () => {
	const styles: Styles = {
		selectedRoomBG: 'bg-purple-100 w-[100%] flex flex-col transition',
		unselectedRoomBG:
			'bg-purple-200 w-[90%] rounded-r-full flex flex-col mx-auto',
		topPad: 'bg-purple-200 h-[10px] rounded-br-full transition',
		roomTitle: 'ml-2 w-full text-left hover:text-purple-600',
		bottomPad:
			'bg-purple-200 h-[10px] rounded-tr-full transition border-t-2 border-purple-400',
		bottomPadSelected:
			'bg-purple-200 h-[10px] rounded-tr-full border-t-[1px] border-purple-400 transition',
	};

	const [selectedRoom, setSelectedRoom] = useState(false);

	const selectRoom = () => {
		setSelectedRoom((prevState) => !prevState);
	};

	// const borderDisplay = selectedRoom ? {styles.bottomPadSelected} : {styles.bottomPad};

	const roomDisplay = (
		<div>
			<div className={styles.topPad} />
			<button className={styles.roomTitle}>Room Title</button>
			<div className={styles.bottomPad} />
		</div>
	);

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
