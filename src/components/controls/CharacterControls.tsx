import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

interface Props {
	roomTitle: string;
}
interface Character {
	charaName: string;
	charaPic: string;
}
type Styles = {
	container: string;
	controlTitle: string;
	nameArea: string;
	nickName: string;
	nickNameInput: string;
};

const CharacterControls = (props: Props) => {
	const styles: Styles = {
		container: 'bg-purple-400 m-2 p-1 rounded-lg',
		controlTitle: 'font-bold text-center',
		nameArea: 'flex flex-row',
		nickName: 'underline cursor-pointer ml-1',
		nickNameInput: 'italic w-[140px] outline-purple-500 ml-1',
	};

	const { currentUser } = useContext(UserContext);
	const uid = currentUser.uid;

	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isPTag, setPTag] = useState(true);

	const validateNickname = async (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		const newNickname = e.currentTarget.value;
		if (e.key === 'Enter') {
			if (
				newNickname !== ' ' &&
				newNickname.length > 3 &&
				newNickname.length < 17
			) {
				const roomRef = doc(db, 'rooms', props.roomTitle);
				await updateDoc(doc(db, 'rooms', props.roomTitle), {
					[`characters.${currentUser.uid}.charaName`]:
						newNickname,
				});
				setPTag(true);
				console.log('Updated character name!');
			} else {
				console.log('Nickname is not valid!');
				setPTag(true);
			}
		}
	};

	const getCharaData = async () => {
		const roomRef = doc(db, 'rooms', props.roomTitle);
		const charaRef = await getDoc(roomRef);
		if (
			charaRef.data()?.characters !== undefined ||
			charaRef.data()?.characters !== null
		) {
			setCharacterInfo(charaRef.data()?.characters[uid]);
		}
	};

	useEffect(() => {
		if (
			props.roomTitle !== null &&
			props.roomTitle !== undefined &&
			props.roomTitle !== ''
		) {
			console.log('roomTile is not Null');
			console.log(props.roomTitle);
			getCharaData();
		}
	}, [props.roomTitle]);
	useEffect(() => {
		if (characterInfo !== null && characterInfo !== undefined) {
			console.log('Characters is not null!');
			console.log(characterInfo.charaName);
			setIsLoading(false);
		}
	}, [characterInfo]);

	if (isLoading) {
		<div className={styles.container}>
			<p className={styles.controlTitle}>Character Info:</p>
		</div>;
	}

	return (
		<div className={styles.container}>
			<p className={styles.controlTitle}>Character Info:</p>
			<div className={styles.nameArea}>
				<p>Name:</p>
				{isPTag ? (
					<p
						className={styles.nickName}
						onClick={() => setPTag(false)}
					>
						{characterInfo?.charaName}
					</p>
				) : (
					<input
						className={styles.nickNameInput}
						autoFocus
						onKeyDown={(e) => validateNickname(e)}
						type='text'
					/>
				)}
			</div>
		</div>
	);
};

export default CharacterControls;
