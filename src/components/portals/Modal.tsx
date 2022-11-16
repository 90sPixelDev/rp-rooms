import React from 'react';

interface Props {
	children: React.ReactElement;
	isOn: boolean;
	handleClose: () => void;
}
type Styles = {
	body: string;
	modalContainer: string;
};

const Modal = ({ children, isOn, handleClose }: Props) => {
	const styles: Styles = {
		body: 'fixed bg-gray-500 z-2 flex flex-col items-center transition overflow-hidden h-full w-full',
		modalContainer: '',
	};

	return (
		<div className={styles.body}>
			<div className={styles.modalContainer}>{children}</div>
		</div>
	);
};

export default Modal;
