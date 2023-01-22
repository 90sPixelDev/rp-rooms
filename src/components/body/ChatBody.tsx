import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { MessageInfo } from '../../hooks/types';
import useMessages from '../../hooks/useMessages';
import { ChatBoxContainer, RoomTopTitle } from '../exporter';

// interface MessageInfo {
//     userName: string;
//     message: string;
//     uid: string;
//     timeSent: any;
//     photoURL: string;
// }
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

    const [isLoading, setIsLoading] = useState(true);

    const { getMessages, currentCh, messagesArray } = useMessages();

    const getRoomInfo = () => {
        // TODO getDocs of Room like Room Story Events, Room Characters, Room Chapters, as well as Room messages of course and then conver to need state formate and pass down as prop to children
    };

    useEffect(() => {
        props.roomTitle && getMessages(props.roomTitle, props.currentTab);
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
