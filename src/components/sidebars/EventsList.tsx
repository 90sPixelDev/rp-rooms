import React from 'react';
import { StoryEvent } from '..';

interface Props {
    isOpened: boolean;
}
type Styles = {
    container: string;
};

const EventsList = (props: Props) => {
    const styles: Styles = {
        container: 'flex flex-col gap-4 m-2',
    };

    return (
        <div className={styles.container}>
            <StoryEvent isOpened={props.isOpened} />
            <StoryEvent isOpened={props.isOpened} />
            <StoryEvent isOpened={props.isOpened} />
            <StoryEvent isOpened={props.isOpened} />
            <StoryEvent isOpened={props.isOpened} />
        </div>
    );
};

export default EventsList;
