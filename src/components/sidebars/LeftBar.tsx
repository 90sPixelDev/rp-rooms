import React from 'react';

import { LeftBarTop, RoomListContainer } from '../exporter';

interface Props {
	listOfRooms: string[];
}
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
			<RoomListContainer listOfRooms={props.listOfRooms} />
		</section>
	);
};

export default LeftBar;
