import React from 'react';
import { EventsList } from '../exporter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface Props {
	toggleRightBar: () => void;
	isOpened: boolean;
}
type Styles = {
	containerOpen: string;
	topOpen: string;
	arrBtnOpen: string;
	textTopOpen: string;
	containerClosed: string;
	topClosed: string;
	arrBtnClose: string;
	textTopClosed: string;
};

const RightBar = (props: Props) => {
	const styles: Styles = {
		containerOpen:
			'h-[98.5%] w-[93%] m-auto bg-purple-300 rounded-2xl shadow-md transition',
		topOpen: 'flex flex-row bg-purple-400 rounded-t-2xl h-7 transition',
		arrBtnOpen:
			'absolute px-2 bg-purple-200 rounded-tl-2xl border-2 border-purple-400 hover:bg-purple-600 transition',
		textTopOpen: 'text-center m-auto transition font-bold',
		containerClosed: 'transition',
		topClosed: '',
		arrBtnClose:
			'px-2 bg-purple-400 border-2 border-purple-600 w-full hover:text-purple-200 rounded-bl-2xl transition',
		textTopClosed: 'transition',
	};

	const rightArrIcon = <FontAwesomeIcon icon={solid('arrow-right')} />;
	const leftArrIcon = <FontAwesomeIcon icon={solid('arrow-left')} />;

	if (props.isOpened)
		return (
			<div className={styles.containerOpen}>
				<div className={styles.topOpen}>
					<button
						className={styles.arrBtnOpen}
						onClick={props.toggleRightBar}
					>
						{rightArrIcon}
					</button>
					<p className={styles.textTopOpen}>Timeline</p>
				</div>
				<EventsList isOpened={props.isOpened} />
			</div>
		);

	return (
		<div className={styles.containerClosed}>
			<div className={styles.topClosed}>
				<button
					className={styles.arrBtnClose}
					onClick={props.toggleRightBar}
				>
					{leftArrIcon}
				</button>
			</div>
			<EventsList isOpened={props.isOpened} />
		</div>
	);
};

export default RightBar;
