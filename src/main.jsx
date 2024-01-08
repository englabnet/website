import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <App />
  </GoogleReCaptchaProvider>,
)
