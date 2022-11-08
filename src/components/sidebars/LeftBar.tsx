import React from 'react';

import { LeftBarTop, RoomListContainer } from '../exporter';

type Props = any;
type Styles = {
	container: string;
};

const LeftBar = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-col gap-4',
	};

	return (
		<section className={styles.container}>
			<LeftBarTop />
			<RoomListContainer
			selectedRoom={props.selectedRoom}
			listOfRooms={props.}
			/>
		</section>
	);
};

export default LeftBar;
