import React from 'react';

type Props = unknown;
type Styles = {
	button: string;
};

const ChatTypeButton = (props: Props) => {
	const styles: Styles = {
		button: 'm-1 mt-2 px-2 border-[1px] border-purple-400 bg-purple-300 hover:bg-purple-200 rounded-lg',
	};

	return <button className={styles.button}>Narrator</button>;
};

export default ChatTypeButton;
