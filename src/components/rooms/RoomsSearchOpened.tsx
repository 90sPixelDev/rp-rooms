import React, { useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';

import useAddUserToRoom from '../../hooks/useAddUserToRoom';
import { db } from '../../firebase.config';

import { CreateRoomBtn, RoomsDropDown } from '../exporter';

type Props = {
    callRefreshMessages: (roomTitle: string) => void;
};

const RoomsSearchOpened = (props: Props) => {
    const styles = {
        section: 'mx-4 mb-8 max-h-[27vh] flex flex-col',
        bar: 'flex flex-row',
        inputBox: 'rounded-l-lg px-2 py-1 min-w-0',
    };

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

    return (
        <section className={styles.section}>
            <div className={styles.bar}>
                <input
                    className={styles.inputBox}
                    type="text"
                    value={inputText}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') addRoom(inputText);
                    }}
                    onChange={onSearch}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        unFocusRoomSearch();
                    }}
                    placeholder="Add Rooms..."
                />
                <CreateRoomBtn onBtnClicked={() => addRoom(inputText)} />
            </div>
            {isSearching && (
                <RoomsDropDown
                    roomsSearched={searchedRooms}
                    addSelectedRoom={addRoom}
                    isOpened={true}
                    searchingDone={roomsFound}
                />
            )}
        </section>
    );
};

export default RoomsSearchOpened;
