import React from 'react';

interface Props {
    photoURL: string;
    displayName: string;
    mssgText: string;
    timeSent: string;
}
type Styles = {
    container: string;
    timeWrapper: string;
    body: string;
    leftSide: string;
    mssgInfo: string;
    displayName: string;
    imgContainer: string;
    img: string;
    topOfMssg: string;
    chatBoxText: string;
    timeText: string;
};

const ChatBox = (props: Props) => {
    const styles: Styles = {
        container: 'flex mb-2',
        timeWrapper: 'flex flex-col items-end mr-1',
        body: 'flex flex-row bg-purple-300 h-fit w-fit shadow-md shadow-purple-800/50 rounded-xl',
        leftSide: 'flex flex-col justify-between',
        imgContainer:
            'flex flex-row min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] m-2 items-center rounded-xl overflow-hidden',
        img: 'h-full w-full object-contain',
        mssgInfo: 'flex flex-col border-l-2 border-purple-400',
        displayName: 'font-bold',
        topOfMssg: 'flex flex-row justify-between bg-gradient-to-r from-purple-400 pt-1 pl-2 pr-2 rounded-tr-xl',
        chatBoxText: 'mx-2 pb-1',
        timeText: 'italic text-[12px] text-purple-900',
    };

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

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.leftSide}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={props.photoURL} />
                    </div>
                    <div className={styles.timeWrapper}>
                        <p className={styles.timeText}>{getTimeFormat()}</p>
                        <p className={styles.timeText}>{getDateFormat()}</p>
                    </div>
                </div>
                <div className={styles.mssgInfo}>
                    <div className={styles.topOfMssg}>
                        <p className={styles.displayName}>{props.displayName}:</p>
                    </div>
                    <p className={styles.chatBoxText}>{props.mssgText}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
