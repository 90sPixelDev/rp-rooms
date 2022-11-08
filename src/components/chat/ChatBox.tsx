import React from 'react';

interface Props {
	charaName: string;
	charaMssg: string;
}
type Styles = {
	container: string;
	timeWrapper: string;
	body: string;
	charaName: string;
	chatBoxText: string;
	timeText: string;
};

const ChatBox = (props: Props) => {
	const styles: Styles = {
		container: 'flex mb-2',
		timeWrapper: 'flex flex-col ml-2',
		body: 'bg-purple-300 h-fit w-fit p-2 rounded-xl shadow-md shadow-purple-800/50',
		charaName: 'font-bold',
		chatBoxText: 'italic',
		timeText: 'italic text-[12px] text-purple-500',
	};

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<p className={styles.charaName}>{props.charaName}</p>
				<p className={styles.chatBoxText}>{props.charaMssg}</p>
			</div>
			<div className={styles.timeWrapper}>
				<p className={styles.timeText}>11-3-22</p>
				<p className={styles.timeText}>6:30 pm</p>
			</div>
		</div>
	);
};

export default ChatBox;
