import React, { useContext, useState } from 'react';
import { getDocs, collection, arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';

import { RoomsDropDown } from '../exporter';
import { UserContext } from '../../context/AuthContext';
import { db } from '../../firebase.config';
import { refreshUtils } from '../../utils/refreshUtils';

type Props = any;

type Styles = {
    section: string;
    sectionTest: string;
    inputBox: string;
    backdrop: string;
    inputDropDownHolder: string;
    inputBoxClosed: string;
    inputBoxClosedFocused: string;
    bar: string;
};

const RoomsSearchClosed = (props: Props) => {
    const styles: Styles = {
        section: 'relative flex flex-col',
        sectionTest: 'fixed flex flex-col',
        inputBox:
            'flow-root p-1 rounded-l-lg outline-none caret-purple-500 mb-4 border-l-2 border-b-2 border-t-2 border-purple-600 w-[70%] z-3',
        backdrop:
            'fixed bg-[rgba(0,0,0,0.5)] h-[100vh] w-[100vw] top-0 left-0 flex flex-col place-items-center justify-center z-5',
        inputDropDownHolder: 'w-[50vw] h-[50vh] flex flex-col',
        inputBoxClosed:
            'flow-root p-1 rounded-lg outline-none caret-purple-500 mb-4 border-b-2 border-t-2 border-purple-600 w-8 z-3 m-auto cursor-pointer',
        inputBoxClosedFocused: 'flow-root p-1 rounded-lg outline-none caret-purple-500 border-2 border-purple-600 z-3',
        bar: 'flex flex-row justify-center',
    };

    const [room, setRoom] = useState(null as any);
    const [inputText, setInputText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchedRooms, setSearchedRooms] = useState<string[] | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedMini, setIsFocusedMini] = useState(false);
    const [err, setErr] = useState(false);
    const [roomsFound, setRoomsFound] = useState(true);

    const currentUser = useContext(UserContext);

    const { switchRoom } = refreshUtils();

    const unFocusRoomSearch = () => {
        setTimeout(() => {
            setInputText('');
            setSearchedRooms([]);
            setIsFocusedMini(false);
            setIsSearching(false);
        }, 300);
    };

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
                            },
                        },
                        user: arrayUnion(currentUser?.uid),
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
                            },
                        },
                        user: arrayUnion(currentUser?.uid),
                        chat: [],
                        story: [],
                    },
                    { merge: true },
                );
            }
            console.log('%c✓ Succesfully added user to Room', 'color: lightgreen');
            // switchRoom(inputText);
            unFocusRoomSearch();
        } catch (err) {
            setErr(true);
            console.error(err);
            setInputText('');
        }
    };

    const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const lowerInput = e.target.value.toLowerCase();
        setInputText((prevstate) => (prevstate = e.target.value));
        const roomSearchList: string[] = [];

        lowerInput.length > 3 ? setIsSearching(true) : setIsSearching(false);

        try {
            const roomSearch = await getDocs(collection(db, 'rooms'));
            roomSearch.forEach((doc) => {
                const lower = doc.data().roomTitle.toLowerCase();
                if (lower.includes(lowerInput)) {
                    roomSearchList.push(doc.data().roomTitle);
                }
                setSearchedRooms(roomSearchList.map((rt) => rt));
            });
        } catch (err) {
            setErr(true);
            console.error(`Message: ${err}`);
        }
    };

    if (isFocusedMini) {
        return (
            <section className={styles.section}>
                <div className={styles.backdrop}>
                    <div className={styles.inputDropDownHolder}>
                        <input
                            autoFocus
                            className={styles.inputBoxClosedFocused}
                            type="text"
                            value={inputText}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter') addRoom(inputText);
                            }}
                            onChange={onSearch}
                            onFocus={() => {
                                setIsFocused(true);
                                setIsFocusedMini(true);
                            }}
                            onBlur={() => {
                                unFocusRoomSearch();
                            }}
                            placeholder="Room Name..."
                        />
                        {isSearching && (
                            <RoomsDropDown
                                roomsSearched={searchedRooms}
                                addSelectedRoom={addRoom}
                                isOpened={props.isOpened}
                                searchingDone={roomsFound}
                            />
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <input
                className={styles.inputBoxClosed}
                type="text"
                value={inputText}
                onKeyDown={(e) => {
                    if (e.code === 'Enter') addRoom(inputText);
                }}
                onChange={onSearch}
                onFocus={() => {
                    setIsFocused(true);
                    setIsFocusedMini(true);
                }}
                onBlur={() => {
                    unFocusRoomSearch();
                }}
                placeholder="&#128269;"
            />
        </section>
    );
};

export default RoomsSearchClosed;