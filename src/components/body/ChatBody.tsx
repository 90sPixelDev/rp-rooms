import React, { useEffect } from 'react';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { MessageInfo } from '../../hooks/types';
import useMessages from '../../hooks/useMessages';

import { ChatBoxContainer, RoomTopTitle } from '../exporter';

interface Props {
    dataLoading: boolean;
    roomTitle: string;
    currentRoomInfo: DocumentData;
    currentTab: string;
    switchTab: (tab: string) => void;
}
type Styles = {
    body: string;
};

const ChatBody = (props: Props) => {
    const styles: Styles = {
        body: 'bg-purple-100 rounded-b-2xl h-full flex flex-col',
    };
    const [currentCh, setCurrentCh] = React.useState<object>({});

    const { isLoading, messagesArray, getUpdatedMessages } = useMessages();

    const UpdateRoomChapter = async () => {
        const roomRef = doc(db, 'rooms', props.roomTitle);
        const docSnap = await getDoc(roomRef);

        if (docSnap.exists()) {
            setCurrentCh(docSnap.data().currentChapter);
        }
    };

    useEffect(() => {
        props.roomTitle && getUpdatedMessages(props.roomTitle, props.currentTab);
        UpdateRoomChapter();

        console.log('Updating Messages!');
    }, [props.roomTitle, props.currentTab, props.dataLoading]);

    return (
        <div className={styles.body}>
            <RoomTopTitle
                currentChInfo={currentCh}
                changeTab={props.switchTab}
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
