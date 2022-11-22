import React from 'react';

interface Props {
	currentCh: string;
}
type Styles = {
	container: string;
	roomTitle: string;
};

const RoomTopTitle = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-300 h-fit w-[98%] py-1 rounded-b-2xl mx-auto drop-shadow-md shadow-purple-500',
		roomTitle: 'flow-root m-auto font-bold w-fit min-h-[20px]',
	};

	return (
		<div className={styles.container}>
			<p className={styles.roomTitle}>{props.currentCh}</p>
		</div>
	);
};

export default RoomTopTitle;
