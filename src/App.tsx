import React from 'react';
import {RecoilRoot} from 'recoil';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home'

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
