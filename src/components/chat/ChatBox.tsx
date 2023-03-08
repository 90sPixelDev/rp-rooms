import React, { useContext, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    photoURL: string;
    displayName: string;
    mssgText: string;
    uid: string;
    roomTitle: string;
    timeSent: string;
}

const ChatBox = (props: Props) => {
    const styles = {
        container: 'flex flex-col mb-2 mr-4',
        infoBoxContainer:
            'absolute flex flex-col z-3 sm:w-[30vw] sm:h-[15vh] rounded-r-lg rounded-bl-lg shadow-md border-2 ',
        topInfoBox: 'flex flex-row justify-between bg-gradient-to-r ',
        userInfo: 'my-auto ml-2',
        infoBoxX: 'px-2 py-1 rounded-tr-lg text-white ',
        infoBoxBody: 'flex flex-row w-full p-2',
        userSide: 'w-full border-r-4 ',
        charaSide: 'w-full ',
        timeWrapper: 'flex flex-col items-end mr-1',
        body: 'flex flex-row h-fit w-fit shadow-md rounded-xl ',
        leftSide: 'flex flex-col justify-between',
        imgContainer:
            'flex flex-row lg:min-w-[60px] lg:max-w-[60px] lg:min-h-[60px] lg:max-h-[60px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] m-2 items-center rounded-xl overflow-hidden ',
        img: 'h-full w-full object-contain',
        mssgInfo: 'flex flex-col border-l-2 ',
        displayName: 'font-bold cursor-default hover:underline',
        topOfMssg: 'flex flex-row justify-between bg-gradient-to-r pt-1 pl-2 pr-2 rounded-tr-xl w-full ',
        chatBoxText: 'mx-2 pb-1',
        timeText: 'italic text-[12px] ',
    };

    const theme = useContext(ThemeContext);
    const mssgBoxRef = useRef(null);

    const [isHoveringOverUser, setIsHoveringOverUser] = useState(false);
    const [infoBoxPos, setInfoBoxPos] = useState({ top: '0px', left: '0px' });
    const [userInfo, setUserInfo] = useState({ chatName: 'chatName', charaName: 'charaName' });

    const date = new Date(props.timeSent);

    const getDateFormat = () => {
        const year = String(date.getFullYear()).slice(-2);
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate());

        const dateFormat = [month, day, year].join('-');
        return dateFormat;
    };

    const getTimeFormat = () => {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    const displayInfoBox = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setInfoBoxPos({ top: `${e.clientY}px`, left: `${e.clientX}px` });
        getUserInfo();
    };

    const getUserInfo = async () => {
        const roomRef = doc(db, 'rooms', props.roomTitle);
        const roomDoc = await getDoc(roomRef);

        const chara = roomDoc.data()?.characters[props.uid];

        setUserInfo({ chatName: props.displayName, charaName: chara.charaName });

        setIsHoveringOverUser(true);
    };

    return (
        <div className={styles.container} ref={mssgBoxRef}>
            <div className={styles.body + `shadow-${theme?.themeColor}-800/50 bg-${theme?.themeColor}-300`}>
                <div className={styles.leftSide}>
                    <div className={styles.imgContainer + `bg-${theme?.themeColor}-300`}>
                        <img className={styles.img} src={props.photoURL} />
                    </div>
                    <div className={styles.timeWrapper}>
                        <p className={styles.timeText + `text-${theme?.themeColor}-900`}>{getTimeFormat()}</p>
                        <p className={styles.timeText}>{getDateFormat()}</p>
                    </div>
                </div>
                <div className={styles.mssgInfo + `border-${theme?.themeColor}-400`}>
                    <div className={styles.topOfMssg + `from-${theme?.themeColor}-400`}>
                        <p className={styles.displayName} onClick={(e) => displayInfoBox(e)}>
                            {props.displayName}:
                        </p>
                        {isHoveringOverUser && (
                            <div
                                className={
                                    styles.infoBoxContainer +
                                    `bg-${theme?.themeColor}-500 shadow-${theme?.themeColor}-900`
                                }
                                style={infoBoxPos}
                            >
                                <div className={styles.topInfoBox + `from-${theme?.themeColor}-300`}>
                                    <p className={styles.userInfo}>User Info</p>
                                    <button
                                        className={styles.infoBoxX + `bg-${theme?.themeColor}-700`}
                                        onClick={() => setIsHoveringOverUser(false)}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className={styles.infoBoxBody}>
                                    <div
                                        className={
                                            styles.userSide +
                                            `bg-${theme?.themeColor}-300 border-${theme?.themeColor}-500`
                                        }
                                    >
                                        <p className={'ml-1'}>{userInfo.chatName}</p>
                                    </div>
                                    <div className={styles.charaSide + `bg-${theme?.themeColor}-300`}>
                                        <p className={'ml-1'}>{userInfo.charaName}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className={styles.chatBoxText}>{props.mssgText}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
