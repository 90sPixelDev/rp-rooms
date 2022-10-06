import React from 'react';

type Props = unknown;
type Styles = {
	container: string;
	currentChara: string;
	characterName: string;
};

const TurnManager = (props: Props) => {
	const styles: Styles = {
		container:
			'h-[50%] w-[100%] bg-purple-300 rounded-full mt-2 flex flex-row gap-12 overflow-x-auto scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
		currentChara:
			'flow-root min-w-fit min-h-fit bg-white rounded-full px-2 m-auto border-2 border-purple-400',
		characterName:
			'flow-root min-w-fit min-h-fit bg-purple-100 rounded-full px-2 m-auto',
	};

	return (
		<div className={styles.container}>
			<p className={styles.currentChara}>Abbi White</p>
			<p className={styles.characterName}>Trent Luz</p>
			<p className={styles.characterName}>Kiara Star</p>
		</div>
	);
};

export default TurnManager;
