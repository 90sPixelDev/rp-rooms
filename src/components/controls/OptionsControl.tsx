import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface Props {
	isOpened: boolean;
}
type Styles = {
	body: string;
	iconBody: string;
	iconBodyClosed: string;
	text: string;
};

const OptionsControl = (props: Props) => {
	const styles: Styles = {
		body: 'flex flex-row mr-[7%] bg-purple-400 rounded-lg pr-2 gap-1 place-items-center w-fit hover:text-purple-200 min-w-fit w-[7rem]',
		iconBody: 'bg-purple-500 rounded-l-lg px-2 py-2',
		iconBodyClosed: 'bg-purple-500 rounded-r-lg py-2',
		text: 'm-auto',
	};

	if (props.isOpened)
		return (
			<button className={styles.body}>
				<FontAwesomeIcon
					icon={solid('gear')}
					className={styles.iconBody}
				/>
				<p className={styles.text}>Options</p>
			</button>
		);

	return (
		<FontAwesomeIcon
			icon={solid('gear')}
			className={styles.iconBodyClosed}
		/>
	);
};

export default OptionsControl;
