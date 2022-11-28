import React, { useState, useEffect } from 'react';

interface Props {
	changeTab: (tab: string) => void;
	currentTab: string;
}

type Styles = {
	container: string;
	containerSelected: string;
};

const ChattingTab = (props: Props) => {
	const styles: Styles = {
		container:
			'absolute right-[60%] bg-purple-200 border-b-2 border-r-2 border-l-2 border-purple-400 rounded-b-lg px-2 text-sm md:text-base hover:bg-purple-300',
		containerSelected:
			'absolute right-[60%] bg-purple-300 border-b-2 border-r-2 border-l-2 border-purple-500 rounded-b-lg px-2 text-sm md:text-base',
	};

	if (props.currentTab === 'chat')
		return (
			<button
				className={styles.containerSelected}
				onClick={() => props.changeTab('chat')}
			>
				Chat
			</button>
		);

	return (
		<button
			className={styles.container}
			onClick={() => props.changeTab('chat')}
		>
			Chat
		</button>
	);
};

export default ChattingTab;
