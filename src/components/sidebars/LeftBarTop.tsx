import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

import { RoomsSearch } from '../exporter';

interface Props {
	callRefreshMessages: (roomTitle: string) => void;
}
type Styles = {
	container: string;
	roomsTitle: string;
	top: string;
	icon: string;
};

const LeftBarTop = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-col gap-4 border-purple-100 bg-purple-300 rounded-br-lg',
		roomsTitle: 'text-center font-bold text-lg',
		top: 'flex flex-row py-2 bg-purple-400 justify-center items-center gap-4 rounded-br-lg',
		icon: '',
	};

	const homeIcon = (
		<FontAwesomeIcon
			icon={solid('house')}
			size='lg'
			className={styles.icon}
		/>
	);

	return (
		<section className={styles.container}>
			<Link className={styles.top} to='/'>
				{homeIcon}
				<p className={styles.roomsTitle}>RP Rooms</p>
			</Link>
			<RoomsSearch callRefreshMessages={props.callRefreshMessages} />
		</section>
	);
};

export default LeftBarTop;
