import React, { useContext, Fragment } from 'react';
import Portal from '../portals/Portal';
import { ThemeContext } from '../context/ThemeContext';
import { Transition } from '@headlessui/react';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    coords: { x: number; y: number };
    handleClose: () => void;
}

const InfoModal = ({ children, isOpen, handleClose, coords }: ModalProps) => {
    const styles = {
        // backdrop: 'absolute h-[100vh] w-[100vw]',
        backdrop: ' h-[100vh] w-[100vw] flex flex-row items-center z-3  ',
        wrapperInside: 'rounded-lg z-5 ',
        infoBoxX: 'absolute px-2 py-1 rounded-tr-lg border-2 text-white ',
        closeBtn: 'p-2 self-end rounded-tr-lg hover:bg-purple-400 border-purple-600 border-2 ',
    };

    const theme = useContext(ThemeContext);

    if (!isOpen) return null;

    const checkOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        // if (e.target.attributes[0].value === 'backdrop') {
        handleClose();
        // }
    };

    return (
        <Portal wrapperId={'portal-root'}>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-250"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div itemRef="backdrop" className={styles.backdrop}>
                    <div className={styles.wrapperInside + `bg-${theme?.themeColor}-300 `}>{children}</div>
                    <button
                        className={
                            styles.infoBoxX +
                            `bg-${theme?.themeColor}-700 hover:bg-${theme?.themeColor}-400 border-${theme?.themeColor}-700`
                        }
                        onClick={checkOutsideClick}
                    >
                        X
                    </button>
                </div>
            </Transition>
        </Portal>
    );
};

export default InfoModal;
