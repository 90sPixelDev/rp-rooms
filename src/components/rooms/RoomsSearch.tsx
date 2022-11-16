import React, { useState, useEffect, useContext } from 'react';
import {
	collection,
	query,
	where,
	getDocs,
	getDoc,
	arrayUnion,
} from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';

import { CreateRoomBtn, RoomsDropDown } from '../exporter';

type Props = unknown;
type Styles = {
	section: string;
	inputBox: string;
	bar: string;
};
type Query = string;

const RoomsSearch = (props: Props) => {
	const styles: Styles = {
		section: 'relative flex flex-col m-auto',
		inputBox:
			'flow-root p-1 rounded-l-lg outline-none caret-purple-500 mb-4 border-l-2 border-b-2 border-t-2 border-purple-600 z-3',
		bar: 'flex flex-row m-auto',
	};

	const [room, setRoom] = useState(null as any);
	const [inputText, setInputText] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [searchedRooms, setSearchedRooms] = useState<string[]>([]);
	const [isFocused, setIsFocused] = useState(false);
	const [err, setErr] = useState(false);

	const { currentUser } = useContext(UserContext);

	const addRoom = async (inputText: Query) => {
		try {
			if (inputText.length <= 3) {
				throw new Error(`\"${inputText}\" is an invalid search!`);
			}
			const newRoomRef = doc(db, 'rooms', inputText);
			const newRoomDoc = await getDoc(newRoomRef);
			if (newRoomDoc.exists()) {
				await setDoc(
					newRoomRef,
					{
						user: arrayUnion(currentUser.uid),
					},
					{ merge: true }
				);
			} else {
				await setDoc(
					newRoomRef,
					{
						roomTitle: inputText,
						currentTurn: '',
						currentChapter: {
							num: '',
							desc: '',
						},
						user: arrayUnion(currentUser.uid),
						messages: [],
					},
					{ merge: true }
				);
			}
			setIsFocused(false);

			setInputText('');
		} catch (err) {
			setErr(true);
			console.error(`Message: ${err}`);
			setInputText('');
		}
	};

	// const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	e.preventDefault();
	// 	const lowerInput = e.target.value.toLowerCase();
	// 	setInputText((prevstate) => (prevstate = e.target.value));
	// 	const roomSearchList: string[] = [];

	// 	e.target.value.length > 0
	// 		? setIsSearching(true)
	// 		: setIsSearching(false);

	// 	try {
	// 		const roomSearch = await getDocs(collection(db, 'rooms'));
	// 		roomSearch.forEach((doc) => {
	// 			const lower = doc.data().roomTitle.toLowerCase();
	// 			if (lower.includes(lowerInput)) {
	// 				roomSearchList.push(lower.roomTitle);
	// 			}
	// 			setSearchedRooms(roomSearchList.map((rt) => rt));
	// 		});
	// 	} catch (err) {
	// 		setErr(true);
	// 		console.error(`Message: ${err}`);
	// 	}
	// 	console.log(isSearching);
	// };
	const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const lowerInput = e.target.value.toLowerCase();
		setInputText((prevstate) => (prevstate = e.target.value));
		const roomSearchList: string[] = [];

		lowerInput.length > 0 ? setIsSearching(true) : setIsSearching(false);

		try {
			const roomSearch = await getDocs(collection(db, 'rooms'));
			roomSearch.forEach((doc) => {
				const lower = doc.data().roomTitle.toLowerCase();
				if (lower.includes(lowerInput)) {
					console.log(lower);
					roomSearchList.push(doc.data().roomTitle);
				}
				setSearchedRooms(roomSearchList.map((rt) => rt));
			});
		} catch (err) {
			setErr(true);
			console.error(`Message: ${err}`);
		}
		console.log(isSearching);
	};

	return (
		<section className={styles.section}>
			<div className={styles.bar}>
				<input
					className={styles.inputBox}
					type='text'
					value={inputText}
					onKeyDown={(e) => {
						if (e.code === 'Enter') addRoom(inputText);
					}}
					onChange={onSearch}
					onFocus={() => {
						setIsFocused(true);
					}}
					onBlur={() => {
						setInputText('');
						setSearchedRooms([]);
						setIsSearching(false);
					}}
					name=''
					id=''
					placeholder='Add Rooms...'
				/>
				<CreateRoomBtn onBtnClicked={() => addRoom(inputText)} />
			</div>
			{isSearching && <RoomsDropDown roomsSearched={searchedRooms} />}
		</section>
	);
};

export default RoomsSearch;
