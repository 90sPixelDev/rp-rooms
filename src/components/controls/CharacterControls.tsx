import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface Props {
	roomTitle: string;
	isOpened: boolean;
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
	inputPic: string;
	charaProfileBtn: string;
};

const CharacterControls = (props: Props) => {
	const styles: Styles = {
		container: 'bg-purple-400 m-2 p-1 rounded-lg',
		controlTitle: 'font-bold text-center',
		nameArea: 'flex flex-row',
		nickName: 'underline cursor-pointer ml-1 hover:text-purple-200',
		nickNameInput: 'italic w-[140px] outline-purple-500 ml-1',
		inputPic: 'absolute z-[-1] opacity-0',
		charaProfileBtn:
			'hover:text-purple-600 bg-purple-300 p-1 rounded-lg cursor-pointer text-sm',
	};

	const { currentUser } = useContext(UserContext);
	const uid = currentUser.uid;

	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [isPTag, setPTag] = useState(true);

	const validateNickname = async (newNickname: string) => {
		if (
			newNickname !== ' ' &&
			newNickname.length > 3 &&
			newNickname.length < 17
		) {
			const roomRef = doc(db, 'rooms', props.roomTitle);
			await updateDoc(doc(db, 'rooms', props.roomTitle), {
				[`characters.${currentUser.uid}.charaName`]: newNickname,
			});
			setPTag(true);
			setRefresh((prevState) => !prevState);
		} else {
			console.log(`%c${newNickname}`, 'color: red', ' is not valid!');
			setPTag(true);
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
			getCharaData();
		}
	}, [props.roomTitle, refresh]);

	useEffect(() => {
		if (characterInfo !== null && characterInfo !== undefined) {
			setIsLoading(false);
		}
	}, [characterInfo]);

	if (isLoading) {
		<div className={styles.container}>
			<p className={styles.controlTitle}>Character Info:</p>
		</div>;
	}

	if (props.isOpened)
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
							onKeyDown={(e) => {
								if (e.key === 'Enter')
									validateNickname(
										e.currentTarget.value
									);
							}}
							onClick={(e) =>
								validateNickname(e.currentTarget.value)
							}
							type='text'
						/>
					)}
				</div>
				<div>
					<label
						htmlFor='image-file'
						className={styles.charaProfileBtn}
					>
						<FontAwesomeIcon icon={solid('image-portrait')} />
						{/* {picInfo} */}
						Set Profile Picture
					</label>
					<input
						className={styles.inputPic}
						type='file'
						name='avatar'
						id='image-file'
						accept='image/png,image/jpeg,image/gif'
					/>
				</div>
			</div>
		);

	return <p>CO &rarr;</p>;
};

export default CharacterControls;
