import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { MessageInfo } from '../../hooks/types';
import useMessages from '../../hooks/useMessages';

import { ChatBoxContainer, RoomTopTitle } from '..';

interface Props {
    dataLoading: boolean;
    roomTitle: string;
    currentTab: string;
    switchTab: (tab: string) => void;
    callRefreshMessages: (room: string) => void;
}
type Styles = {
    body: string;
};

const ChatBody = (props: Props) => {
    const styles: Styles = {
        body: 'bg-purple-100 rounded-b-2xl h-full flex flex-col min-w-0 ',
    };
    const [currentCh, setCurrentCh] = React.useState<object>({});

    const { isLoading, messagesArray, getUpdatedMessages } = useMessages();

    const UpdateRoomChapter = async (defaultInfo = '') => {
        if (defaultInfo === '-') {
            const info = {
                num: '0',
                desc: 'No Room Selected',
            };
            setCurrentCh(info);
        } else {
            const roomRef = doc(db, 'rooms', props.roomTitle);
            const docSnap = await getDoc(roomRef);

            if (docSnap.exists()) {
                setCurrentCh(docSnap.data().currentChapter);
            }
        }
    };

    useEffect(() => {
        getUpdatedMessages(props.roomTitle, props.currentTab);
        if (props.roomTitle !== '') UpdateRoomChapter();
        else UpdateRoomChapter('-');
    }, [props.roomTitle, props.currentTab, props.callRefreshMessages]);

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
                roomTitle={props.roomTitle}
                isLoading={isLoading}
                currentTab={props.currentTab}
            />
        </div>
    );
};

export default ChatBody;
