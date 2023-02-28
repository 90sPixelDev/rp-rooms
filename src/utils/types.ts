export type RefreshData = {
    selectedRoomTitle: string;
    currentTab: string;
    update: boolean;
    switchTab: (newTab: string) => void;
    switchRoom: (newRoomTitle: string) => void;
};
