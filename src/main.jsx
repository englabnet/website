import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import axiosRetry from "axios-retry";
import axios from "axios";

axiosRetry(axios, {
  retries: 3,
  retryDelay: () => 1000,
  retryCondition(error) {
    // Conditional check the error status code
    switch (error.response.status) {
      case 429:
        return true;
      default:
        return false;
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleReCaptchaProvider>,
)
