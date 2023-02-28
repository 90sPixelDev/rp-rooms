import * as React from 'react';
import { collection, getDocs, query, Timestamp } from 'firebase/firestore';

import { db } from '../firebase.config';
import { MessageInfo } from './types';

export default function useMessages() {
    const [messagesArray, setMessagesArray] = React.useState<MessageInfo[] | []>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getUpdatedMessages = async (roomTitle: string, currentTab: string) => {
        const roomTabMessages = query(collection(db, 'rooms', roomTitle, currentTab));
        const docSnap = await getDocs(roomTabMessages);

        console.log('%c◆ Refreshing Messages...', 'color: pink');

        if (!docSnap.empty) {
            setMessagesArray(
                docSnap.docs.map(
                    (msg: any) =>
                        (msg = { id: msg.id, ...msg.data(), timeSent: (msg.data().timeSent as Timestamp).toDate() }),
                ),
            );
        } else {
            setMessagesArray([]);
        }
        setIsLoading(false);
    };

    return { messagesArray, isLoading, getUpdatedMessages };
}
