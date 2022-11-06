import { useEffect, useState } from 'react';

import { LogInForm, SignUpForm } from '../exporter';

interface WelcomeBG {
	formBtnClicked: (params: any) => void;
}
type Props = any;
type Styles = {
	body: string;
};

const WelcomeBG = (props: Props) => {
	const styles: Styles = {
		body: 'bg-purple-100 h-[100vh] w-[100vw] flex flex-col place-content-center place-items-center',
	};

	const [isNewUser, setIsNewUser] = useState<boolean>(true);

	const SignedIn = (user: any) => {
		props.setUser(user);
	};

	const ChangeFormHandler = () => {
		setIsNewUser(!isNewUser);
	};

	return (
		<div className={styles.body}>
			{isNewUser ? (
				<SignUpForm
					formBtnClicked={ChangeFormHandler}
					userSignedUp={SignedIn}
				/>
			) : (
				<LogInForm
					formBtnClicked={ChangeFormHandler}
					userSignedIn={SignedIn}
				/>
			)}
		</div>
	);
};

export default WelcomeBG;
