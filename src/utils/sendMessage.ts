import * as React from 'react';
import { db } from '../firebase.config';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import uuid from 'react-uuid';

export async function sendMessage(
    tempTypedMssg: string,
    roomSelectedInfo: string,
    currentTab: string,
    currentUser: User | null,
) {
    if (!tempTypedMssg.replace(/\s/g, '').length) {
        console.warn(`%c"${tempTypedMssg}"`, 'color: red', ' is not a valid message! Not submitted.');
        return;
    }
    const roomRef = doc(db, 'rooms', roomSelectedInfo);
    const uid = currentUser?.uid;

    let avatar = currentUser?.photoURL;
    let displayName = currentUser?.displayName;
    if (currentTab === 'story') {
        const roomDoc = await getDoc(roomRef);
        avatar = roomDoc.data()?.characters[uid as string].charaPic;
        displayName = roomDoc.data()?.characters[uid as string].charaName;
    }

    const mssgFormat = {
        message: tempTypedMssg,
        photoURL: avatar,
        userName: displayName,
        uid: uid,
        timeSent: Timestamp.now(),
    };

    const createdUUID = uuid();

    await setDoc(
        roomRef,
        {
            [currentTab]: { [createdUUID]: { ...mssgFormat } },
        },
        { merge: true },
    );
}
