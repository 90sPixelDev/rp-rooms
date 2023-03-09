import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/AuthContext';
import { SignUpForm, LogInForm, ChatRooms, WelcomeBG } from './components/exporter';

type Props = {
    children: JSX.Element;
};

function App() {
    const styles = {
        wrapper:
            'bg-purple-200 h-[100vh] w-[100vw] grid grid-cols-[minmax(100px,_250px)_1fr_minmax(150px,_250px)] grid-rows-[85%_minmax(50px,_350px)] absolute',
    };

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
