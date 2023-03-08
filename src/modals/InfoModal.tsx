import React, { useContext } from 'react';
import Portal from '../portals/Portal';
import { ThemeContext } from '../context/ThemeContext';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

const InfoModal = ({ children, isOpen, handleClose }: ModalProps) => {
    const styles = {
        backdrop: 'absolute h-[20vh] w-[30vw]',
        wrapperInside: 'absolute rounded-lg flex flex-col z-3 ',
        closeBtn: 'p-2 self-end rounded-tr-lg hover:bg-purple-400 border-purple-600 border-2 ',
    };

    const theme = useContext(ThemeContext);

    if (!isOpen) return null;

    return (
        <Portal wrapperId={'portal-root'}>
            <div className={styles.backdrop}>
                <div className={styles.wrapperInside + `bg-${theme?.themeColor}-300`}>{children}</div>
            </div>
        </Portal>
    );
};

export default InfoModal;
