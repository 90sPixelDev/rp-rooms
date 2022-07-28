import React from 'react';
import { UserProfilePeek, LogOutControl, OptionsControl } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
	bottomSection: string;
};

const UserControlsContainer = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-col justify-between bg-purple-300 w-[90%] h-[90%] m-auto rounded-lg',
		bottomSection: 'flex flex-row justify-between mx-2 mb-2',
	};

	return (
		<div className={styles.container}>
			<UserProfilePeek />
			<div className={styles.bottomSection}>
				<LogOutControl />
				<OptionsControl />
			</div>
		</div>
	);
};

export default UserControlsContainer;
