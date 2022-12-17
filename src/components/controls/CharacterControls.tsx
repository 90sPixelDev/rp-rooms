import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase.config';
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
	picArea: string;
	inputPic: string;
	charaPicContainerClosed: string;
	charaPicContainer: string;
	charaPic: string;
	charaProfileBtn: string;
};

const CharacterControls = (props: Props) => {
	const styles: Styles = {
		container: 'bg-purple-400 m-1 p-1 rounded-lg',
		controlTitle: 'font-bold text-center',
		nameArea: 'flex flex-row',
		nickName: 'underline cursor-pointer ml-1 hover:text-purple-200',
		nickNameInput: 'italic w-[140px] outline-purple-500 ml-1',
		picArea: 'flex flex-row justify-evenly',
		inputPic: 'absolute z-[-1] opacity-0',
		charaPicContainer: 'bg-purple-600 h-[50px] w-[50px] rounded-lg',
		charaPicContainerClosed:
			'bg-purple-600 h-[35px] w-[35px] rounded-lg mx-auto mt-2',
		charaPic: 'bg-purple-600 h-fill w-fill rounded-lg',
		charaProfileBtn:
			'hover:text-purple-600 bg-purple-300 p-1 rounded-lg cursor-pointer text-sm h-fit my-auto',
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

		const storageRef = ref(
			storage,
			`users/${uid}/${props.roomTitle}-CharacterPic`
		);

		getDownloadURL(storageRef)
			.then((url) => {
				updateDoc(doc(db, 'rooms', props.roomTitle), {
					[`characters.${currentUser.uid}.charaPic`]: url,
				});
			})
			.catch((error) => {
				if (error.code === 'storage/object-not-found') {
					setDefaultCharaPic();
					return Promise.resolve();
				}
				return Promise.resolve();
			});
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

	const setDefaultCharaPic = async () => {
		const defaultCharaPic = ref(storage, 'resources/defaultCharaPic.jpg');
		getDownloadURL(defaultCharaPic)
			.then((url) => {
				updateDoc(doc(db, 'rooms', props.roomTitle), {
					[`characters.${currentUser.uid}.charaPic`]: url,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateCharaPic = (e: React.ChangeEvent<HTMLInputElement>) => {
		const storageRef = ref(
			storage,
			`users/${uid}/${props.roomTitle}-CharacterPic`
		);

		if (
			e.currentTarget.files![0] == null ||
			e.currentTarget.files![0] == undefined
		) {
			setDefaultCharaPic();
		} else {
			const file = e.currentTarget.files![0];
			const uploadTask = uploadBytesResumable(storageRef, file);
			setRefresh((prevState) => !prevState);
		}
	};

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
				<div className={styles.picArea}>
					<label
						htmlFor='image-file'
						className={styles.charaProfileBtn}
					>
						<FontAwesomeIcon icon={solid('image-portrait')} />
						Set Profile Picture
					</label>
					<input
						className={styles.inputPic}
						type='file'
						name='avatar'
						id='image-file'
						accept='image/png,image/jpeg,image/gif'
						onChange={(e) => updateCharaPic(e)}
					/>
					<div className={styles.charaPicContainer}>
						<img
							className={styles.charaPic}
							src={characterInfo?.charaPic}
						/>
					</div>
				</div>
			</div>
		);

	return (
		<div className={styles.charaPicContainerClosed}>
			<img className={styles.charaPic} src={characterInfo?.charaPic} />
		</div>
	);
};

export default CharacterControls;
