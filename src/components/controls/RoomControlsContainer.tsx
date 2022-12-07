import React from 'react';
import { CharacterControls, RoomOptionsPeek } from '../exporter';

interface Props {
	roomTitle: string;
	isOpened: boolean;
}
type Styles = {
	container: string;
};

const RoomControlsContainer = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-col justify-between bg-purple-300 w-[95%] h-[90%] m-auto rounded-lg min-h-fit overflow-hidden ',
	};

	return (
		<div className={styles.container}>
			<CharacterControls
				roomTitle={props.roomTitle}
				isOpened={props.isOpened}
			/>
			<RoomOptionsPeek isOpened={props.isOpened} />
		</div>
	);
};

export default RoomControlsContainer;
