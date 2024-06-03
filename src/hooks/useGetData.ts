import * as React from 'react';
import {
    collection,
    query,
    where,
    QueryDocumentSnapshot,
    DocumentData,
    onSnapshot,
    doc,
    getDoc,
} from 'firebase/firestore';

import { db } from '../firebase.config';
import { UserContext } from '../context/AuthContext';
import { DataResult } from './types';

export default function useGetData(): DataResult {
    const [userRoomsData, setUserRoomsData] = React.useState<QueryDocumentSnapshot<DocumentData>[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const currentUser = React.useContext(UserContext);

    if (currentUser) {
        React.useEffect(() => {
            const userRoomsQuery = query(collection(db, 'rooms'), where('users', 'array-contains', currentUser?.uid));

            const unsubscribe = () => {
                onSnapshot(
                    userRoomsQuery,
                    (roomsSnapshot) => {
                        console.log('%c◆ Refreshing Data...', 'color: pink');
                        setUserRoomsData(roomsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc));
                    },

                    (err) => console.log(err),
                );
                setIsLoading(false);
            };
            unsubscribe();

            return () => unsubscribe();
        }, []);
    }

    return { userRoomsData, isLoading };
}
