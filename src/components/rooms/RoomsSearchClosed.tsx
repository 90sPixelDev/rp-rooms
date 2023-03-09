import React, { useContext, useState } from 'react';
import { getDocs, collection, query, limit } from 'firebase/firestore';

import { RoomsDropDown } from '../exporter';
import { db } from '../../firebase.config';
import useAddUserToRoom from '../../hooks/useAddUserToRoom';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
    callRefreshMessages: (roomTitle: string) => void;
};

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
            'flow-root p-1 rounded-lg outline-none caret-purple-500 mb-4 border-b-2 border-t-2 w-8 z-3 m-auto cursor-pointer ',
        inputBoxClosedFocused: 'flow-root p-1 rounded-lg outline-none caret-purple-500 border-2 border-purple-600 z-3',
        bar: 'flex flex-row justify-center',
    };

    const theme = useContext(ThemeContext);

    const [searchedRooms, setSearchedRooms] = useState<string[] | null>(null);
    const [inputText, setInputText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedMini, setIsFocusedMini] = useState(false);
    const [roomsFound, setRoomsFound] = useState(true);

    const { addRoom } = useAddUserToRoom();

    const unFocusRoomSearch = () => {
        setTimeout(() => {
            setInputText('');
            setSearchedRooms([]);
            setIsFocusedMini(false);
            setIsSearching(false);
        }, 300);
    };

    const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const lowerInput = e.target.value.toLowerCase();
        setInputText((prevstate) => (prevstate = e.target.value));
        const roomSearchList: string[] = [];

        let allowSearch = false;

        lowerInput.length > 3 ? setIsSearching(true) : setIsSearching(false);
        lowerInput.length > 3 ? (allowSearch = true) : (allowSearch = false);
        try {
            if (allowSearch) {
                const roomsRef = collection(db, 'rooms');
                const roomQuery = query(roomsRef, limit(30));
                const roomSearch = await getDocs(roomQuery);

                roomSearch.forEach((doc) => {
                    const lower = doc.data().roomTitle.toLowerCase();
                    if (lower.includes(lowerInput)) {
                        roomSearchList.push(doc.data().roomTitle);
                    }
                    setSearchedRooms(roomSearchList.map((rt) => rt));
                });
            }
        } catch (err) {
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
                            onKeyDown={async (e) => {
                                if (e.code === 'Enter') if ((await addRoom(inputText)) === true) unFocusRoomSearch();
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
                                isOpened={false}
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
                className={styles.inputBoxClosed + `border-${theme?.themeColor}-600`}
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
