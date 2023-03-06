import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

interface Props {
    isOpened: boolean;
    openOptions: () => void;
}
type Styles = {
    body: string;
    icon: string;
    iconBody: string;
    iconBodyClosed: string;
    text: string;
};

const OptionsControl = (props: Props) => {
    const styles: Styles = {
        body: 'flex flex-row mr-[7%] bg-purple-400 rounded-lg pr-2 gap-1 place-items-center w-fit hover:text-purple-200 min-w-fit w-[7rem]',
        iconBody: 'bg-purple-500 rounded-l-lg px-2 py-2',
        iconBodyClosed: 'bg-purple-500 rounded-r-lg py-2 hover:text-purple-200 cursor-pointer flex flex-row',
        icon: 'mx-auto',
        text: 'm-auto',
    };

    if (props.isOpened)
        return (
            <div className={styles.body} onClick={props.openOptions}>
                <FontAwesomeIcon icon={solid('gear')} className={styles.iconBody} />
                <p className={styles.text}>Options</p>
            </div>
        );

    return (
        <div className={styles.iconBodyClosed} onClick={props.openOptions}>
            <FontAwesomeIcon icon={solid('gear')} className={styles.icon} />
        </div>
    );
};

export default OptionsControl;
