import React from 'react';
import { UserProfilePeek } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
};

const UserControlsContainer = (props: Props) => {
	const styles: Styles = {
		container: 'bg-purple-300 w-[90%] h-[90%] m-auto',
	};

	return (
		<div className={styles.container}>
			<UserProfilePeek />
		</div>
	);
};

export default UserControlsContainer;
