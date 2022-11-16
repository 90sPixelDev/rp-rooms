import React from 'react';

interface Props {
	title: string;
}
type Styles = {
	body: string;
};

const DropDownItem = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 hover:bg-purple-300 transition',
	};

	// return <button className={styles.body}>{props.title}</button>;
	return <button className={styles.body}>{props.title}</button>;
};

export default DropDownItem;
