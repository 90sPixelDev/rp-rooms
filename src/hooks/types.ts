export type RoomsResult = {
    rooms: string[] | null;
    loading: boolean;
    fetchUserRoomsData: () => Promise<void>;
};
