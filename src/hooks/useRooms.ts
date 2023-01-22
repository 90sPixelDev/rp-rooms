import * as React from 'react';
import { collection, query, where, getDocs, QueryDocumentSnapshot, DocumentData, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase.config';
import { UserContext } from '../context/AuthContext';
import { DataResult } from './types';

export default function useRooms(): DataResult {
    const [data, setData] = React.useState<QueryDocumentSnapshot<DocumentData>[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const currentUser = React.useContext(UserContext);

    const userRoomsQuery = query(collection(db, 'rooms'), where('user', 'array-contains', currentUser?.uid));

    const unsubscribe = () => {
        onSnapshot(userRoomsQuery, (roomsSnapshot) => {
            console.log('%c◆ Refreshing Data...', 'color: lightblue');
            setData(roomsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc));
        });
        setIsLoading(false);
    };

    React.useEffect(() => {
        return unsubscribe;
    }, []);

    return { data, isLoading };
}
