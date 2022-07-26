import React from 'react';

import { RoomsSearch } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
	roomsTitle: string;
};

const SideBarTop = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-col gap-4',
		roomsTitle: 'text-center font-bold text-lg',
	};

	return (
		<section className={styles.container}>
			<p className={styles.roomsTitle}>RP Rooms</p>
			<RoomsSearch />
		</section>
	);
};

export default SideBarTop;
