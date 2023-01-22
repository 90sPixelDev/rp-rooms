export type RoomsResult = {
    rooms: string[] | null;
    roomsLoading: boolean;
    fetchUserRoomsData: () => Promise<void>;
    unsubscribe: () => void;
};
