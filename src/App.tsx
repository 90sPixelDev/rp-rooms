import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/AuthContext';
import { SignUpForm, LogInForm, ChatRooms, WelcomeBG } from './components';

type Props = {
    children: JSX.Element;
};

function App() {
    const currentUser = useContext(UserContext);

    const ProtectedRoute = ({ children }: Props) => {
        if (!currentUser) {
            return <Navigate to="login" />;
        } else return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ChatRooms />
                        </ProtectedRoute>
                    }
                ></Route>
                <Route element={<WelcomeBG />}>
                    <Route path="login" element={<LogInForm />} />
                    <Route path="signup" element={<SignUpForm />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
