import React from 'react';

type Props = unknown;
type Styles = {
	container: string;
	userName: string;
};

const UserProfilePeek = (props: Props) => {
	const styles: Styles = {
		container: '',
		userName: 'font-bold',
	};
	return (
		<div>
			<p>UserName</p>
		</div>
	);
};

export default UserProfilePeek;
