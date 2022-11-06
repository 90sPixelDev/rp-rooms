import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/AuthContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../firebase.config';

type Props = unknown;
type Styles = {
	container: string;
	names: string;
	userName: string;
	nickName: string;
	nickNameInput: string;
	charaPic: string;
};

const UserProfilePeek = (props: Props) => {
	const styles: Styles = {
		container: 'flex',
		names: 'ml-2 mt-2',
		userName: 'font-bold',
		nickName: 'italic',
		nickNameInput: 'italic w-fit outline-purple-500',
		charaPic: ' bg-purple-700 w-[50px] h-[50px] rounded-full ml-2 mt-2',
	};

	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(UserContext);
	// const usersRef = doc(db, 'users', currentUser.uid);
	const [isPTag, setPTag] = useState(true);

	const validateNickname = async (e: React.MouseEvent<HTMLInputElement>) => {
		const newNickname = e.currentTarget.value;
		if (
			newNickname !== ' ' &&
			newNickname.length > 2 &&
			newNickname.length < 20
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

	return (
		<div className={styles.container}>
			<div className={styles.charaPic}></div>
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
						onClick={(e) => validateNickname(e)}
						type='text'
					/>
				)}
			</div>
		</div>
	);
};

export default UserProfilePeek;
