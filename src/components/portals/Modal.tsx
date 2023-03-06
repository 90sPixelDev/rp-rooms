import React from 'react';

interface Props {
    children: React.ReactElement;
    isOpen: boolean;
    handleClose: () => void;
}
type Styles = {
    body: string;
    modalContainer: string;
};

const Modal = ({ children, isOpen, handleClose }: Props) => {
    const styles: Styles = {
        body: 'fixed bg-gray-500 z-2 flex flex-col items-center transition overflow-hidden h-full w-full',
        modalContainer: '',
    };

    if (!isOpen) return null;

    return (
        <div className={styles.body}>
            <div className={styles.modalContainer}>{children}</div>
        </div>
    );
};

export default Modal;
