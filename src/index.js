import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {QueryClient , QueryClientProvider} from "react-query"

import App from './App';
import reportWebVitals from './reportWebVitals';
const baseUrl='https://ecommerce.routemisr.com/api/v1/';
export default baseUrl;


const root = ReactDOM.createRoot(document.getElementById('root'));


let query = new QueryClient()
root.render(
    <QueryClientProvider  client={query}>
    <App />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
