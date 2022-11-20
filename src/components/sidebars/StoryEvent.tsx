import React from 'react';

interface Props {
	isOpened: boolean;
}
type Styles = {
	containerOpen: string;
	containerClosed: string;
};

const StoryEvent = (props: Props) => {
	const styles: Styles = {
		containerOpen: 'bg-purple-100 rounded-2xl px-1 hover:bg-purple-200',
		containerClosed:
			'bg-purple-100 rounded-2xl px-1 hover:bg-purple-300 overflow-hidden',
	};

	if (props.isOpened)
		return <button className={styles.containerOpen}>StoryEvent</button>;

	return <button className={styles.containerClosed}>StoryEvent</button>;
};

export default StoryEvent;
