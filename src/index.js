import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {
  ClerkProvider
} from "@clerk/clerk-react";


const clerkPubKey = 'pk_test_Y2FwYWJsZS1tYWdnb3QtNzcuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);

