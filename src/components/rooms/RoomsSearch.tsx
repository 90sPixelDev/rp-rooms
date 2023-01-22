import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, getDoc, arrayUnion } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { UserContext } from '../../context/AuthContext';

import { CreateRoomBtn, RoomsDropDown, RoomsSearchOpened } from '../exporter';
import RoomsSearchClosed from './RoomsSearchClosed';

interface Props {
    callRefreshMessages: (roomTitle: string) => void;
    isOpened: boolean;
}
type Styles = {
    section: string;
    sectionTest: string;
    inputBox: string;
    backdrop: string;
    inputBoxClosed: string;
    inputBoxClosedFocused: string;
    bar: string;
};
type Query = string;

const RoomsSearch = (props: Props) => {
    const styles: Styles = {
        section: 'relative flex flex-col',
        sectionTest: 'fixed flex flex-col',
        inputBox:
            'flow-root p-1 rounded-l-lg outline-none caret-purple-500 mb-4 border-l-2 border-b-2 border-t-2 border-purple-600 w-[70%] z-3',
        backdrop:
            'fixed bg-[rgba(0,0,0,0.5)] h-[100vh] w-[100vw] top-0 left-0 flex flex-col place-items-center justify-center',
        inputBoxClosed:
            'flow-root p-1 rounded-lg outline-none caret-purple-500 mb-4 border-b-2 border-t-2 border-purple-600 w-8 z-3 m-auto cursor-pointer',
        inputBoxClosedFocused:
            'flow-root p-1 rounded-lg outline-none caret-purple-500 mb-4 border-2 border-purple-600 z-3 absolute',
        bar: 'flex flex-row justify-center',
    };

    const [room, setRoom] = useState(null as any);
    const [inputText, setInputText] = useState('');
    // const [isSearching, setIsSearching] = useState(false);
    const [searchedRooms, setSearchedRooms] = useState<string[] | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedMini, setIsFocusedMini] = useState(false);
    const [err, setErr] = useState(false);
    const [roomsFound, setRoomsFound] = useState(true);

    const { currentUser } = useContext(UserContext);

    // if (props.isOpened) return <RoomsSearchOpened />;

    return <RoomsSearchClosed />;
};

export default RoomsSearch;
