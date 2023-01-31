import React from 'react';
import {RecoilRoot} from 'recoil';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './components/Home'

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Switch>
                    <Route path="/lotto">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </RecoilRoot>
    );
}

export default App;
