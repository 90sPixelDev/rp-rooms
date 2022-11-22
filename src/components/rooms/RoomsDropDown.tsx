import React, { useState, useEffect } from 'react';
import { DropDownItem } from '../exporter';

import loadingAnim from '../../resources/ui/loading-anim.svg';

interface Props {
	roomsSearched: string[];
	addSelectedRoom: (room: string) => void;
}
interface Props {
	isOpened: boolean;
}
type Styles = {
	containerOpened: string;
	containerLoadingClosed: string;
	container: string;
	body: string;
};

const RoomsDropDown = (props: Props) => {
	const styles: Styles = {
		containerOpened:
			'absolute bg-purple-500 flex flex-col h-fit w-full top-[70%] border-2 border-purple-300 transition',
		container:
			'fixed bg-purple-500 flex flex-col h-fit w-full top-[51%] border-2 border-purple-300 transition m-h-fit',
		containerLoadingClosed:
			'fixed bg-[transparent] flex flex-col h-fit w-full top-[51%] border-2 border-purple-300 transition m-h-fit',
		body: 'flex flex-col h-full w-full transition',
	};

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (props.roomsSearched.length > 0) {
			setIsLoading(false);
		}
	}, [props.roomsSearched]);

	if (props.isOpened) {
		if (isLoading)
			return (
				<div className={styles.containerOpened}>
					<img src={loadingAnim} />
				</div>
			);

		return (
			<div className={styles.containerOpened}>
				{props.roomsSearched.map((room: string) => (
					<DropDownItem
						title={room}
						key={Math.random() * 9}
						addSelectedRoom={props.addSelectedRoom}
					/>
				))}
			</div>
		);
	}

	return (
		<>
			{isLoading && (
				<div className={styles.containerLoadingClosed}>
					<img src={loadingAnim} />
				</div>
			)}
			<div className={styles.container}>
				{props.roomsSearched.map((room: string) => (
					<DropDownItem
						title={room}
						key={Math.random() * 9}
						addSelectedRoom={props.addSelectedRoom}
					/>
				))}
			</div>
		</>
	);
};

export default RoomsDropDown;
