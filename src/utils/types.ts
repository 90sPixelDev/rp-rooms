export type RefreshData = {
    selectedRoomTitle: string;
    currentTab: string;
    // switchTab: (newTab: string) => void;
    switchRoom: (newRoomTitle: string) => void;
};
