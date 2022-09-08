import React from 'react';
import StoryEvent from './StoryEvent';

type Props = unknown;
type Styles = {
	container: string;
};

const EventsList = (props: Props) => {
	const styles: Styles = {
		container: 'flex flex-col gap-4 m-2',
	};

	return (
		<div className={styles.container}>
			<StoryEvent />
			<StoryEvent />
			<StoryEvent />
			<StoryEvent />
			<StoryEvent />
		</div>
	);
};

export default EventsList;
