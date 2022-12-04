import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = any;
type Styles = {
	container: string;
	roomText: string;
	btnContainer: string;
	dangerZone: string;
	dangerZoneText: string;
	leaveRmBtn: string;
	deleteRmBtn: string;
	doorOpenIcon: string;
	roomOptionsBtn: string;
};

const RoomOptionsPeek = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-400 m-2 p-1 rounded-lg items-center flex flex-col',
		roomText: 'text-center font-bold',
		btnContainer: 'flex justify-evenly',
		dangerZone: 'flex flex-col rounded-lg w-full',
		dangerZoneText: 'text-center',
		deleteRmBtn: 'bg-red-500 p-1 rounded-lg w-fit text-sm',
		leaveRmBtn:
			'hover:bg-red-200 p-1 rounded-lg bg-red-300 w-fit text-sm',
		doorOpenIcon: 'm-auto',
		roomOptionsBtn: 'bg-purple-500 rounded-lg p-1 w-fit',
	};

	const doorOpenIcon = <FontAwesomeIcon icon={solid('door-open')} />;
	const trashcanIcon = <FontAwesomeIcon icon={solid('trash-can')} />;
	const roomOptionsIcon = <FontAwesomeIcon icon={solid('outdent')} />;

	return (
		<div className={styles.container}>
			<p className={styles.roomText}>Room:</p>
			<button className={styles.roomOptionsBtn}>
				{roomOptionsIcon}Room Options
			</button>
			<div className={styles.dangerZone}>
				<p className={styles.dangerZoneText}>Danger Zone:</p>
				<div className={styles.btnContainer}>
					<button className={styles.leaveRmBtn}>
						{doorOpenIcon}Leave Room
					</button>
					<button className={styles.deleteRmBtn}>
						{trashcanIcon}Delete Room
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoomOptionsPeek;
