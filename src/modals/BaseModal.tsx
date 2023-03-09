import React, { useContext } from 'react';
import Portal from '../portals/Portal';
import { ThemeContext } from '../context/ThemeContext';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

const BaseModal = ({ children, isOpen, handleClose }: ModalProps) => {
    const styles = {
        backdrop: 'fixed h-[100vh] w-[100vw] bg-gray-900/50 flex flex col items-center justify-center',
        wrapperInside: 'h-[70%] w-[70%] rounded-lg flex flex-col ',
        closeBtn: 'p-2 self-end rounded-tr-lg border-2 ',
    };

    const theme = useContext(ThemeContext);

    if (!isOpen) return null;

    return (
        <Portal wrapperId={'portal-root'}>
            <div className={styles.backdrop}>
                <div className={styles.wrapperInside + `bg-${theme?.themeColor}-300`}>
                    <button
                        onClick={handleClose}
                        className={
                            styles.closeBtn +
                            `bg-${theme?.themeColor}-500 hover:bg-${theme?.themeColor}-400 border-${theme?.themeColor}-600`
                        }
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default BaseModal;
