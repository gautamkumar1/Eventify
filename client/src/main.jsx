import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from '../src/redux/store/store.jsx';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-7ge3dvwbf1jbtmer.us.auth0.com"
        clientId="S5Z0ZeWIezUadFJBTpY4TncntSoI29Tm"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
          bodyClassName="toastBody"
        />
      </Auth0Provider>,


    </React.StrictMode>
  </Provider>
)
