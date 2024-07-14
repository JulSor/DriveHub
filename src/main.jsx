import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router, Routes, Route } from "react-router-dom";
import App from './components/App/App';


const root = createRoot(document.getElementById('root'));
root.render(
    <App/>
    
    // <Router>
    //     <Routes>
    //         <Route path="/" element={ <App /> }/>
    //     </Routes>
    // </Router>
    // document.getElementById('root')
);
