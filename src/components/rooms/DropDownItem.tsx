import React from 'react';

interface Props {
	title: string;
	addSelectedRoom: (room: string) => void;
}
type Styles = {
	body: string;
};

const DropDownItem = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 hover:bg-purple-200 transition hover:border-purple-400 border-2',
	};

	return (
		<button
			className={styles.body}
			onClick={() => props.addSelectedRoom(props.title)}
		>
			{props.title}
		</button>
	);
};

export default DropDownItem;
