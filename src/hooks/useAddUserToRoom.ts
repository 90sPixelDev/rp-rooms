import * as React from 'react';
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../firebase.config';
import { UserContext } from '../context/AuthContext';

export default function useAddUserToRoom() {
    const currentUser = React.useContext(UserContext);

    const addRoom = async (inputText: string) => {
        console.log(
            '%c◆ Attempting to add Room ' + `%c${inputText}` + '%c to user...',
            'color: pink',
            'color: yellow',
            'color: pink',
        );

        try {
            if (inputText.length <= 3 || !inputText.replace(/\s/g, '').length) {
                throw new Error(`\"${inputText}\" is an invalid search!`);
            }
            const newRoomRef = doc(db, 'rooms', inputText);
            const newRoomDoc = await getDoc(newRoomRef);
            if (newRoomDoc.exists()) {
                if (newRoomDoc.data().characters[currentUser?.uid as string]) {
                    console.warn(`You are already a part of Room \"${inputText}\"`);
                    return;
                }
                const charas = Object.keys(newRoomDoc.data().characters);
                const charaCount = charas.length;
                await setDoc(
                    newRoomRef,
                    {
                        characters: {
                            [currentUser?.uid as string]: {
                                charaPic: '',
                                charaName: 'New Character',
                                turn: charaCount.toString(),
                                currentTurn: false,
                                dateJoined: new Date(),
                            },
                        },
                        users: arrayUnion(currentUser?.uid),
                    },
                    { merge: true },
                );
            } else {
                await setDoc(
                    newRoomRef,
                    {
                        owner: [currentUser?.uid],
                        roomTitle: inputText,
                        currentTurn: '',
                        currentChapter: {
                            num: '0',
                            desc: 'A New Beginning!',
                        },
                        characters: {
                            [currentUser?.uid as string]: {
                                charaPic: '',
                                charaName: 'New Character',
                                turn: '0',
                                currentTurn: true,
                                dateJoined: new Date(),
                            },
                        },
                        users: arrayUnion(currentUser?.uid),
                        chat: {},
                        story: {},
                    },
                    { merge: true },
                );
            }
            console.log('%c✓ Succesfully added user to Room', 'color: lightgreen');
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return { addRoom };
}
