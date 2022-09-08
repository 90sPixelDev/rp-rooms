import React from 'react';

type Props = unknown;
type Styles = {
	container: string;
};

const RightBar = (props: Props) => {
	const styles: Styles = {
		container: 'bg-purple-300',
	};

	return <div className={styles.container}>TIMELINE</div>;
};

export default RightBar;
