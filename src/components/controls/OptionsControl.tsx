import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = unknown;
type Styles = {
	body: string;
	iconBody: string;
	text: string;
};

const OptionsControl = (props: Props) => {
	const styles: Styles = {
		body: 'flex flex-row mr-[7%] bg-purple-400 rounded-lg pr-2 gap-1 place-items-center w-fit hover:text-purple-200 w-[100%]',
		iconBody: 'bg-purple-500 rounded-l-lg px-2 py-2',
		text: 'm-auto',
	};

	const optionsIcon = (
		<FontAwesomeIcon icon={solid('gear')} className={styles.iconBody} />
	);

	return (
		<button className={styles.body}>
			{optionsIcon}
			<p className={styles.text}>Options</p>
		</button>
	);
};

export default OptionsControl;
