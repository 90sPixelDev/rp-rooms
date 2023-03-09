import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

import RoomsSearchClosed from '../rooms/RoomsSearchClosed';
import { RoomsSearchOpened } from '../exporter';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    callRefreshMessages: (roomTitle: string) => void;
    toggleLeftBar: () => void;
    isOpened: boolean;
}
type Styles = {
    container: string;
    roomsTitle: string;
    top: string;
    homeLink: string;
    icon: string;
    arrBtnOpen: string;
    arrBtnClose: string;
    topClosed: string;
};

const LeftBarTop = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-col gap-4 rounded-br-lg transition max-h-[50%] ',
        roomsTitle: 'text-center font-bold text-lg transition',
        top: 'flex flex-row place-items-stretch transition',
        homeLink: 'flex flex-row py-2 justify-center items-center gap-2 h-full w-full ',
        icon: '',
        arrBtnOpen: 'h-full w-full border-2 border-purple-600 transition rounded-br-2xl ',
        arrBtnClose: 'px-2 h-full w-full border-2 hover:bg-purple-600 transition ',
        topClosed: 'flex flex-row transition w-full',
    };

    const theme = useContext(ThemeContext);

    const rightArrIcon = <FontAwesomeIcon icon={solid('arrow-right')} />;
    const leftArrIcon = <FontAwesomeIcon icon={solid('arrow-left')} />;

    const homeIcon = <FontAwesomeIcon icon={solid('house')} size="lg" className={styles.icon} />;

    if (props.isOpened) {
        return (
            <section className={styles.container + `bg-${theme?.themeColor}-300`}>
                <div className={styles.top}>
                    <Link className={styles.homeLink + `bg-${theme?.themeColor}-400`} to="/">
                        {homeIcon}
                        <p className={styles.roomsTitle}>RP Rooms</p>
                    </Link>
                    <div className={styles.top}>
                        <button
                            className={
                                styles.arrBtnClose +
                                `bg-${theme?.themeColor}-200 hover:bg-${theme?.themeColor}-600 border-${theme?.themeColor}-400`
                            }
                            onClick={props.toggleLeftBar}
                        >
                            {leftArrIcon}
                        </button>
                    </div>
                </div>
                {props.isOpened && <RoomsSearchOpened callRefreshMessages={props.callRefreshMessages} />}
                {!props.isOpened && <RoomsSearchClosed callRefreshMessages={props.callRefreshMessages} />}
            </section>
        );
    }

    return (
        <section className={styles.container + `bg-${theme?.themeColor}-300`}>
            <div className={styles.topClosed}>
                <div className={styles.topClosed}>
                    <button
                        className={
                            styles.arrBtnOpen +
                            `bg-${theme?.themeColor}-400 hover:bg-${theme?.themeColor}-600 border-${theme?.themeColor}-600`
                        }
                        onClick={props.toggleLeftBar}
                    >
                        {rightArrIcon}
                    </button>
                </div>
            </div>
            {props.isOpened && <RoomsSearchOpened callRefreshMessages={props.callRefreshMessages} />}
            {!props.isOpened && <RoomsSearchClosed callRefreshMessages={props.callRefreshMessages} />}
        </section>
    );
};

export default LeftBarTop;
