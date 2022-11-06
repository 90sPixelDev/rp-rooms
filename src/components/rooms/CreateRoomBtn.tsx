import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = any;
type Styles = {
	btn: string;
};

const CreateRoomBtn = (props: Props) => {
	const styles: Styles = {
		btn: 'bg-purple-300 mb-4 w-6 rounded-r-lg',
	};

	const addRoomIcon = <FontAwesomeIcon icon={solid('plus')} />;

	const addRoomBtnClicked = () => {
		props.onBtnClicked();
	};

	return (
		<button className={styles.btn} onClick={addRoomBtnClicked}>
			{addRoomIcon}
		</button>
	);
};

export default CreateRoomBtn;
