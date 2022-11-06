import React from 'react';

import {
	ChatBody,
	ChatInput,
	UserControlsContainer,
	LeftBar,
	RightBar,
} from '../exporter';

type Props = unknown;
type Styles = {
	wrapper: string;
};

const ChatRooms = (props: Props) => {
	const styles = {
		wrapper: 'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[85%_minmax(50px,_350px)] absolute',
	};

	return (
		<div className={styles.wrapper}>
			<LeftBar />
			<ChatBody />
			<RightBar />
			<UserControlsContainer />
			<ChatInput />
		</div>
	);
};

export default ChatRooms;
