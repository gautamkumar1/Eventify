import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store/store.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '1046925519839-h8jnc6vkir0rohe6kfmdr0jnid5hu7ep.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<GoogleOAuthProvider clientId={clientId}>
<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
    
  </React.StrictMode>
);
