import React, { useContext, useState } from 'react';
import { UserProfilePeek, LogOutControl, OptionsControl } from '../exporter';
import BaseModal from '../../modals/BaseModal';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    isOpened: boolean;
}

const UserControlsContainer = (props: Props) => {
    const mainStyles = {
        container: 'flex flex-col justify-between bg-purple-300 w-[95%] h-[90%] m-auto rounded-lg min-h-fit',
        containerClosed: 'flex flex-col justify-between bg-purple-300 w-[90%] h-[90%] my-auto rounded-r-lg min-h-fit',
        bottomSection: 'flex flex-col justify-between ml-2 mb-2 gap-2 w-[90%]',
        bottomSectionClosed: 'flex flex-col justify-between mb-2 gap-2 w-full',
    };

    const modalStyles = {
        holder: 'mx-2',
        title: 'text-lg text-center font-bold',
        colorGroup: 'border-2',
        purple: 'bg-purple-500 w-24 border-purple-700 hover:bg-purple-400 border-2 text-white',
        red: 'bg-red-500 w-24 border-red-700 hover:bg-red-400 border-2 text-white',
        blue: 'bg-blue-500 w-24 border-blue-700 hover:bg-blue-400 border-2 text-white',
        gray: 'bg-gray-500 w-24 border-gray-700 hover:bg-gray-400 border-2 text-white',
        orange: 'bg-orange-500 w-24 border-orange-700 hover:bg-orange-400 border-2 text-white',
        emerald: 'bg-emerald-500 w-24 border-emerald-700 hover:bg-emerald-400 border-2 text-white',
        sky: 'bg-sky-500 w-24 border-sky-700 hover:bg-sky-400 border-2 text-white',
        rose: 'bg-rose-500 w-24 border-rose-700 hover:bg-rose-400 border-2 text-white',
    };

    const theme = useContext(ThemeContext);

    const [isOpen, setIsOpen] = useState(false);

    const openOptions = () => {
        setIsOpen(!isOpen);
    };

    const OptionsModal = (
        <BaseModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
            <div className={modalStyles.holder}>
                <h2 className={modalStyles.title}>Options</h2>
                <p>Set Color Theme</p>
                <div className={modalStyles.colorGroup}>
                    <button onClick={() => theme?.themeSwitch('purple')} className={modalStyles.purple}>
                        purple
                    </button>
                    <button onClick={() => theme?.themeSwitch('red')} className={modalStyles.red}>
                        Red
                    </button>
                    <button onClick={() => theme?.themeSwitch('blue')} className={modalStyles.blue}>
                        blue
                    </button>
                    <button onClick={() => theme?.themeSwitch('gray')} className={modalStyles.gray}>
                        gray
                    </button>
                    <button onClick={() => theme?.themeSwitch('orange')} className={modalStyles.orange}>
                        orange
                    </button>
                    <button onClick={() => theme?.themeSwitch('emerald')} className={modalStyles.emerald}>
                        emerald
                    </button>
                    <button onClick={() => theme?.themeSwitch('sky')} className={modalStyles.sky}>
                        sky
                    </button>
                    <button onClick={() => theme?.themeSwitch('rose')} className={modalStyles.rose}>
                        rose
                    </button>
                </div>
            </div>
        </BaseModal>
    );

    if (props.isOpened)
        return (
            <>
                <div className={mainStyles.container}>
                    <UserProfilePeek isOpened={props.isOpened} />
                    <div className={mainStyles.bottomSection}>
                        <OptionsControl isOpened={props.isOpened} openOptions={openOptions} />
                        <LogOutControl isOpened={props.isOpened} />
                    </div>
                </div>
                {OptionsModal}
            </>
        );

    return (
        <>
            <div className={mainStyles.containerClosed}>
                <UserProfilePeek isOpened={props.isOpened} />
                <div className={mainStyles.bottomSectionClosed}>
                    <OptionsControl isOpened={props.isOpened} openOptions={openOptions} />
                    <LogOutControl isOpened={props.isOpened} />
                </div>
            </div>
            {OptionsModal}
        </>
    );
};

export default UserControlsContainer;
