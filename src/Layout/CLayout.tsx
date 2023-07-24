import React, {useEffect} from "react";
import {Layout} from "antd";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import CHeader from "./CHeader";
import UserLoginCheck from "../Component/User/UserLoginCheck";
import {CLayoutRouter} from "../router";


const {Content, Footer} = Layout;

const CLayout = () => {
    const navigator = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let pt = location.pathname
        if (pt === '' || pt === '/' || pt === "/c" || pt === "/c/") {
            navigator("/c/home");
        }
    }, [])

    return (
        <>
            <UserLoginCheck jump={false}/>
            <Layout style={{height: "max-content", minHeight: "100%", minWidth: "1300px"}}>
                <Layout style={{minWidth: 500}}>
                    <CHeader/>
                    <Content style={{
                        backgroundColor: "#ffffff",
                        paddingTop: 64,
                        margin: '20px 16px 0',
                        display: "table",
                        height: "auto"
                    }}>
                        <Routes>
                            {CLayoutRouter.map(({id, path, component}) =>
                                <Route key={id} path={path} element={component}/>
                            )}
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Copyright © 2023 Shandong University
                    </Footer>
                </Layout>
            </Layout>
        </>
    )

}

export default CLayout