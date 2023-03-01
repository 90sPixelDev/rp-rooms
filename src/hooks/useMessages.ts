import * as React from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase.config';
import { MessageInfo } from './types';

export default function useMessages() {
    const [messagesArray, setMessagesArray] = React.useState<MessageInfo[] | []>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getUpdatedMessages = async (roomTitle: string, currentTab: string) => {
        const roomDoc = doc(db, 'rooms', roomTitle);
        const roomInfoSnap = await getDoc(roomDoc);

        console.log('%c◆ Refreshing Messages...', 'color: pink');

        if (roomInfoSnap.exists()) {
            const messgsRef = roomInfoSnap.data()[currentTab];

            setMessagesArray(Object.keys(messgsRef).map((mssg) => ({ id: mssg, ...messgsRef[mssg] })));
        } else {
            setMessagesArray([]);
        }
        setIsLoading(false);
    };

    return { messagesArray, isLoading, getUpdatedMessages };
}
