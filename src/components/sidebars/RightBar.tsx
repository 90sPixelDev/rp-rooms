import React from 'react';
import { EventsList } from '../exporter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = unknown;
type Styles = {
	container: string;
	top: string;
	textTop: string;
	arrBtn: string;
};

const RightBar = (props: Props) => {
	const styles: Styles = {
		container:
			'h-[98.5%] w-[93%] m-auto bg-purple-300 rounded-2xl shadow-md',
		top: 'flex flex-row bg-purple-400 rounded-t-2xl',
		textTop: 'text-center',
		arrBtn: 'px-2 bg-purple-200 rounded-tl-2xl border-2 border-purple-400',
	};

	const rightArrIcon = (
		<FontAwesomeIcon icon={solid('arrow-right')} className='' />
	);

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<p className={styles.textTop}>
					<button className={styles.arrBtn}>
						{rightArrIcon}
					</button>
					Timeline
				</p>
			</div>
			<EventsList />
		</div>
	);
};

export default RightBar;
