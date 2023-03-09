import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../context/ThemeContext';

type Props = unknown;
type Styles = {
    container: string;
    btn: string;
    skipBtn: string;
    icon: string;
};

const ChatTypeButtons = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-row overflow-x-auto h-12 overflow-y-hidden xsm:text-sm lg:text-base',
        btn: 'm-1 mt-1 px-2 border-[1px] rounded-lg ',
        skipBtn: 'm-1 mt-1 px-2 border-[1px] rounded-lg ',
        icon: '',
    };

    const theme = useContext(ThemeContext);

    const skipIcon = <FontAwesomeIcon icon={solid('angles-right')} size="lg" className={styles.icon} />;

    return (
        <div className={styles.container}>
            <button
                className={
                    styles.btn +
                    `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-200`
                }
            >
                Narrator
            </button>
            <button
                className={
                    styles.btn +
                    `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-200`
                }
            >
                New Chapter
            </button>
            <button
                className={
                    styles.btn +
                    `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-200`
                }
            >
                New Event
            </button>
            <button
                className={
                    styles.skipBtn +
                    `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-200`
                }
            >
                End Turn {skipIcon}
            </button>
        </div>
    );
};

export default ChatTypeButtons;
