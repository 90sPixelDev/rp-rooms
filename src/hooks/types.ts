import { Timestamp } from 'firebase/firestore';

export type RoomsResult = {
    rooms: string[] | null;
    roomsLoading: boolean;
    fetchUserRoomsData: () => Promise<void>;
    // unsubscribe: () => void;
};

export interface MessageInfo {
    userName: string;
    message: string;
    uid: string;
    timeSent: Timestamp | Date | string;
    photoURL: string;
}
