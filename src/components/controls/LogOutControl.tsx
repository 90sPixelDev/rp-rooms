import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    isOpened: boolean;
}
type Styles = {
    container: string;
    text: string;
    icon: string;
    iconClosed: string;
};

const LogOutControl = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-row gap-1 rounded-xl w-fit pr-2 min-w-fit w-[7rem] ',
        text: 'm-auto',
        icon: 'p-2 rounded-l-xl ',
        iconClosed: 'p-2 rounded-r-xlcursor-pointer rounded-r-lg ',
    };

    const theme = useContext(ThemeContext);

    if (props.isOpened)
        return (
            <button
                className={styles.container + `bg-${theme?.themeColor}-400 hover:text-${theme?.themeColor}-200`}
                onClick={() => {
                    signOut(auth);
                }}
            >
                <FontAwesomeIcon
                    icon={solid('arrow-right-from-bracket')}
                    className={styles.icon + `bg-${theme?.themeColor}-500`}
                />
                <p className={styles.text}>Log Out</p>
            </button>
        );
    return (
        <FontAwesomeIcon
            icon={solid('arrow-right-from-bracket')}
            className={styles.iconClosed + `bg-${theme?.themeColor}-400 hover:text-${theme?.themeColor}-200`}
            onClick={() => signOut(auth)}
        />
    );
};

export default LogOutControl;
