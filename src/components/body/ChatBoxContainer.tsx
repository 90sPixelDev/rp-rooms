import React, { useState, useContext, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { ChatBox } from '../exporter';
import { UserContext } from '../../context/AuthContext';

import loadingAnim from '../../resources/ui/loading-anim.svg';

interface MessagesInfo {
    photoURL: string;
    userName: string;
    message: string;
    uid: string;
    timeSent: string;
}
type Props = {
    messages: MessagesInfo[];
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
            'flex flex-col-reverse gap-2 mx-2 h-full overflow-y-scroll scrollbar scrollbar-thumb-purple-500 scrollbar-track-purple-300 hover:scrollbar-thumb-purple-400 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
        loading: 'h-[50%] w-[50%] m-auto',
        noMessagesText: 'text-center m-auto text-sm md:text-base',
    };

    const [refreshMssgs, setRefreshMssgs] = useState<boolean>(false);
    const currentUser = useContext(UserContext);

    useEffect(() => {
        setRefreshMssgs((prevState) => !prevState);
    }, [props.messages]);

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
                            key={Math.random() * 9}
                            photoURL={mssg.photoURL}
                            displayName={mssg.userName}
                            mssgText={mssg.message}
                            timeSent={mssg.timeSent}
                        />
                    ))
                    .reverse()}
        </div>
    );
};

export default ChatBoxContainer;
