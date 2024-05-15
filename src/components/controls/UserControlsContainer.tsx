import React, { Fragment, useContext, useState } from 'react';
import { UserProfilePeek, LogOutControl, OptionsControl } from '..';
import BaseModal from '../../modals/BaseModal';
import { ThemeContext } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Transition } from '@headlessui/react';

interface Props {
    isOpened: boolean;
}

const UserControlsContainer = (props: Props) => {
    const mainStyles = {
        container: 'flex flex-col justify-between w-[95%] h-[90%] m-auto rounded-lg min-h-fit ',
        containerClosed: 'flex flex-col justify-between w-[90%] h-[90%] my-auto rounded-r-lg min-h-fit ',
        bottomSection: 'flex flex-col justify-between ml-2 mb-2 gap-2 w-[90%]',
        bottomSectionClosed: 'flex flex-col justify-between mb-2 gap-2 w-full',
    };

    const modalStyles = {
        holder: 'mx-2',
        title: 'text-lg text-center font-bold mb-2',
        colorGroup: 'px-1 py-1 flex flex-wrap justify-center gap-1 ',
        purple: 'bg-purple-500 border-purple-700 hover:bg-purple-400 w-[70px] border-2 text-white',
        red: 'bg-red-500 border-red-700 hover:bg-red-400 w-[70px] border-2 text-white',
        blue: 'bg-blue-500 border-blue-700 hover:bg-blue-400 w-[70px] border-2 text-white',
        gray: 'bg-gray-500 border-gray-700 hover:bg-gray-400 w-[70px] border-2 text-white',
        orange: 'bg-orange-500 border-orange-700 hover:bg-orange-400 w-[70px] border-2 text-white',
        emerald: 'bg-emerald-500 border-emerald-700 hover:bg-emerald-400 w-[70px] border-2 text-white',
        sky: 'bg-sky-500 border-sky-700 hover:bg-sky-400 w-[70px] border-2 text-white',
        rose: 'bg-rose-500 border-rose-700 hover:bg-rose-400 w-[70px] border-2 text-white',
    };

    const theme = useContext(ThemeContext);

    const [themeColorsOpen, setThemeColorsOpen] = useState(false);

    const determineArrowDirection = () => {
        if (themeColorsOpen) return 'my-auto rotate-90';
        else return 'my-auto';
    };

    const rightArrIcon = (
        <Transition
            show={themeColorsOpen}
            // appear={true}
            enter="transition duration-150"
            enterFrom="rotate-0"
            enterTo="rotate-90"
            leave="transition duration-150"
            leaveFrom="rotate-90"
            leaveTo="rotate-0"
        >
            <FontAwesomeIcon className={'my-auto'} icon={solid('arrow-right')} />
        </Transition>
    );

    const [isOpen, setIsOpen] = useState(false);

    const openOptions = () => {
        setIsOpen(!isOpen);
    };

    const OptionsModal = (
        <BaseModal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
            <div className={modalStyles.holder}>
                <h2 className={modalStyles.title}>Options</h2>
                <div
                    className={`flex flex-row justify-between cursor-pointer px-2 bg-${theme?.themeColor}-200`}
                    onClick={() => setThemeColorsOpen((prevValue) => !prevValue)}
                >
                    <p>Set Color Theme</p>
                    {rightArrIcon}
                </div>
                <Transition
                    show={themeColorsOpen}
                    as={Fragment}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={
                            modalStyles.colorGroup + `bg-${theme?.themeColor}-400 border-${theme?.themeColor}-500`
                        }
                    >
                        <button onClick={() => theme?.themeSwitch('purple')} className={modalStyles.purple}>
                            purple
                        </button>
                        <button onClick={() => theme?.themeSwitch('red')} className={modalStyles.red}>
                            red
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
                </Transition>
            </div>
        </BaseModal>
    );

    if (props.isOpened)
        return (
            <>
                <div className={mainStyles.container + `bg-${theme?.themeColor}-300`}>
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
            <div className={mainStyles.containerClosed + `bg-${theme?.themeColor}-300`}>
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
