import React from 'react';
import styles from './styles/app/app.module.scss';

import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { RoomContainer, RoomListContainer } from './components';

function App() {
	const apiKey = process.env.API_KEY;
	const client = StreamChat.getInstance(apiKey);

	return (
		<div className={styles.wrapper}>
			<Chat client={client} theme='light'>
				<RoomListContainer />
				<RoomContainer />
			</Chat>
		</div>
	);
}

export default App;
