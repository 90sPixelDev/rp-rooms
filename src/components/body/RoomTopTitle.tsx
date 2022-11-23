import React from 'react';
import loadingAnim from '../../resources/ui/loading-anim.svg';

interface Props {
	currentChInfo: Record<string, any>;
}
type Styles = {
	container: string;
	roomTitle: string;
	loading: string;
};

const RoomTopTitle = (props: Props) => {
	const styles: Styles = {
		container:
			'bg-purple-300 h-fit w-[98%] py-1 rounded-b-2xl mx-auto drop-shadow-md shadow-purple-500',
		roomTitle: 'flow-root m-auto font-bold w-fit min-h-[20px]',
		loading: 'h-6 m-auto',
	};

	if (
		props.currentChInfo.num === '' ||
		props.currentChInfo.num === null ||
		props.currentChInfo.num === undefined
	) {
		return (
			<div className={styles.container}>
				<img className={styles.loading} src={loadingAnim} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<p className={styles.roomTitle}>
				{props.currentChInfo.num}: {props.currentChInfo.desc}
			</p>
		</div>
	);
};

export default RoomTopTitle;
