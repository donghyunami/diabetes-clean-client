import React from 'react';
import ReactDOM from 'react-dom/client';
import AppLayout from 'layouts/AppLayout';
import { Global } from "@emotion/react";
import { reset } from 'styles/reset';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Global styles={reset}/>
    <AppLayout />
  </React.StrictMode>
);
