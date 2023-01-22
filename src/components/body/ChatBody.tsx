import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { ChatBoxContainer, RoomTopTitle } from '../exporter';

interface MessageInfo {
    userName: string;
    message: string;
    uid: string;
    timeSent: any;
    photoURL: string;
}
type InitialMssgInfo = {
    message: string;
};
interface Props {
    roomTitle: string;
    refresh: boolean;
    currentTab: string;
    changeTab: (tab: string) => void;
}
type Styles = {
    body: string;
};

const ChatBody = (props: Props) => {
    const styles: Styles = {
        body: 'bg-purple-100 rounded-b-2xl h-full flex flex-col',
    };

    const [messagesArray, setMessagesArray] = useState<MessageInfo[] | null>(null);
    const [currentCh, setCurrentCh] = useState<object>({});
    const [isLoading, setIsLoading] = useState(true);

    const getRoomInfo = () => {
        // TODO getDocs of Room like Room Story Events, Room Characters, Room Chapters, as well as Room messages of course and then conver to need state formate and pass down as prop to children
    };

    const getMessages = async () => {
        const roomRef = doc(db, 'rooms', props.roomTitle);
        const docSnap = await getDoc(roomRef);

        if (docSnap.exists()) {
            setCurrentCh(docSnap.data().currentChapter);
            const mssgArr = docSnap.data()[props.currentTab];

            setMessagesArray(
                mssgArr.map(
                    (msg: MessageInfo) =>
                        (msg = {
                            ...msg,
                            timeSent: msg.timeSent.toDate(),
                        }),
                ),
            );
        } else {
            // doc.data() will be undefined in this case
            console.log('No such Room exists!');
        }
    };

    useEffect(() => {
        props.roomTitle && getMessages();
    }, [props.roomTitle, props.refresh, props.currentTab]);

    useEffect(() => {
        if (messagesArray !== null) {
            setIsLoading(false);
        }
    }, [messagesArray]);

    return (
        <div className={styles.body}>
            <RoomTopTitle
                currentChInfo={currentCh}
                changeTab={props.changeTab}
                currentTab={props.currentTab}
                roomTitle={props.roomTitle}
            />
            <ChatBoxContainer
                messages={messagesArray as MessageInfo[]}
                isLoading={isLoading}
                currentTab={props.currentTab}
            />
        </div>
    );
};

export default ChatBody;
