import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router';

import App from './App.jsx';
import { AuthProvider } from './contexts/auth/AuthProvider.jsx';
import { FormProvider } from './contexts/form/FormProvider.jsx';

import './index.css';
import './styles/tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FormProvider>
        <Router>
          <App />
        </Router>
      </FormProvider>
    </AuthProvider>
  </StrictMode>
);
