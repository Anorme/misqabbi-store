import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router';

import App from './App.jsx';
import './index.css';
import './styles/tailwind.css';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>
);
