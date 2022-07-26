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
	SideBar,
} from './components/exporter';

// type Styles = {
// 	wrapper: string;
// };

// function fn(s) {
// 	console.log(s.subtr(3));
// }

function App() {
	const styles = {
		wrapper: 'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr] grid-rows-[90%_minmax(50px,_150px)] absolute',
	};

	const apiKey = process.env.API_KEY;
	const client = StreamChat.getInstance(apiKey as string);

	return (
		<div className={styles.wrapper}>
			<Chat client={client} theme='light'>
				<SideBar />
				<ChatBody />
				<UserControlsContainer />
				<ChatInput />
			</Chat>
		</div>
	);
}

export default App;
