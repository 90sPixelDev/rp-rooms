import React, { useContext } from 'react';
import { EventsList } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    toggleRightBar: () => void;
    isOpened: boolean;
}
type Styles = {
    containerOpen: string;
    topOpen: string;
    arrBtnOpen: string;
    textTopOpen: string;
    containerClosed: string;
    topClosed: string;
    arrBtnClose: string;
    textTopClosed: string;
};

const RightBar = (props: Props) => {
    const styles: Styles = {
        containerOpen: 'h-[98.5%] w-[93%] m-auto rounded-2xl shadow-md transition ',
        topOpen: 'flex flex-row rounded-t-2xl h-7 transition ',
        arrBtnOpen: 'border-2 rounded-bl-2xl w-full transition ',
        textTopOpen: 'text-center m-auto transition font-bold',
        containerClosed: 'transition',
        topClosed: '',
        arrBtnClose: 'absolute rounded-tl-2xl border-2 w-fit px-2 transition ',
        textTopClosed: 'transition',
    };

    const theme = useContext(ThemeContext);

    const rightArrIcon = <FontAwesomeIcon icon={solid('arrow-right')} />;
    const leftArrIcon = <FontAwesomeIcon icon={solid('arrow-left')} />;

    if (props.isOpened)
        return (
            <div className={styles.containerOpen + `bg-${theme?.themeColor}-300`}>
                <div className={styles.topOpen + `bg-${theme?.themeColor}-400`}>
                    <button
                        className={
                            styles.arrBtnClose +
                            `bg-${theme?.themeColor}-200 border-${theme?.themeColor}-400  hover:bg-${theme?.themeColor}-600`
                        }
                        onClick={props.toggleRightBar}
                    >
                        {rightArrIcon}
                    </button>
                    <p className={styles.textTopOpen}>Timeline</p>
                </div>
                <EventsList isOpened={props.isOpened} />
            </div>
        );

    return (
        <div className={styles.containerClosed}>
            <div className={styles.topClosed}>
                <button
                    className={
                        styles.arrBtnOpen +
                        `bg-${theme?.themeColor}-400  hover:bg-${theme?.themeColor}-600 border-${theme?.themeColor}-600`
                    }
                    onClick={props.toggleRightBar}
                >
                    {leftArrIcon}
                </button>
            </div>
            <EventsList isOpened={props.isOpened} />
        </div>
    );
};

export default RightBar;
