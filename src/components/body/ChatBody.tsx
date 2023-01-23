import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { MessageInfo } from '../../hooks/types';
import useMessages from '../../hooks/useMessages';
import { ChatBoxContainer, RoomTopTitle } from '../exporter';

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

    const { getUpdatedMessages, isLoading, currentCh, messagesArray } = useMessages();

    const getRoomInfo = () => {
        // TODO getDocs of Room like Room Story Events, Room Characters, Room Chapters and then convert to correct format and pass down as prop to children
    };

    useEffect(() => {
        props.roomTitle && getUpdatedMessages(props.roomTitle, props.currentTab);
    }, [props.roomTitle, props.refresh, props.currentTab, isLoading]);

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
