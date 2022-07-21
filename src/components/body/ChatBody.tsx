import React from 'react';

type Props = {};

const ChatBody = (props: Props) => {
	const styles = {
		body: 'bg-purple-100 rounded-bl-2xl rounded-tl-2xl',
	};

	return <div className={styles.body}>[ChatBody]</div>;
};

export default ChatBody;
