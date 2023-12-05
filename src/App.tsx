import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {mainRouter} from "./router";
import {ConfigProvider} from "antd";
import zh_CN from 'antd/lib/locale/zh_CN'

const App = () => {
    return (
        <>
            <ConfigProvider locale={zh_CN}>
                <Router>
                    <Routes>
                        {mainRouter.map((r) =>
                            <Route key={r.id} path={r.path} element={r.component}/>
                        )}
                    </Routes>
                </Router>
            </ConfigProvider>
        </>
    );
}

export default App;
