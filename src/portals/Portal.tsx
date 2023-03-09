import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactElement;
    wrapperId: string;
}

const Portal = ({ children, wrapperId }: PortalProps) => {
    return createPortal(children, document.getElementById(wrapperId) as HTMLElement);
};

export default Portal;
