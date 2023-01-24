import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { PreviewForm } from '../exporter';

type Styles = {
    body: string;
};

const WelcomeBG = () => {
    const styles: Styles = {
        body: 'bg-purple-100 h-[100vh] w-[100vw] flex flex-col',
    };

    return (
        <div className={styles.body}>
            <PreviewForm />
            <Outlet />
        </div>
    );
};

export default WelcomeBG;
