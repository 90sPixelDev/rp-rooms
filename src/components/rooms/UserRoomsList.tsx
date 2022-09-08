import React from 'react';

type Children = React.ReactNode;
interface roomsProps {
	children: React.ReactNode;
	err: boolean;
	loading: boolean;
	type: string;
}

const UserRoomsList = ({
	children,
	err = false,
	loading,
	type,
}: roomsProps) => {
	if (err) {
		return type === 'team' ? (
			<p>Connection Error: Please wait a moment and try again.</p>
		) : null;
	}

	if (loading) {
		return <p>{type === 'team' ? 'Rooms' : 'Messages'} Loading ...</p>;
	}

	return (
		<div>
			<div>
				HEADER
				<p>{type === 'team' ? 'Rooms' : 'Direct Messages'}</p>
				//? Button - add Room
			</div>
			{children}
		</div>
	);
};

export default UserRoomsList;
