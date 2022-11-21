import React from 'react';

import { LeftBarTop, RoomListContainer } from '../exporter';

interface Props {
	listOfRooms: string[];
	callRefreshMessages: (text: string) => void;
	toggleLeftBar: () => void;
}
type Styles = {
	container: string;
};

const LeftBar = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-col gap-2 bg-purple-100',
	};

	return (
		<section className={styles.container}>
			<LeftBarTop
				callRefreshMessages={props.callRefreshMessages}
				toggleLeftBar={props.toggleLeftBar}
			/>
			<RoomListContainer
				listOfRooms={props.listOfRooms}
				callRefreshMessages={props.callRefreshMessages}
			/>
		</section>
	);
};

export default LeftBar;
