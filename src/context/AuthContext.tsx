import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase.config';

export const UserContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

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
