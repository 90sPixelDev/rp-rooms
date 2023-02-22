import React from 'react';

const PreviewForm = () => {
    const styles = {
        container: 'fixed left-[50%] top-[3vh] translate-x-[-50%]',
        body: 'bg-purple-400 px-4 py-2 rounded-lg shadow-lg',
        text: 'text-center text-white',
        button: 'bg-purple-700 py-1 px-2 rounded-lg my-2 flow-root mx-auto text-white hover:bg-purple-600',
    };

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <p className={styles.text}>Want to take a quick look on a guest account instead?</p>
                <button className={styles.button}>Preview RP Rooms</button>
            </div>
        </div>
    );
};

export default PreviewForm;
