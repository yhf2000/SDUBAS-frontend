import React, {useEffect, useState} from 'react';
import {Layout, Space, Tree, Image, Tag, Button} from 'antd';
import {DataNode} from 'antd/lib/tree';
import Title from "antd/es/typography/Title";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {useLocation, useParams} from "react-router-dom";
import {md_str} from "../../Config/Project/data";
import ModalContentSubmit from "../../Component/Project/ModalContentSubmit";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import AddSubmissionForm from "../../Component/Project/Form/AddSubmissionForm";
import {Api} from "../../API/api";
import Score from "../../Component/Project/Score";
import {buildTree} from "../../Utils/buildTree";
import AddCreditByRole from "../../Component/Project/Form/AddCreditByRole";
import ApplyPermission from "../../Component/Permission/ApplyPermission";
import UserContentScore from "./Info/UserContentScore";
import PlayerWithDuration from "../../Component/Common/PlayerWithDuration";
import internal from "stream";
import CreateTemplate from "../../Component/Project/CreateTemplate";

const {Sider, Content} = Layout;


type IProjectContentType = "file-video" | "office"  | "markdown"


interface keyIdMap {
    [key: string]: any;
}

const keyIdMap: keyIdMap = {}//key和id的字典
const IdConMap: keyIdMap = {}
const ProjectInfo: React.FC = () => {
    const [selectedMenuKey, setSelectedMenuKey] = useState<number | null>(null);
    const [type, setType] = useState<IProjectContentType>("office")//原本的数据
    const [treeData, setTreeData] = useState<DataNode[]>([]);//树形数据
    const {pId} = useParams();
    const userinfo = useSelector((state: IState) => state.UserReducer.userInfo);
    const location = useLocation();
    const {item} = location.state;
    const generateTreeData = (data: any) => {//根据后端数据递归获得treeData
        return data.map((item: any) => {
            let {key, children, isLeaf} = item;
            keyIdMap[key] = item;

            //如果存在孩子则递归
            if (!isLeaf && children) {
                generateTreeData(children);
            }
        });
    };
    const handleMenuSelect = async (selectedKeys: React.Key[], {node}: any) => {
        setSelectedMenuKey(node.key);
    };
    useEffect(() => {
        let newTree = [
            {
                key: 'credits', title:
                    <ModalFormUseForm
                        btnName={'学分认定'}
                        btnType={'text'}
                        title={'学分认定'}
                        subForm={[
                            {
                                component: AddCreditByRole({pId: pId}),
                                label: ''
                            }
                        ]}
                        // dataLoader
                        dataSubmitter={async (value: any) => {
                            return Api.addProCredit({pId: pId, data: value})
                        }}
                    />,
            },
            {
                key: 'score',
                title: <UserContentScore pId={pId}/>,
            },
            {
                key: 'apply',
                title: <ApplyPermission />,
            },
            {
                key:'createApply',
                title:<CreateTemplate />
            }
        ]
        Api.getProContent({pId: pId})
            .then(async (data: any) => {
                data.map((d: any) => {
                    const {id} = d;
                    IdConMap[id] = d;
                })
                console.log(IdConMap);
                const Tree = buildTree(data);
                await setTreeData(() => {
                    return [...Tree, ...newTree]
                });
            })
            .catch(() => {
            })
    }, [])
    useEffect(() => {
        generateTreeData(treeData);
    }, [treeData])
    return (
        <div style={{minWidth: 800}}>
            <div style={{textAlign: "left", marginBottom: 12, marginLeft: 6}}>
                <Space size={24}>
                    <Image
                        preview={false}
                        width={80}
                        height={45}
                        src = {item.url}
                        alt="数据结构"
                    />
                    <Space direction="vertical" size={0}>
                        <Space>
                            <Title level={4} style={{margin: 0}}>{item.name}</Title>
                            <Tag color="#CBA265">国家精品</Tag>
                        </Space>
                    </Space>
                </Space>
                <div style={{float: "right", marginRight: 6}}>
                    <Space size={12}>
                        {/*还有一些待传的参数*/}
                        {
                            selectedMenuKey && keyIdMap[selectedMenuKey] && keyIdMap[selectedMenuKey].isLeaf && (
                                <>
                                    <ModalFormUseForm
                                        title={'添加提交任务'}
                                        btnName={'添加提交'}
                                        btnType={'primary'}
                                        TableName={`SubmitContentTable-${keyIdMap[selectedMenuKey].key}`}
                                        subForm={[
                                            {
                                                component: () => AddSubmissionForm({cId: keyIdMap[selectedMenuKey].key}),
                                                label: '',
                                            }
                                        ]}
                                        dataSubmitter={async (data: any) => {
                                            // console.log('data',data);
                                            return Api.submitProContent({
                                                pId: pId,
                                                cId: keyIdMap[selectedMenuKey].key,
                                                data: data
                                            })
                                        }}
                                    />
                                    <ModalContentSubmit
                                        pId={pId}
                                        cId={keyIdMap[selectedMenuKey].key}
                                        username={userinfo?.username}//这里可能会替换成userid
                                    />
                                    <Score pId={pId} cId={keyIdMap[selectedMenuKey].key}/>
                                    <Button onClick={()=>{Api.getRefresh({pId:pId,cId:keyIdMap[selectedMenuKey].key})}}>更新我的</Button>
                                    <Button onClick={()=>{Api.getRefreshAll({pId:pId,cId:keyIdMap[selectedMenuKey].key})}}>更新全部</Button>
                                </>
                            )
                        }
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
                        {
                            selectedMenuKey ? selectedMenuKey in IdConMap &&
                                <ContentPlay url={IdConMap[selectedMenuKey].url} type={IdConMap[selectedMenuKey].file_type} pId={pId}
                                             cId={selectedMenuKey}/>
                                : (
                                    <>
                                    </>
                                )
                        }
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
        ;
};

const ContentPlay = (props: any) => {
    // console.log(props.type)
    return (
        <>
            {
                props.type === "file-video" && (
                    <PlayerWithDuration
                        url={props.url}
                        pId={props.pId}
                        cId={props.cId}
                    />
                )
            }
            {
                props.type === "application/msword" && (
                    <iframe
                        title="demo.docx"
                        src={"https://view.officeapps.live.com/op/view.aspx?src="+props.url}
                        width="100%"
                        height="720px"
                    />
                )
            }
            {
                props.type === "markdown" && (
                    <div style={{textAlign: "left"}}>
                        <ReactMarkdown children={md_str}/>
                    </div>
                )
            }
        </>
    )
}
export default ProjectInfo;
