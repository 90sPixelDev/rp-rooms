import React from 'react';

import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {
	RoomContainer,
	RoomListContainer,
	ChatBody,
} from './components/exporter';

function App() {
	const apiKey = process.env.API_KEY;
	const client = StreamChat.getInstance(apiKey as string);

	return (
		<div>
			<Chat client={client} theme='light'>
				<RoomListContainer />
				<ChatBody />
			</Chat>
		</div>
	);
}

export default App;
