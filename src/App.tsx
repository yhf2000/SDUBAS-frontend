import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {mainRouter} from "./router";



const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    {
                        mainRouter.map((r) => {
                            return (
                                <Route key={r.id} path={r.path} element={r.component} />
                            )
                        })
                    }
                </Routes>
            </Router>
        </>
    );
}

export default App;
