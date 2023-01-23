export type RefreshData = {
    selectedRoomTitle: string;
    update: boolean;
    switchRoom: (newRoomTitle: string) => void;
};
