import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Config from './store/config.jsx'

import "./assets/styles/formStyle.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Config>
      <App />
    </Config>
)

// <React.StrictMode>

// </React.StrictMode>,