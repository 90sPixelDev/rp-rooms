import * as React from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

import { MessageInfo } from './types';

export default function useMessages() {
    const [messagesArray, setMessagesArray] = React.useState<MessageInfo[] | null>(null);
    const [currentCh, setCurrentCh] = React.useState<object>({});

    const getMessages = async (roomTitle: string, currentTab: string) => {
        const roomRef = doc(db, 'rooms', roomTitle);
        const docSnap = await getDoc(roomRef);

        if (docSnap.exists()) {
            setCurrentCh(docSnap.data().currentChapter);
            const mssgArr = docSnap.data()[currentTab];

            setMessagesArray(
                mssgArr.map(
                    (msg: MessageInfo) =>
                        (msg = {
                            ...msg,
                            timeSent: (msg.timeSent as Timestamp).toDate(),
                        }),
                ),
            );
        } else {
            console.log('No such Room exists!');
        }
    };

    return { messagesArray, currentCh, getMessages };
}
