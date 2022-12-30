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

interface Props {
	callRefreshMessages: (roomTitle: string) => void;
	isOpened: boolean;
}
type Styles = {
	section: string;
	inputBox: string;
	backdrop: string;
	inputBoxClosed: string;
	inputBoxClosedFocused: string;
	bar: string;
};
type Query = string;

const RoomsSearch = (props: Props) => {
	const styles: Styles = {
		section: 'relative flex flex-col',
		inputBox:
			'flow-root p-1 rounded-l-lg outline-none caret-purple-500 mb-4 border-l-2 border-b-2 border-t-2 border-purple-600 w-[70%] z-3',
		backdrop:
			'fixed bg-[rgba(0,0,0,0.5)] h-[100vh] w-[100vw] top-0 left-0 flex flex-col place-items-center justify-center',
		inputBoxClosed:
			'flow-root p-1 rounded-lg outline-none caret-purple-500 mb-4 border-b-2 border-t-2 border-purple-600 w-8 z-3 m-auto cursor-pointer',
		inputBoxClosedFocused:
			'flow-root p-1 rounded-lg outline-none caret-purple-500 mb-4 border-2 border-purple-600 w-fit z-3',
		bar: 'flex flex-row justify-center',
	};

	const [room, setRoom] = useState(null as any);
	const [inputText, setInputText] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [searchedRooms, setSearchedRooms] = useState<string[] | null>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [isFocusedMini, setIsFocusedMini] = useState(false);
	const [err, setErr] = useState(false);
	const [roomsFound, setRoomsFound] = useState(true);

	const { currentUser } = useContext(UserContext);

	const addRoom = async (inputText: Query) => {
		console.log('Adding Room!');

		try {
			if (
				inputText.length <= 3 ||
				!inputText.replace(/\s/g, '').length
			) {
				throw new Error(`\"${inputText}\" is an invalid search!`);
			}
			const newRoomRef = doc(db, 'rooms', inputText);
			const newRoomDoc = await getDoc(newRoomRef);
			if (newRoomDoc.exists()) {
				if (newRoomDoc.data().characters[currentUser.uid]) {
					console.warn(
						`You are already a part of Room ${inputText}`
					);
					return;
				}
				const charas = Object.keys(newRoomDoc.data().characters);
				const charaCount = charas.length;
				await setDoc(
					newRoomRef,
					{
						characters: {
							[currentUser.uid]: {
								charaPic: '',
								charaName: 'New Character',
								turn: charaCount.toString(),
								currentTurn: false,
							},
						},
						user: arrayUnion(currentUser.uid),
					},
					{ merge: true }
				);
			} else {
				await setDoc(
					newRoomRef,
					{
						owner: [currentUser.uid],
						roomTitle: inputText,
						currentTurn: '',
						currentChapter: {
							num: '0',
							desc: 'A New Beginning!',
						},
						characters: {
							[currentUser.uid]: {
								charaPic: '',
								charaName: 'New Character',
								turn: '0',
								currentTurn: true,
							},
						},
						user: arrayUnion(currentUser.uid),
						chat: [],
						story: [],
					},
					{ merge: true }
				);
			}
			setIsFocused(false);
			setInputText('');
		} catch (err) {
			setErr(true);
			console.error(err);
			setInputText('');
		}
		props.callRefreshMessages(inputText);
	};

	const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const lowerInput = e.target.value.toLowerCase();
		setInputText((prevstate) => (prevstate = e.target.value));
		const roomSearchList: string[] = [];

		lowerInput.length > 3 ? setIsSearching(true) : setIsSearching(false);

		try {
			const roomSearch = await getDocs(collection(db, 'rooms'));
			roomSearch.forEach((doc) => {
				const lower = doc.data().roomTitle.toLowerCase();
				if (lower.includes(lowerInput)) {
					roomSearchList.push(doc.data().roomTitle);
				}
				setSearchedRooms(roomSearchList.map((rt) => rt));
			});
		} catch (err) {
			setErr(true);
			console.error(`Message: ${err}`);
		}
		console.log(roomSearchList);
	};

	const unFocusRoomSearch = () => {
		setTimeout(() => {
			setInputText('');
			setSearchedRooms([]);
			setIsFocusedMini(false);
			setIsSearching(false);
		}, 300);
	};

	if (props.isOpened)
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
							unFocusRoomSearch();
						}}
						placeholder='Add Rooms...'
					/>
					<CreateRoomBtn
						onBtnClicked={() => addRoom(inputText)}
					/>
				</div>
				{isSearching && (
					<RoomsDropDown
						roomsSearched={searchedRooms}
						addSelectedRoom={addRoom}
						isOpened={props.isOpened}
						searchingDone={roomsFound}
					/>
				)}
			</section>
		);

	return (
		<section className={styles.section}>
			{isFocusedMini ? (
				<div className={styles.backdrop}>
					<input
						autoFocus
						className={styles.inputBoxClosedFocused}
						type='text'
						value={inputText}
						onKeyDown={(e) => {
							if (e.code === 'Enter') addRoom(inputText);
						}}
						onChange={onSearch}
						onFocus={() => {
							setIsFocused(true);
							setIsFocusedMini(true);
						}}
						onBlur={() => {
							unFocusRoomSearch();
						}}
						placeholder='Room Name...'
					/>
				</div>
			) : (
				<input
					className={styles.inputBoxClosed}
					type='text'
					value={inputText}
					onKeyDown={(e) => {
						if (e.code === 'Enter') addRoom(inputText);
					}}
					onChange={onSearch}
					onFocus={() => {
						setIsFocused(true);
						setIsFocusedMini(true);
					}}
					onBlur={() => {
						unFocusRoomSearch();
					}}
					placeholder='&#128269;'
				/>
			)}
			{isSearching && (
				<RoomsDropDown
					roomsSearched={searchedRooms}
					addSelectedRoom={addRoom}
					isOpened={props.isOpened}
					searchingDone={roomsFound}
				/>
			)}
		</section>
	);
};

export default RoomsSearch;
