import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import "./styles/app.scss";
import {ContextProvider} from './Context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
)
