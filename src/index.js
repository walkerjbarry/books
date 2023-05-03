import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BooksContext from './context/books';


const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <BooksContext.Provider value={5}>
        <App />
    </BooksContext.Provider>
    // ONLY the component wrapped  / contained within context.provider 
    //can access the value prop that is being passed
    // in this case, <App /> (and it's children) is (are) the only one(s) that can access the value 5
  );