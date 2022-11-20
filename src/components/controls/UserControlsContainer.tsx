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
			'flex flex-col justify-between bg-purple-300 w-[90%] h-[90%] m-auto rounded-lg min-h-fit',
		bottomSection:
			'flex flex-col justify-between ml-2 mb-2 gap-2 w-[90%]',
	};

	return (
		<div className={styles.container}>
			<UserProfilePeek />
			<div className={styles.bottomSection}>
				<OptionsControl />
				<LogOutControl />
			</div>
		</div>
	);
};

export default UserControlsContainer;
