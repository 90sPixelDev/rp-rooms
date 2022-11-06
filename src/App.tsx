import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase.config';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/AuthContext';

import {
	RoomTopTitle,
	ChatBody,
	ChatBox,
	ChatInput,
	UserControlsContainer,
	LeftBar,
	RightBar,
	ChatListTest,
	WelcomeBG,
	SignUpForm,
	LogInForm,
	ChatRooms,
} from './components/exporter';
import { Sign } from 'crypto';
import { AuthContextProvider } from './context/AuthContext';

type Styles = {
	wrapper: string;
};

function App() {
	const styles: Styles = {
		wrapper: 'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[85%_minmax(50px,_350px)] absolute',
	};

	const { currentUser } = useContext(UserContext);

	const ProtectedRoute = ({ children }: any) => {
		if (!currentUser) {
			return <Navigate to='/login' />;
		} else return children;
	};

	// const saveElem = (
	// 	<div className={styles.wrapper}>
	// 		<LeftBar />
	// 		<ChatBody />
	// 		<RightBar />
	// 		<UserControlsContainer />
	// 		<ChatInput />
	// 	</div>
	// );

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route
						index
						element={
							<ProtectedRoute>
								<ChatRooms />
							</ProtectedRoute>
						}
					/>
					<Route path='login' element={<LogInForm />} />
					<Route path='signup' element={<SignUpForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
