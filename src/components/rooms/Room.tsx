import React, { useState, useEffect } from 'react';

interface Props {
	title: string;
	selected: boolean;
}
type Styles = {
	container: string;
	selectedContainer: string;
	topPad: string;
	roomTitle: string;
	bottomPad: string;
	selectedTopPad: string;
	selectedRoomTitle: string;
	selectedBottomPad: string;
};

const Room = (props: Props) => {
	const styles: Styles = {
		container: 'w-[90%] hover:text-purple-600 transition cursor-pointer',
		selectedContainer:
			'w-[100%] bg-purple-100 rounded-tl-full hover:text-purple-600',
		topPad: 'bg-purple-200 h-[10px] rounded-br-full transition',
		roomTitle: 'ml-2 text-sm md:text-base',
		bottomPad:
			'bg-purple-200 h-[10px] transition border-t-2 border-purple-400',
		selectedTopPad: 'bg-purple-200 h-[10px] rounded-br-full transition',
		selectedRoomTitle:
			'bg-purple-100 w-full rounded-tl-lg rounded-r-lg text-left pl-5 cursor-default text-sm md:text-base',
		selectedBottomPad:
			'bg-purple-200 h-[10px] rounded-tr-full transition border-t-2 border-purple-400',
	};

	if (props.selected)
		return (
			<div className={styles.selectedContainer}>
				<div className={styles.selectedTopPad} />
				<button className={styles.selectedRoomTitle}>
					{props.title}
				</button>
				<div className={styles.selectedBottomPad} />
			</div>
		);

	return (
		<div className={styles.container}>
			<div className={styles.topPad} />
			<button className={styles.roomTitle}>{props.title}</button>
			<div className={styles.bottomPad} />
		</div>
	);
};

export default Room;
