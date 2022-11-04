import React from 'react';

type Props = unknown;
type Styles = {
	body: string;
};

const ChatListTest = (props: Props) => {
	const styles: Styles = {
		body: 'bg-red-400',
	};

	return (
		<div className={styles.body}>
			<h1></h1>
		</div>
	);
};

export default ChatListTest;
