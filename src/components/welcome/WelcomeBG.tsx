import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { PreviewForm } from '..';

type Styles = {
    body: string;
};

const WelcomeBG = () => {
    const styles: Styles = {
        body: 'absolute h-[100vh] w-[100vw] flex flex-col bg-welcomeBgImg bg-cover',
    };

    return (
        <div className={styles.body}>
            <PreviewForm />
            <Outlet />
        </div>
    );
};

export default WelcomeBG;
