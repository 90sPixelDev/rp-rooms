import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';

import { CreateRoomBtn } from '../exporter';

type Props = unknown;
type Styles = {
	section: string;
	inputBox: string;
};
type Query = string;

const RoomsSearch = (props: Props) => {
	const styles: Styles = {
		section: 'flex m-auto',
		inputBox: 'flow-root p-[2px] rounded-l-lg outline-purple-500 mb-4',
	};

	const [room, setRoom] = useState(null as any);
	const [inputText, setInputText] = useState('');
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);

	const userContext = useContext(UserContext);

	const getRooms = async (inputText: Query) => {
		try {
			console.log('Searching: ' + inputText);
			const userRoomsRef = collection(
				db,
				'userRooms',
				userContext.user.uid
			);
			const q = query(
				userRoomsRef,
				where('roomTitle', '==', { inputText })
			);
			const querySnapshot = await getDocs(q);
			if (querySnapshot) {
				querySnapshot.forEach((doc) => {
					console.log(doc.id, ' => ', doc.data());
					setRoom(doc.data());
				});
			}
			setInputText('');
		} catch (err) {
			setErr(true);
			console.log('SOMETHING WENT WRONG!');
			setInputText('');
		}
	};

	const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		setLoading(true);
		setInputText((prevstate) => (prevstate = e.target.value));
	};

	return (
		<section className={styles.section}>
			<input
				className={styles.inputBox}
				type='text'
				value={inputText}
				onKeyDown={(e) => {
					if (e.code === 'Enter') getRooms(inputText);
				}}
				onChange={onSearch}
				name=''
				id=''
				placeholder='Search Rooms...'
			/>
			<CreateRoomBtn onBtnClicked={() => getRooms(inputText)} />
		</section>
	);
};

export default RoomsSearch;
