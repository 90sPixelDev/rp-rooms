import React, { useState, useContext, useEffect } from 'react';

import { MessageInfo } from '../../hooks/types';
import { ChatBox } from '../exporter';
import loadingAnim from '../../resources/ui/loading-anim.svg';

type Props = {
    // messages: MessageInfo[];
    messages: any[];
    isLoading: boolean;
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
            'flex flex-col-reverse gap-2 mx-2 h-full overflow-y-scroll overflow-x-hidden scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
        loading: 'h-[50%] w-[50%] m-auto',
        noMessagesText: 'text-center m-auto text-sm md:text-base',
    };

    const [refreshMssgs, setRefreshMssgs] = useState<boolean>(false);

    useEffect(() => {
        setRefreshMssgs((prevState) => !prevState);
        if (props.messages.length > 0) {
            sortByTimeSent();
        }
    }, [props.messages]);

    const sortByTimeSent = () => {
        props.messages.sort((a, b) => (a.timeSent as any) - (b.timeSent as any));
    };

    return (
        <div className={styles.chatBoxContainer}>
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
                            timeSent={mssg.timeSent as string}
                        />
                    ))
                    .reverse()}
        </div>
    );
};

export default ChatBoxContainer;
