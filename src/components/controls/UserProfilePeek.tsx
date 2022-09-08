import React from 'react';

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
		container: 'flex justify-between',
		names: 'ml-2 mt-1',
		userName: 'font-bold',
		nickName: 'italic',
		charaPic: ' bg-purple-700 w-[50px] h-[50px] rounded-full mr-2 mt-1',
	};
	return (
		<div className={styles.container}>
			<div className={styles.names}>
				<p className={styles.userName}>UserName</p>
				<p className={styles.nickName}>Nickname</p>
			</div>
			<div className={styles.charaPic}></div>
		</div>
	);
};

export default UserProfilePeek;
