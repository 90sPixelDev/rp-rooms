import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Shows login screen if not signed in', () => {
    render(<App />);
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
});
