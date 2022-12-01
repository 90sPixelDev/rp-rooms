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
			'flex flex-row bg-purple-700 min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-lg ml-2 mt-2 transition overflow-hidden',
		charaPic: 'h-full w-full object-contain',
		charaPicClosed: 'h-full w-full object-contain',
		charaPicContainerClosed:
			'flex flex-row bg-purple-700 min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] rounded-lg mt-2 mx-auto transition overflow-hidden items-center',
	};

	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(UserContext);
	const [isPTag, setPTag] = useState(true);

	const validateNewNickname = async (newNickname: string) => {
		if (
			newNickname.length < 4 ||
			newNickname.length > 17 ||
			!newNickname.replace(/\s/g, '').length
		) {
			console.warn(
				`%c${newNickname}`,
				'color: red',
				' is not a valid username! Username was not updated.'
			);
			setPTag(true);
			return;
		} else
			await updateProfile(currentUser, {
				displayName: newNickname,
			});
		setPTag(true);
		console.log('Updated nickname!');
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
							onKeyDown={(e) => {
								if (e.code === 'Enter')
									validateNewNickname(
										e.currentTarget.value
									);
							}}
							onClick={(e) =>
								validateNewNickname(
									e.currentTarget.value
								)
							}
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
