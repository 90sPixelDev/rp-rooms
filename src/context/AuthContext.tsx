import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';

export const UserContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<unknown | null>({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        };
    }, []);

    return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};
