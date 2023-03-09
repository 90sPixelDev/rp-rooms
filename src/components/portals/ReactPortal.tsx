import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
    children: React.ReactElement;
    wrapperID: string;
}

const ReactPortal = ({ children }: Props) => {
    return createPortal(children, document.getElementById('portal-container') as Element);
};

export default ReactPortal;
