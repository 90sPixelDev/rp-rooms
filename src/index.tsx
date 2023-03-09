import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <AuthContextProvider>
        <React.StrictMode>
            <ThemeContextProvider>
                <App />
            </ThemeContextProvider>
        </React.StrictMode>
    </AuthContextProvider>,
);
