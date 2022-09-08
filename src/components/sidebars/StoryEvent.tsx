import React from 'react';

type Props = unknown;
type Styles = {
	container: string;
};

const StoryEvent = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-100 rounded-2xl px-1 border-2 hover:border-purple-400 hover:bg-purple-200',
	};

	return <button className={styles.container}>StoryEvent</button>;
};

export default StoryEvent;
