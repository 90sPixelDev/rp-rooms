import React from 'react';
import { UserProfilePeek, LogOutControl, OptionsControl } from '../exporter';

interface Props {
	isOpened: boolean;
}
type Styles = {
	container: string;
	containerClosed: string;
	bottomSection: string;
	bottomSectionClosed: string;
};

const UserControlsContainer = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-col justify-between bg-purple-300 w-[95%] h-[90%] m-auto rounded-lg min-h-fit',
		containerClosed:
			'flex flex-col justify-between bg-purple-300 w-[90%] h-[90%] my-auto rounded-r-lg min-h-fit',
		bottomSection:
			'flex flex-col justify-between ml-2 mb-2 gap-2 w-[90%]',
		bottomSectionClosed:
			'flex flex-col justify-between mb-2 gap-2 w-full',
	};

	if (props.isOpened)
		return (
			<div className={styles.container}>
				<UserProfilePeek isOpened={props.isOpened} />
				<div className={styles.bottomSection}>
					<OptionsControl isOpened={props.isOpened} />
					<LogOutControl isOpened={props.isOpened} />
				</div>
			</div>
		);

	return (
		<div className={styles.containerClosed}>
			<UserProfilePeek isOpened={props.isOpened} />
			<div className={styles.bottomSectionClosed}>
				<OptionsControl isOpened={props.isOpened} />
				<LogOutControl isOpened={props.isOpened} />
			</div>
		</div>
	);
};

export default UserControlsContainer;
