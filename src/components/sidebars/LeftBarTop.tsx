import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

import { RoomsSearch } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
	roomsTitle: string;
	top: string;
	icon: string;
};

const LeftBarTop = (props: Props) => {
	const styles: Styles = {
		container:
			'flex flex-col gap-4 border-b-8 border-purple-100 border-b-6',
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
			<RoomsSearch />
		</section>
	);
};

export default LeftBarTop;
