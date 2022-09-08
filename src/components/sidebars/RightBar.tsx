import React from 'react';
import EventsList from './EventsList';

type Props = unknown;
type Styles = {
	container: string;
	top: string;
};

const RightBar = (props: Props) => {
	const styles: Styles = {
		container:
			'h-[98.5%] w-[93%] m-auto bg-purple-300 rounded-2xl shadow-md',
		top: 'text-center bg-purple-400 rounded-t-2xl',
	};

	return (
		<div className={styles.container}>
			<p className={styles.top}>Timeline</p>
			<EventsList />
		</div>
	);
};

export default RightBar;
