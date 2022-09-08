import React from 'react';

type Props = unknown;
type Styles = {
	narratorBtn: string;
	skipBtn: string;
};

const ChatTypeButtons = (props: Props) => {
	const styles: Styles = {
		narratorBtn:
			'm-1 mt-2 px-2 border-[1px] border-purple-400 bg-purple-300 hover:bg-purple-200 rounded-lg ',
		skipBtn: 'm-1 mt-2 px-2 border-[1px] border-red-400 bg-red-300 hover:bg-red-200 rounded-lg',
	};

	return (
		<div>
			<button className={styles.narratorBtn}>Narrator</button>
			<button className={styles.skipBtn}>Skip Turn ⇥</button>
		</div>
	);
};

export default ChatTypeButtons;
