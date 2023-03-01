import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

import { RoomsSearch } from '../exporter';

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
        container: 'flex flex-col gap-4 border-purple-100 bg-purple-300 rounded-br-lg transition',
        roomsTitle: 'text-center font-bold text-lg transition',
        top: 'flex flex-row place-items-stretch transition',
        homeLink: 'flex flex-row py-2 bg-purple-400 justify-center items-center gap-2 h-full w-full',
        icon: '',
        arrBtnOpen: 'bg-purple-400 h-full w-full border-2 border-purple-600 hover:bg-purple-600 transition',
        arrBtnClose: 'bg-purple-200 px-2 h-full w-full border-2 border-purple-400 hover:bg-purple-600 transition',
        topClosed: 'flex flex-row transition w-full',
    };

    const rightArrIcon = <FontAwesomeIcon icon={solid('arrow-right')} />;
    const leftArrIcon = <FontAwesomeIcon icon={solid('arrow-left')} />;

    const homeIcon = <FontAwesomeIcon icon={solid('house')} size="lg" className={styles.icon} />;

    if (props.isOpened) {
        return (
            <section className={styles.container}>
                <div className={styles.top}>
                    <Link className={styles.homeLink} to="/">
                        {homeIcon}
                        <p className={styles.roomsTitle}>RP Rooms</p>
                    </Link>
                    <div className={styles.top}>
                        <button className={styles.arrBtnClose} onClick={props.toggleLeftBar}>
                            {leftArrIcon}
                        </button>
                    </div>
                </div>
                <RoomsSearch callRefreshMessages={props.callRefreshMessages} isOpened={props.isOpened} />
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <div className={styles.topClosed}>
                <div className={styles.topClosed}>
                    <button className={styles.arrBtnOpen} onClick={props.toggleLeftBar}>
                        {rightArrIcon}
                    </button>
                </div>
            </div>
            <RoomsSearch callRefreshMessages={props.callRefreshMessages} isOpened={props.isOpened} />
        </section>
    );
};

export default LeftBarTop;
