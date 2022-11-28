import React from 'react';

interface Props {
	charaName: string;
	charaMssg: string;
	timeSent: string;
	charaPic: string;
}
type Styles = {
	container: string;
	timeWrapper: string;
	body: string;
	charaName: string;
	topOfMssg: string;
	img: string;
	mssgInfo: string;
	chatBoxText: string;
	timeText: string;
};

const ChatBox = (props: Props) => {
	const styles: Styles = {
		container: 'flex mb-2',
		timeWrapper: 'flex flex-col ml-2',
		body: 'bg-purple-300 h-fit w-fit shadow-md shadow-purple-800/50 rounded-xl pb-1',
		charaName: 'font-bold',
		img: 'p-2',
		mssgInfo: 'flex flex-col border-l-2 border-purple-400',
		topOfMssg:
			'flex flex-row justify-between bg-purple-400/50 pt-1 pl-2 pr-2 rounded-tr-xl',
		chatBoxText: 'mx-2',
		timeText: 'italic text-[12px] text-purple-500',
	};

	const date = new Date(props.timeSent);

	const getDateFormat = () => {
		const year = String(date.getFullYear()).slice(-2);
		const month = String(date.getMonth());
		const day = String(date.getDate());

		const dateFormat = [month, day, year].join('-');
		return dateFormat;
	};

	const getTimeFormat = () => {
		let hours = date.getHours();
		let minutes: string | number = date.getMinutes();
		const ampm = hours >= 12 ? 'pm' : 'am';

		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		const strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	};

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<img className={styles.img} src={props.charaPic} />
				<div className={styles.mssgInfo}>
					<div className={styles.topOfMssg}>
						<p className={styles.charaName}>
							{props.charaName}:
						</p>
						<p className='eventMarker'>Current Chapter</p>
					</div>
					<p className={styles.chatBoxText}>{props.charaMssg}</p>
				</div>
			</div>
			<div className={styles.timeWrapper}>
				<p className={styles.timeText}>{getDateFormat()}</p>
				<p className={styles.timeText}>{getTimeFormat()}</p>
			</div>
		</div>
	);
};

export default ChatBox;
