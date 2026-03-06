import React, { useState, useContext, useEffect } from 'react';

import { ThemeContext } from '../../context/ThemeContext';

import { ChatBox } from '..';
import loadingAnim from '../../resources/ui/loading-anim.svg';
import { MessageInfo } from '../../hooks/types';
import { Timestamp } from 'firebase/firestore';

type Props = {
    messages: MessageInfo[];
    isLoading: boolean;
    roomTitle: string;
    currentTab: string;
};
type Styles = {
    chatBoxContainer: string;
    loading: string;
    noMessagesText: string;
};

const ChatBoxContainer = (props: Props) => {
    const styles: Styles = {
        chatBoxContainer:
            'flex flex-col-reverse min-w-0 gap-2 mb-2 mx-2 h-full overflow-y-scroll overflow-x-hidden scrollbar  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full ',
        loading: 'h-[50%] w-[50%] m-auto',
        noMessagesText: 'text-center m-auto text-sm md:text-base',
    };

    const theme = useContext(ThemeContext);

    const sortByTimeSent = () => {
        props.messages.sort((a, b) => (a.timeSent as any) - (b.timeSent as any));
    };

    if (props.messages.length > 0) {
        sortByTimeSent();
    }

    return (
        <div
            className={
                styles.chatBoxContainer +
                `scrollbar-thumb-${theme?.themeColor}-500 scrollbar-track-${theme?.themeColor}-300 hover:scrollbar-thumb-${theme?.themeColor}-400`
            }
        >
            {!props.isLoading && props.messages.length <= 0 && (
                <p className={styles.noMessagesText}>No messages yet!</p>
            )}
            {props.isLoading && <img className={styles.loading} src={loadingAnim} />}
            {!props.isLoading &&
                props.messages
                    .map((mssg) => (
                        <ChatBox
                            key={mssg.id}
                            photoURL={mssg.photoURL}
                            displayName={mssg.userName}
                            mssgText={mssg.message}
                            uid={mssg.uid}
                            roomTitle={props.roomTitle}
                            timeSent={(mssg.timeSent as Timestamp).toDate().toString()}
                        />
                    ))
                    .reverse()}
        </div>
    );
};

export default ChatBoxContainer;
