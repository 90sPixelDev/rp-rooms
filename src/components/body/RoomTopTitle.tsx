import React from 'react';

interface Props {
	currentChInfo: Record<string, any>;
}
// type Props = {
// 	currentChInfo: Record<string, any>;
// };
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
			<p className={styles.roomTitle}>
				{props.currentChInfo.num}: {props.currentChInfo.desc}
			</p>
		</div>
	);
};

export default RoomTopTitle;
