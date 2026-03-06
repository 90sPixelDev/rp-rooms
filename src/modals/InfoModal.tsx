import React, { useContext, useEffect, useRef } from 'react';
import Portal from '../portals/Portal';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

const InfoModal = ({ children, isOpen, handleClose }: ModalProps) => {
    const styles = {
        wrapper: ' flex justify-center items-center h-[100vh] rounded-lg z-5 ',
        closeBtn: 'p-2 self-end rounded-tr-lg hover:bg-purple-400 border-purple-600 border-2 ',
    };

    const modalRef = useRef<HTMLDivElement>(null);

    const checkOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
            handleClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', checkOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', checkOutsideClick);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Portal wrapperId={'portal-root'}>
            <div className={styles.wrapper} ref={modalRef}>
                {children}
            </div>
        </Portal>
    );
};

export default InfoModal;
