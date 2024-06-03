import React, { useCallback, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

export default function useCharaCount(roomTitle: string) {
    const [charaCount, setCharaCount] = useState(0);
    const [refreshCharaCount, setRefreshCharaCount] = useState(false);

    console.log('Checking for inifinite loop');

    const callCharaCountRefresh = () => {
        setRefreshCharaCount((prevState) => !prevState);
    };

    const getUpdatedCharaCount = async (roomTitle: string) => {
        const roomDoc = doc(db, 'rooms', roomTitle);
        const roomInfoSnap = await getDoc(roomDoc);

        if (roomInfoSnap.exists()) {
            setCharaCount(roomInfoSnap.data()?.charaCount);
        } else {
            console.log('IDK WHAT HAPPD');
        }
    };

    return { charaCount, getUpdatedCharaCount, refreshCharaCount, callCharaCountRefresh };
}
