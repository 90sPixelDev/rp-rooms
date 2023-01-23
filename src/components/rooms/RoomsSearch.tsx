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

const RoomsSearch = (props: Props) => {
    // if (props.isOpened) return <RoomsSearchOpened />;

    return <RoomsSearchClosed />;
};

export default RoomsSearch;
