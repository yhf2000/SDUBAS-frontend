import React, {useEffect, useState} from 'react';
import {Button, Layout, Space, Tree, Image, Tag, message} from 'antd';
import {DataNode} from 'antd/lib/tree';
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "../Redux/Store";
import getData from "../API/getData";
import {md_str} from "../Config/Project/data";
import ModalContentSubmit from "../Component/Project/ModalContentSubmit";
import {useSelector} from "react-redux";
import {IState} from "../Type/base";
import {ModalForm} from "@ant-design/pro-form";
import ModalFormUseForm from "../Component/Common/Form/ModalFormUseForm";
import AddSubmissionForm from "../Component/Project/Form/AddSubmissionForm";
import {Api} from "../API/api";

const {Sider, Content} = Layout;


type IProjectContentType = "file-video" | "file-office" | "file-pdf" | "markdown"


interface IProjectContent {
    type: string
}

interface keyIdMap {
    [key: string]: any;
}

const keyIdMap: keyIdMap = {}//key和id的字典

const ProjectInfo: React.FC = () => {
    const [selectedMenuKey, setSelectedMenuKey] = useState<string | null>(null);
    const [type, setType] = useState<IProjectContentType>("file-office")//原本的数据
    const [treeData, setTreeData] = useState<DataNode[]>([]);//树形数据
    const [leafContent, setLeafContent] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pId} = useParams();
    const userinfo = useSelector((state: IState) => state.UserReducer.userInfo);

    const generateTreeData = (data: any, parentKey = '') => {//根据后端数据递归获得treeData
        return data.map((item: any, index: any) => {
            const {name, children} = item;
            const key = parentKey ? `${parentKey}-${index}` : `${index}`;

            keyIdMap[key] = item;
            const treeNode: DataNode = {
                key: key,
                title: name,
            };

            //如果存在孩子则递归
            if (children && children.length > 0) {
                treeNode.children = generateTreeData(children, key);
            }

            return treeNode;
        });
    };
    const handleMenuSelect = (selectedKeys: React.Key[], {node}: any) => {
        setSelectedMenuKey(String(node.key));
    };

    const getLeafContentBykey = () => {
        if (selectedMenuKey && keyIdMap[selectedMenuKey]
            && (!keyIdMap[selectedMenuKey].children || keyIdMap[selectedMenuKey].children.length === 0)) {
            // console.log('key:', selectedMenuKey);
            dispatch(getData(
                'getProConInfo',
                {pId: pId, cId: keyIdMap[selectedMenuKey].id},
                (res: any) => {
                    setLeafContent(res.file);
                    setType(res.type);
                    Promise.resolve(res);
                },
                () => {
                    //onError
                }
            ))
        }
    }

    useEffect(() => {
        dispatch(getData(
            'getProContent',
            {pId: pId},
            (data: any) => {
                setTreeData(generateTreeData(data));
                Promise.resolve();
            },
            () => {

            }
        ))
    }, [])

    useEffect(() => {
        getLeafContentBykey();
    }, [selectedMenuKey]);

    return (
        <div style={{minWidth: 800}}>
            <div style={{textAlign: "left", marginBottom: 12, marginLeft: 6}}>
                <Space size={24}>
                    <Image
                        preview={false}
                        width={80}
                        height={45}
                        src="https://th.bing.com/th/id/R.b2b272f8ae007ad035596cd5d821267c?rik=athjdDnQOLB3jA&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2fd82f8cba23ed97d6e83588821b90b9cbba44542a.jpg&ehk=pmEYQkMvwU7rhgClPSf3oHOzxVB158r4crBX%2fhqzZHk%3d&risl=&pid=ImgRaw&r=0"
                        alt="数据结构"
                    />
                    <Space direction="vertical" size={0}>
                        <Space>
                            <Title level={4} style={{margin: 0}}>数据结构</Title>
                            <Tag color="#CBA265">国家精品</Tag>
                        </Space>
                        <Space size={2}>
                            <Link href="/u/4941656951" target="_blank">
                                <Text type="success">陈越</Text>
                            </Link>
                            <Text>,</Text>
                            <Link href="/u/2892439838" target="_blank">
                                <Text type="success">何钦铭</Text>
                            </Link>
                        </Space>
                    </Space>
                </Space>
                <div style={{float: "right", marginRight: 6}}>
                    <Space size={12}>
                        {/*还有一些待传的参数*/}
                        {
                            selectedMenuKey && keyIdMap[selectedMenuKey]
                            && (!keyIdMap[selectedMenuKey].children || keyIdMap[selectedMenuKey].children.length === 0) && (
                                <>
                                    <ModalFormUseForm
                                        title={'添加提交任务'}
                                        btnName={'添加提交'}
                                        btnType={'primary'}
                                        subForm={[
                                            {
                                                component:AddSubmissionForm,
                                                label:'',
                                            }
                                        ]}
                                        dataSubmitter={async (data:any)=>{
                                                console.log('data',data);
                                                return Api.submitProContent({pId:pId,cId:keyIdMap[selectedMenuKey].id,data:data})
                                        }}
                                    />
                                    <ModalContentSubmit
                                        pId={pId}
                                        cId={keyIdMap[selectedMenuKey].id}
                                        username={userinfo?.username}//这里可能会替换成userid
                                    />
                                </>
                            )
                        }

                        pid:{pId}
                    </Space>
                </div>
            </div>
            <Layout style={{minHeight: 600}}>
                <Sider width={250} style={{background: '#f0f2f5'}}>
                    <Tree
                        showLine
                        autoExpandParent={true}
                        defaultExpandAll={true}
                        onSelect={handleMenuSelect}
                        selectedKeys={selectedMenuKey !== null ? [selectedMenuKey] : []}
                        treeData={treeData}
                        style={{background: '#f0f2f5', paddingTop: 8, paddingLeft: 4, paddingBottom: 8}}
                    />
                </Sider>
                <Layout>
                    <Content style={{padding: '24px'}}>
                        <div>当前选中的菜单ID: {selectedMenuKey}</div>
                        {type === "file-video" && (
                            <ReactPlayer
                                className='react-player'
                                controls
                                url='https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4'
                                width="100%"
                                height='720px'
                            />
                        )}
                        {type === "file-office" && (
                            <iframe
                                title="demo.docx"
                                src="https://view.officeapps.live.com/op/view.aspx?src=https://calibre-ebook.com/downloads/demos/demo.docx"
                                width="100%"
                                height="720px"
                            />
                        )}
                        {/*{pId=='1'&&(*/}
                        {/*    <iframe*/}
                        {/*        title="demo.docx"*/}
                        {/*        src="https://view.officeapps.live.com/op/view.aspx?src=https://calibre-ebook.com/downloads/demos/demo.docx"*/}
                        {/*        width="100%"*/}
                        {/*        height="720px"*/}
                        {/*    />*/}
                        {/*)}*/}
                        {type === "file-pdf" && (
                            <iframe
                                title="pdf.pdf"
                                src="http://www.pdf995.com/samples/pdf.pdf"
                                width="100%"
                                height="720px"
                            />
                        )}
                        {/*{pId=='2'&& (*/}
                        {/*    <iframe*/}
                        {/*        title="pdf.pdf"*/}
                        {/*        src="http://www.pdf995.com/samples/pdf.pdf"*/}
                        {/*        width="100%"*/}
                        {/*        height="720px"*/}
                        {/*    />*/}
                        {/*)}*/}
                        {type === "markdown" && (
                            <div style={{textAlign: "left"}}>
                                <ReactMarkdown children={md_str}/>
                            </div>
                        )}
                        {/*{pId=='3'&&(*/}
                        {/*    <div style={{textAlign: "left"}}>*/}
                        {/*        <ReactMarkdown children={md_str}/>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/*<iframe*/}
                        {/*    title="spurious.xls"*/}
                        {/*    src="https://view.officeapps.live.com/op/view.aspx?src=http://www.principlesofeconometrics.com/excel/spurious.xls"*/}
                        {/*    width="100%"*/}
                        {/*    height="720px"*/}
                        {/*/>*/}

                        {/*<iframe*/}
                        {/*    title="Presentations-Tips.ppt"*/}
                        {/*    src="https://view.officeapps.live.com/op/view.aspx?src=http://www.iasted.org/conferences/formatting/Presentations-Tips.ppt"*/}
                        {/*    width="100%"*/}
                        {/*    height="720px"*/}
                        {/*/>*/}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ProjectInfo;
