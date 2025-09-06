import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <div className="container mx-auto"> */}
      <App />
    {/* </div> */}
  </StrictMode>
);
