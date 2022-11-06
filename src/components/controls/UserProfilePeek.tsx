import React, { useContext } from 'react';
import { UserContext } from '../../context/AuthContext';

type Props = unknown;
type Styles = {
	container: string;
	names: string;
	userName: string;
	nickName: string;
	charaPic: string;
};

const UserProfilePeek = (props: Props) => {
	const styles: Styles = {
		container: 'flex',
		names: 'ml-2 mt-2',
		userName: 'font-bold',
		nickName: 'italic',
		charaPic: ' bg-purple-700 w-[50px] h-[50px] rounded-full ml-2 mt-2',
	};

	const userContext = useContext(UserContext);

	const showUserName = userContext.user ? (
		<p className={styles.userName}>{userContext.user.email}</p>
	) : (
		<p className={styles.userName}>user undefined</p>
	);

	return (
		<div className={styles.container}>
			<div className={styles.charaPic}></div>
			<div className={styles.names}>
				{showUserName}
				<p className={styles.nickName}>Nickname</p>
			</div>
		</div>
	);
};

export default UserProfilePeek;
