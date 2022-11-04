import React from 'react';

import { ChatEngine } from 'react-chat-engine';

import {
	// RoomContainer,
	// RoomListContainer,
	ChatBody,
	ChatInput,
	UserControlsContainer,
	LeftBar,
	RightBar,
	ChatListTest,
} from './components/exporter';

// type Styles = {
// 	wrapper: string;
// };

function App() {
	const styles = {
		wrapper: 'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[85%_minmax(50px,_350px)] absolute',
	};

	const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
	const userSecret = process.env.REACT_APP_CHAT_ENGINE_USER_SECRET;

	return (
		<ChatEngine
			height='100vh'
			userName='jsadmin'
			userSecret={userSecret}
			projectID={projectID}
		>
			{/* <div className={styles.wrapper}>
				<LeftBar />
				<ChatBody />
				<RightBar />
				<UserControlsContainer />
				<ChatInput />
			</div> */}
		</ChatEngine>
	);
}

export default App;
