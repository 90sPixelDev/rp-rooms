import { Styles } from '@fortawesome/fontawesome-svg-core';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const NoticeDisclaimer = () => {
    const styles: Styles = {
        container: 'place-content-end min-w-full rounded-lg shadow-lg font-bold ',
        holder: 'border-4 border-red-500 bg-red-100 ',
        h3Text: 'text-lg text-center p-2 rounded-t-lg mb-1 text-red-700 ',
        pText: 'text-center text-sm p-2 ',
    };
    const theme = useContext(ThemeContext);

    return (
        <div className={styles.container}>
            <div className={styles.holder}>
                <h3 className={styles.h3Text}>Notice</h3>
                <p className={styles.pText}>
                    This is a demo project and is not intended for real world or production use. All data is stored in a
                    test Firebase database and may be deleted at any time. Further more messages are not private or
                    encrypted as this is a showcase project. Please do not use real or sensitive information when
                    creating an account or using the application.
                </p>
            </div>
        </div>
    );
};

export default NoticeDisclaimer;
// testing fake commit to trigger vercel auto deploy
