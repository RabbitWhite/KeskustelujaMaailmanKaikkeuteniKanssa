import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

console.log('height default :'+window.visualViewport.height)
console.log('width default :'+window.visualViewport.width)

window.addEventListener('resize',(e)=>{         
      console.log( `width: ${e.target.visualViewport.width}px`);
      console.log( `height: ${e.target.visualViewport.height}px`);
 });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
