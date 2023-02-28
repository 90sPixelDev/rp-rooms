import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

export type DataResult = {
    data: QueryDocumentSnapshot<DocumentData>[] | null;
    isLoading: boolean;
};

export interface MessageInfo {
    userName: string;
    message: string;
    uid: string;
    id: string;
    timeSent: Timestamp | Date | string;
    photoURL: string;
}
