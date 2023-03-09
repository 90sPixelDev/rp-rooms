import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

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
        body: 'flex flex-row mr-[7%] rounded-lg pr-2 gap-1 place-items-center w-fit min-w-fit w-[7rem] cursor-pointer ',
        iconBody: 'rounded-l-lg px-2 py-2 ',
        iconBodyClosed: 'rounded-r-lg py-2 cursor-pointer flex flex-row ',
        icon: 'mx-auto',
        text: 'm-auto',
    };

    const theme = useContext(ThemeContext);

    if (props.isOpened)
        return (
            <div
                className={styles.body + `bg-${theme?.themeColor}-400 hover:text-${theme?.themeColor}-200`}
                onClick={props.openOptions}
            >
                <FontAwesomeIcon icon={solid('gear')} className={styles.iconBody + `bg-${theme?.themeColor}-500`} />
                <p className={styles.text}>Options</p>
            </div>
        );

    return (
        <div
            className={styles.iconBodyClosed + `bg-${theme?.themeColor}-400 hover:text-${theme?.themeColor}-200`}
            onClick={props.openOptions}
        >
            <FontAwesomeIcon icon={solid('gear')} className={styles.icon} />
        </div>
    );
};

export default OptionsControl;
