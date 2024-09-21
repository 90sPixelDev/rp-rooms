import React, { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';
import InfoModal from '../../modals/InfoModal';

interface Props {
    isOpen: boolean;
    userInfo: {
        chatName: string;
        charaName: string;
        dateJoinedRoom: string | Date;
    };
    handleClose: () => void;
}

const InfoBox = (props: Props) => {
    const styles = {
        infoBoxContainer: ' flex flex-col z-20 sm:w-[30vw] sm:h-[15vh] rounded-r-lg rounded-bl-lg shadow-md border-2 ',
        topInfoBox: 'flex flex-row justify-between bg-gradient-to-r py-1 ',
        userInfo: 'my-auto ml-2',
        infoBoxBody: 'flex flex-row w-full h-full p-2 text-sm',
        userSide: 'w-full ',
        charaSide: 'w-full h-full flex flex-col justify-between ',
    };

    const theme = useContext(ThemeContext);

    return (
        <InfoModal isOpen={props.isOpen} handleClose={props.handleClose}>
            <div className={styles.infoBoxContainer + `bg-${theme?.themeColor}-500 shadow-${theme?.themeColor}-900 `}>
                <div className={styles.topInfoBox + `from-${theme?.themeColor}-300`}>
                    <p className={styles.userInfo}>User Info</p>
                </div>
                <div className={styles.infoBoxBody}>
                    <div className={styles.userSide}>
                        <p className={`ml-1 font-bold border-b-2 border-${theme?.themeColor}-700`}>
                            {props.userInfo.chatName}
                        </p>
                    </div>
                    <div
                        className={`mx-1 h-full w-1 bg-gradient-to-b from-${theme?.themeColor}-400 via-${theme?.themeColor}-300 to-${theme?.themeColor}-400`}
                    />
                    <div className={styles.charaSide}>
                        <p className={`ml-1 font-bold border-b-2 border-${theme?.themeColor}-700`}>
                            {props.userInfo.charaName}
                        </p>
                        <div>
                            <p className={`ml-1 text-xsm font-bold border-t-2 border-${theme?.themeColor}-700`}>
                                Joined Room:
                            </p>
                            <p className={'ml-1'}>{props.userInfo.dateJoinedRoom as string}</p>
                        </div>
                    </div>
                </div>
            </div>
        </InfoModal>
    );
};

export default InfoBox;
