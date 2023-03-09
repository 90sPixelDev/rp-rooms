import React, { Fragment, useContext, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { ThemeContext } from '../../context/ThemeContext';
import { Transition } from '@headlessui/react';

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
            'absolute flex flex-col z-20 sm:w-[30vw] sm:h-[15vh] rounded-r-lg rounded-bl-lg shadow-md border-2 ',
        topInfoBox: 'flex flex-row justify-between bg-gradient-to-r ',
        userInfo: 'my-auto ml-2',
        infoBoxX: 'px-2 py-1 rounded-tr-lg border-2 text-white ',
        infoBoxBody: 'flex flex-row w-full h-full p-2 text-sm',
        userSide: 'w-full ',
        charaSide: 'w-full h-full flex flex-col justify-between ',
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

    const [displayBoxVisible, setDisplayBoxVisible] = useState(false);
    const [userInfo, setUserInfo] = useState<{ chatName: string; charaName: string; dateJoinedRoom: string | Date }>({
        chatName: 'chatName',
        charaName: 'charaName',
        dateJoinedRoom: '00-00-0000',
    });

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

    const getUserInfo = async () => {
        const roomRef = doc(db, 'rooms', props.roomTitle);
        const roomDoc = await getDoc(roomRef);

        const chara = roomDoc.data()?.characters[props.uid];

        setUserInfo({
            chatName: props.displayName,
            charaName: chara.charaName,
            dateJoinedRoom: chara.dateJoined.toDate().toDateString(),
        });
        setDisplayBoxVisible(true);
    };

    const infoBox = (
        <Transition
            show={displayBoxVisible}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={styles.infoBoxContainer + `bg-${theme?.themeColor}-500 shadow-${theme?.themeColor}-900`}>
                <div className={styles.topInfoBox + `from-${theme?.themeColor}-300`}>
                    <p className={styles.userInfo}>User Info</p>
                    <button
                        className={
                            styles.infoBoxX +
                            `bg-${theme?.themeColor}-700 hover:bg-${theme?.themeColor}-400 border-${theme?.themeColor}-700`
                        }
                        onClick={() => setDisplayBoxVisible(false)}
                    >
                        X
                    </button>
                </div>
                <div className={styles.infoBoxBody}>
                    <div className={styles.userSide}>
                        <p className={`ml-1 font-bold border-b-2 border-${theme?.themeColor}-700`}>
                            {userInfo.chatName}
                        </p>
                    </div>
                    <div
                        className={`mx-1 h-full w-1 bg-gradient-to-b from-${theme?.themeColor}-400 via-${theme?.themeColor}-300 to-${theme?.themeColor}-400`}
                    />
                    <div className={styles.charaSide}>
                        <p className={`ml-1 font-bold border-b-2 border-${theme?.themeColor}-700`}>
                            {userInfo.charaName}
                        </p>
                        <div>
                            <p className={`ml-1 font-bold border-t-2 border-${theme?.themeColor}-700`}>Joined Room:</p>
                            <p className={'ml-1'}>{userInfo.dateJoinedRoom as string}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );

    return (
        <Transition
            show={true}
            appear={true}
            as={Fragment}
            enter="transition duration-500"
            enterFrom="opacity-0 -translate-x-10"
            enterTo="opacity-100"
            leave="transition duration-250"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 -translate-x-10"
        >
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
                            <div>
                                <p className={styles.displayName} onClick={(e) => getUserInfo()}>
                                    {props.displayName}:
                                </p>
                                {infoBox}
                            </div>
                        </div>
                        <p className={styles.chatBoxText}>{props.mssgText}</p>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default ChatBox;
