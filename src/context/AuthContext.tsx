import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase.config';

type Props = {
    children?: React.ReactNode;
};

export const UserContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        };
    }, []);

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};
