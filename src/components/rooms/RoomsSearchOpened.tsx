import React from 'react';

type Props = any;

const RoomsSearchOpened = (props: Props) => {
    return (
        <>
            {/* <section className={styles.section}>
            <div className={styles.bar}>
                <input
                    className={styles.inputBox}
                    type="text"
                    value={inputText}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') addRoom(inputText);
                    }}
                    onChange={onSearch}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        unFocusRoomSearch();
                    }}
                    placeholder="Add Rooms..."
                    />
                <CreateRoomBtn onBtnClicked={() => addRoom(inputText)} />
            </div>
            {isSearching && (
                <RoomsDropDown
                roomsSearched={searchedRooms}
                addSelectedRoom={addRoom}
                isOpened={props.isOpened}
                searchingDone={roomsFound}
                />
                )}
        </section> */}
        </>
    );
};

export default RoomsSearchOpened;
