import React from 'react';

import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {
	// RoomContainer,
	// RoomListContainer,
	ChatBody,
	ChatInput,
	UserControlsContainer,
	LeftBar,
	RightBar,
} from './components/exporter';

// type Styles = {
// 	wrapper: string;
// };

function App() {
	const styles = {
		wrapper: 'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[85%_minmax(50px,_350px)] absolute',
	};

	const apiKey = process.env.API_KEY;
	const client = StreamChat.getInstance(apiKey as string);

	return (
		<div className={styles.wrapper}>
			<Chat client={client} theme='light'>
				<LeftBar />
				<ChatBody />
				<RightBar />
				<UserControlsContainer />
				<ChatInput />
			</Chat>
		</div>
	);
}

export default App;
