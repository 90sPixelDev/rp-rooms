import React from 'react';

import { RoomsSearch } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
	roomsTitle: string;
};

const LeftBarTop = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-col gap-4 border-b-8 border-purple-100',
		roomsTitle: 'text-center font-bold text-lg mt-3',
	};

	return (
		<section className={styles.container}>
			<p className={styles.roomsTitle}>RP Rooms</p>
			<RoomsSearch />
		</section>
	);
};

export default LeftBarTop;
