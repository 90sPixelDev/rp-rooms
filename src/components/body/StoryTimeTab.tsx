import React from 'react';

type Props = any;
type Styles = {
	container: string;
	containerSelected: string;
};

const StoryTimeTab = (props: Props) => {
	const styles: Styles = {
		container:
			'absolute left-[60%] bg-purple-200 border-b-2 border-r-2 border-l-2 border-purple-400 rounded-b-lg px-2 text-sm md:text-base hover:bg-purple-300',
		containerSelected:
			'absolute left-[60%] bg-purple-300 border-b-2 border-r-2 border-l-2 border-purple-500 rounded-b-lg px-2 text-sm md:text-base',
	};

	if (props.currentTab === 'story')
		return (
			<button
				className={styles.containerSelected}
				onClick={() => props.changeTab('story')}
			>
				Story
			</button>
		);

	return (
		<button
			className={styles.container}
			onClick={() => props.changeTab('story')}
		>
			Story
		</button>
	);
};

export default StoryTimeTab;
