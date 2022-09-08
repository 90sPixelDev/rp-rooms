import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = unknown;
type Styles = {
	body: string;
};

const OptionsControl = (props: Props) => {
	const styles: Styles = {
		body: 'mr-[7%]',
	};

	const optionsIcon = <FontAwesomeIcon icon={solid('gear')} size='lg' />;

	return <button className={styles.body}>{optionsIcon}</button>;
};

export default OptionsControl;
