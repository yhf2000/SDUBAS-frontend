import BK1 from "../Assert/img/ban1news.jpg"
import BC from "../Assert/img/bolckchain.jpg"
import CB from "../Assert/img/creditbank.jpg"
import PP from "../Assert/img/personalprofile.jpg"
import {Col, Image, Row} from "antd";
import React from "react";
import JumpButton from "../Component/Common/JumpButton";
import Title from "antd/es/typography/Title";
import {DocumentEditor} from "@onlyoffice/document-editor-react";

const Home = () => {
    // Api.logout()
    return (
        <>
            {/*<FilePreview url={'https://calibre-ebook.com/downloads/demos/demo.docx'} />*/}
            {/*<DocumentEditor id={"docxEditor"} documentServerUrl={'http://43.138.34.119:8000'}*/}
            {/*                config={{*/}
            {/*                    "document":{*/}
            {/*                        "fileType":"docx",*/}
            {/*                        "key":"",*/}
            {/*                        "title":'预览文件',*/}
            {/*                        "url":"https://calibre-ebook.com/downloads/demos/demo.docx",*/}
            {/*                        permissions: {*/}
            {/*                            edit: false, // 禁用编辑权限*/}
            {/*                            download: true, // 启用下载权限*/}
            {/*                        },*/}
            {/*                    },*/}
            {/*                    "documentType":'word',*/}
            {/*                }}*/}
            {/*                height={'1000px'}*/}
            {/*/>*/}
            <Image src={BK1}
                   preview={false}
                   style={{maxWidth: "1500px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)"}}/>
            <Title level={2}> 区块链驱动的综合教育平台 </Title>
            <div style={{maxWidth: "1500px", margin: "0 auto", marginTop: 60, textAlign: "left"}}>
                <div style={{padding: '20px', background: '#f5f5f5', borderRadius: '10px'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '20px'}}>快速跳转</h2>
                    <Row gutter={[16, 16]} justify="center">
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <JumpButton title="区块链实验平台" link="/c/experiment" img={BC}/>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <JumpButton title="学分银行" link="/c/creditBank" img={CB}/>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <JumpButton title="个人档案" link="/c/record_personal" img={PP}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Home