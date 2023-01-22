import * as React from 'react';
import { collection, query, where, getDocs, QueryDocumentSnapshot, DocumentData, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase.config';
import { UserContext } from '../context/AuthContext';
import { RoomsResult } from './types';

export default function useRooms(): RoomsResult {
    const [userRooms, setUserRooms] = React.useState<string[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const { currentUser } = React.useContext(UserContext);

    const userRoomsQuery = query(collection(db, 'rooms'), where('user', 'array-contains', currentUser.uid));

    const unsubscribe = React.useCallback(() => {
        onSnapshot(userRoomsQuery, (roomsSnapshot) => {
            if (roomsSnapshot) {
            }
        });
    }, [userRoomsQuery]);

    const fetchUserRoomsData = async () => {
        setIsLoading(true);
        const userRoomsDocs = await getDocs(userRoomsQuery);
        setUserRooms(userRoomsDocs.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.id));
        setIsLoading(false);
    };

    return { rooms: userRooms, loading: isLoading, fetchUserRoomsData, unsubscribe };
}
