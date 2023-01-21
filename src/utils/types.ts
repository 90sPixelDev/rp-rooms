export type RefreshData = {
    selectedRoomTitle: string;
    update: boolean;
    refreshMessages: (newRoomTitle: string) => void;
};
