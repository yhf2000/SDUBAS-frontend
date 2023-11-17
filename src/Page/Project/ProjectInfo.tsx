import React, {useEffect, useState} from 'react';
import {Layout, Space, Tree, Image, Tag, Button, Menu, Dropdown, MenuProps, Divider} from 'antd';
import {DataNode} from 'antd/lib/tree';
import Title from "antd/es/typography/Title";
import ReactMarkdown from "react-markdown";
import {useLocation, useParams} from "react-router-dom";
import {tagOptions} from "../../Config/Project/data";
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
import CreateTemplate from "../../Component/Project/CreateTemplate";
import {DownOutlined} from "@ant-design/icons";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {creditsTypeColumn} from "../../Config/Project/columns";


const {Sider, Content} = Layout;


type IProjectContentType = "video" | "office_word" | "markdown" | "office_ppt"


interface keyIdMap {
    [key: string]: any;
}

const keyIdMap: keyIdMap = {}//key和id的字典
const IdConMap: keyIdMap = {}
const ProjectInfo: React.FC = () => {
    const [selectedMenuKey, setSelectedMenuKey] = useState<number | null>(null);
    const [type, setType] = useState<IProjectContentType>("office_word")//原本的数据
    const [treeData, setTreeData] = useState<DataNode[] | undefined>(undefined);//树形数据
    const {pId} = useParams();
    const userinfo = useSelector((state: IState) => state.UserReducer.userInfo);
    const location = useLocation();
    const {item} = location.state;
    const [permissions,getPermission] = useState<string[]>([]);
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
        Api.getProContent({pId: pId})
            .then(async (data: any) => {
                setSelectedMenuKey(data[0].id)
                data.map((d: any) => {
                    const {id} = d;
                    IdConMap[id] = d;
                })
                // console.log(IdConMap);
                const Tree = buildTree(data);
                setTreeData(() => {
                    return [...Tree]
                });
            })
            .catch(() => {
            })
    }, [])
    useEffect(() => {
        // console.log(treeData)
        if(treeData)
        generateTreeData(treeData);
    }, [treeData])

    let items: MenuProps['items'] = []
    let manageitems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <ApplyPermission/>
            )
        },
        {
            key: '2',
            label: (
                <CreateTemplate/>
            )
        }
    ]
    if (item.type !== '教学资源') {
        manageitems.push({
            key: '3', label: (<ModalFormUseForm
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
                otherContent={
                    <TableWithPagination
                        name={'CreditsTypeTable'}
                        API={async (data: any) => {
                            return Api.getTypeCredits({pId: pId, data: data})
                        }}
                        columns={creditsTypeColumn}
                    />
                }
            />)
        })
    }
    if (selectedMenuKey && keyIdMap[selectedMenuKey] && keyIdMap[selectedMenuKey].isLeaf) {
        items = [
            {
                key: '1',
                label: (
                    <UserContentScore pId={pId}/>
                )
            },
            {
                key: '2',
                label: (
                    <ModalContentSubmit
                        pId={pId} // @ts-ignore
                        cId={keyIdMap[selectedMenuKey].key}
                        username={userinfo?.username}//这里可能会替换成userid
                    />
                )
            },
            {
                key: '3',
                label: (
                    // @ts-ignore
                    <Score pId={pId} cId={keyIdMap[selectedMenuKey].key}/>
                )
            },
            {
                key: '4',
                label: (
                    <Button type={'ghost'} onClick={() => {
                        // @ts-ignore
                        Api.getRefresh({pId: pId, cId: keyIdMap[selectedMenuKey].key})
                    }}>更新我的</Button>
                )
            }
        ]
        if (item.type !== '教学资源') {
            manageitems.push({
                key: '', label: (<ModalFormUseForm
                    title={'添加提交任务'}
                    btnName={'添加提交'}
                    btnType={'text'}
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
                />)
            })
            manageitems.push({
                key: '5', label: (<Button type={'text'} onClick={() => {
                    Api.getRefreshAll({pId: pId, cId: keyIdMap[selectedMenuKey].key})
                }}>更新全部</Button>)
            })
        }
    }

    return (
        <div style={{minWidth: 800}}>
            <div style={{textAlign: "left", marginBottom: 12, marginLeft: 6}}>
                <Space size={24}>
                    <Image
                        preview={false}
                        width={80}
                        height={45}
                        src={item.url}
                        alt={item.name}
                    />
                    <Space direction="vertical" size={0}>
                        <Space>
                            <Title level={4} style={{margin: 0}}>{item.name}</Title>
                            {
                                item.tag.split(',').map((t: string) => {
                                    for (const tag of tagOptions)
                                        if (tag.key === t)
                                            return (<Tag color="#CBA265">{tag.value}</Tag>)
                                })
                            }
                        </Space>
                    </Space>
                </Space>
                <div style={{float: "right", marginRight: 6}}>
                    <Space size={12}>
                        {/*还有一些待传的参数*/}
                        {
                            selectedMenuKey && keyIdMap[selectedMenuKey] && keyIdMap[selectedMenuKey].isLeaf && item.type!=='教学资源'&&(
                                <>
                                    <Dropdown
                                        menu={{items}}
                                    >
                                        <Button type="text" size={"large"}>
                                            <Space>
                                                <div style={{marginTop: -10}}>
                                                    菜单
                                                </div>
                                                <DownOutlined style={{fontSize: 10, marginBottom: 20}}/>
                                            </Space>
                                        </Button>
                                    </Dropdown>
                                </>
                            )
                        }
                    </Space>
                </div>
            </div>
            <Layout style={{minHeight: 600}}>
                <Sider width={250} style={{background: '#f0f2f5'}}>
                    {
                        treeData !== undefined && <Tree
                            showLine
                            autoExpandParent={true}
                            switcherIcon={<DownOutlined/>}
                            defaultExpandedKeys={selectedMenuKey?[selectedMenuKey]:[]}
                            onSelect={handleMenuSelect}
                            // selectedKeys={selectedMenuKey !== null ? [selectedMenuKey] : []}
                            treeData={treeData}
                            style={{background: '#f0f2f5', paddingTop: 8, paddingLeft: 4, paddingBottom: 8}}
                        />
                    }

                    <div style={{left: '0%', width: '100px'}}>
                        <Dropdown
                            menu={{items: manageitems}}
                        >
                            <Button type="text" size={"large"}>
                                <Space>
                                    <div style={{marginTop: -10}}>
                                        管理项目
                                    </div>
                                    <DownOutlined style={{fontSize: 10, marginBottom: 20}}/>
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                </Sider>
                <Layout>
                    <Content style={{padding: '24px'}}>
                        {
                            selectedMenuKey ? selectedMenuKey in IdConMap &&
                                <ContentPlay url={IdConMap[selectedMenuKey].file_id?.url}
                                             type={IdConMap[selectedMenuKey].file_type} pId={pId}
                                             content={IdConMap[selectedMenuKey].content}
                                             cId={selectedMenuKey}/>
                                : (
                                    <div
                                        style={{textAlign: "left"}}
                                    >
                                    </div>
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
                props.type === "video" && (
                    <PlayerWithDuration
                        url={props.url}
                        pId={props.pId}
                        cId={props.cId}
                    />
                )
            }
            {
                (props.type === "office_word" || props.type === "office_ppt") && (
                    <iframe
                        title="demo.docx"
                        src={"https://view.xdocin.com/view?src=" + props.url}
                        width="100%"
                        height="720px"
                    />
                )
            }
            {
                props.type === 'application/pdf' && (
                    <iframe
                        title="demo.docx"
                        src={props.url}
                        width="100%"
                        height="720px"
                    />
                )
            }
            {
                props.content && (
                    <div style={{textAlign: "left"}}>
                        <ReactMarkdown children={props.content}/>
                    </div>
                )
            }
        </>
    )
}
export default ProjectInfo;
