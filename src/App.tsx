import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {mainRouter} from "./router";

var c=0;
const App = () => {
    c++;
    console.log('1',c)
    return (
        <>
            <Router>
                <Routes>
                    {mainRouter.map((r) =>
                        <Route key={r.id} path={r.path} element={r.component}/>
                    )}
                </Routes>
            </Router>
        </>
    );
}

export default App;
