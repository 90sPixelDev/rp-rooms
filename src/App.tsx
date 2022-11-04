import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';

import {
	// RoomContainer,
	// RoomListContainer,
	RoomTopTitle,
	ChatBody,
	ChatBox,
	ChatInput,
	UserControlsContainer,
	LeftBar,
	RightBar,
	ChatListTest,
	WelcomeBG,
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
		<WelcomeBG />
		// <div className={styles.wrapper}>
		// 	<LeftBar />
		// 	<ChatBody />
		// 	<RightBar />
		// 	<UserControlsContainer />
		// 	<ChatInput />
		// </div>
	);
}

export default App;
