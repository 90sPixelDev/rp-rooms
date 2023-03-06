import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = any;
type Styles = {
    btn: string;
};

const CreateRoomBtn = (props: Props) => {
    const styles: Styles = {
        btn: 'bg-purple-400 w-6 rounded-r-lg hover:text-purple-200 border-t-2 border-r-2 border-b-2 border-purple-600 min-w-[12%]',
    };

    const addRoomIcon = <FontAwesomeIcon icon={solid('plus')} />;

    const addRoomBtnClicked = () => {
        props.onBtnClicked();
    };

    return (
        <button className={styles.btn} onClick={addRoomBtnClicked}>
            {addRoomIcon}
        </button>
    );
};

export default CreateRoomBtn;
