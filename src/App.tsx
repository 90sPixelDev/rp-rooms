import React from 'react';

import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {
	RoomContainer,
	RoomListContainer,
	ChatBody,
	ChatInput,
	UserControlsContainer,
} from './components/exporter';

function App() {
	const styles = {
		wrapper: 'bg-purple-200 h-[100vh] grid grid-cols-[minmax(100px,_250px)_1fr] grid-rows-[1fr_minmax(50px,_150px)]',
	};

	const apiKey = process.env.API_KEY;
	const client = StreamChat.getInstance(apiKey as string);

	return (
		<div className={styles.wrapper}>
			<Chat client={client} theme='light'>
				<RoomListContainer />
				<ChatBody />
				<UserControlsContainer />
				<ChatInput />
			</Chat>
		</div>
	);
}

export default App;
