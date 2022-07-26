import React from 'react';

import { SideBarTop, RoomListContainer } from '../exporter';

type Props = unknown;
type Styles = {
	container: string;
};

const SideBar = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-col gap-4',
	};

	return (
		<section className={styles.container}>
			<SideBarTop />
			<RoomListContainer />
		</section>
	);
};

export default SideBar;
