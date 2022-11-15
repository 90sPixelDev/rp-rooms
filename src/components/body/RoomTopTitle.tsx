import React from 'react';

type Props = unknown;
type Styles = {
	container: string;
	roomTitle: string;
};

const RoomTopTitle = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-300 h-fit w-[98%] py-1 rounded-b-2xl mx-auto drop-shadow-md shadow-purple-500',
		roomTitle: 'flow-root m-auto font-bold w-fit',
	};

	return (
		<div className={styles.container}>
			<p className={styles.roomTitle}>Chapter 3: Something Happend</p>
		</div>
	);
};

export default RoomTopTitle;
