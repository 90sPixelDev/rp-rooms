import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/AuthContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../firebase.config';

interface Props {
	isOpened: boolean;
}
type Styles = {
	container: string;
	names: string;
	userName: string;
	nickName: string;
	nickNameInput: string;
	charaPicContainer: string;
	charaPic: string;
	charaPicClosed: string;
	charaPicContainerClosed: string;
};

const UserProfilePeek = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-row',
		names: 'ml-2 mt-2',
		userName: 'font-bold',
		nickName: 'underline cursor-pointer',
		nickNameInput: 'italic w-[140px] outline-purple-500',
		charaPicContainer:
			'flex flex-row bg-purple-700 w-[50px] h-[50px] rounded-lg ml-2 mt-2 transition overflow-hidden items-center',
		charaPic: 'h-fit w-fit ',
		charaPicClosed: 'h-fit w-fit',
		charaPicContainerClosed:
			'flex flex-row bg-purple-700 w-[35px] h-[35px] rounded-lg mt-2 mx-auto transition overflow-hidden items-center',
	};

	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(UserContext);
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
				await updateProfile(currentUser, {
					displayName: newNickname,
				});
				setPTag(true);
				console.log('Updated nickname!');
			} else {
				console.log('Nickname is not valid!');
				setPTag(true);
			}
		}
	};

	const showUserName = currentUser ? (
		<p
			className={styles.userName}
			onClick={() => console.log(currentUser.displayName)}
		>
			{currentUser.email}
		</p>
	) : (
		<p className={styles.userName}>user undefined</p>
	);

	const updateProfilePic = () => {
		// await updateProfile(userInfo, {
		// photoURL: downloadURL,
		// }
	};

	if (props.isOpened)
		return (
			<div className={styles.container}>
				<div className={styles.charaPicContainer}>
					<img
						className={styles.charaPic}
						src={currentUser.photoURL}
						onError={(e) =>
							(e.currentTarget.src =
								currentUser.displayName.slice(0))
						}
						alt=''
					/>
				</div>
				<div className={styles.names}>
					{showUserName}
					{isPTag ? (
						<p
							className={styles.nickName}
							onClick={() => setPTag(false)}
						>
							{currentUser.displayName}
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

	return (
		<div className={styles.container}>
			<div className={styles.charaPicContainerClosed}>
				<img
					className={styles.charaPicClosed}
					src={currentUser.photoURL}
					onError={(e) =>
						(e.currentTarget.src =
							currentUser.displayName.slice(0))
					}
					alt=''
					onClick={updateProfilePic}
				/>
			</div>
			{/* <input
				// className={styles.input}
				type='file'
				name='avatar'
				id='image-file'
			/> */}
		</div>
	);
};

export default UserProfilePeek;
