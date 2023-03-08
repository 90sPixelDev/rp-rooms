import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ThemeContext } from '../../context/ThemeContext';

type Props = any;
type Styles = {
    btn: string;
};

const CreateRoomBtn = (props: Props) => {
    const styles: Styles = {
        btn: 'w-6 rounded-r-lg hover:text-purple-200 border-t-2 border-r-2 border-b-2 min-w-[12%] ',
    };

    const theme = useContext(ThemeContext);

    const addRoomIcon = <FontAwesomeIcon icon={solid('plus')} />;

    const addRoomBtnClicked = () => {
        props.onBtnClicked();
    };

    return (
        <button
            className={styles.btn + `bg-${theme?.themeColor}-400 border-${theme?.themeColor}-600`}
            onClick={addRoomBtnClicked}
        >
            {addRoomIcon}
        </button>
    );
};

export default CreateRoomBtn;
