import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { 
  BrowserRouter,
  Routes, 
  Route 
} from 'react-router-dom';
import { history } from './helpers/history';
import Homepage from './routes';
import ContactList from './routes/contacts';
import ContactDetail from './routes/contacts/detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Homepage />} />
            <Route path="contact" element={<ContactList />} >
              <Route path=":id" element={<ContactDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
