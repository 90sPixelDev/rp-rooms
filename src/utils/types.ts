export type RefreshData = {
    currentTab: string;
    switchTab: (newTab: string) => void;
    selectedRoomTitle: string;
    switchRoom: (newRoomTitle: string) => void;
};
