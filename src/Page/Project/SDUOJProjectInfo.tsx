import React, {useEffect, useState} from 'react';
import {Layout, Space, Tree, Image, Tag, Button, Menu, Dropdown, MenuProps, Divider} from 'antd';
import {DataNode} from 'antd/lib/tree';
import Title from "antd/es/typography/Title";
import {useLocation, useParams} from "react-router-dom";
import {tagOptions} from "../../Config/Project/data";
import ModalContentSubmit from "../../Component/Project/ModalContentSubmit";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import {Api} from "../../API/api";
import {buildTree} from "../../Utils/buildTree";
import ApplyPermission from "../../Component/Permission/ApplyPermission";
import UserContentScore from "./Info/UserContentScore";
import CreateTemplate from "../../Component/Project/CreateTemplate";
import {DownOutlined} from "@ant-design/icons";
import Approval from "../../Component/Permission/Approval";
import {SubmissionList} from "../../Component/SDUOJ/SubmissionList/SubmissionList";


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
    const {item, permissions} = location.state;
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
        Api.getOjContent({pId: pId})
            .then(async (data: any) => {
                console.log(data)
                data.map((d: any) => {
                    const {id} = d;
                    IdConMap[id] = d;
                })
                setSelectedMenuKey(data[0].id);
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
        if (treeData)
            generateTreeData(treeData);
    }, [treeData])
    let items: MenuProps['items'] = []
    let manageitems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <ApplyPermission service_type={7} service_id={item.id}/>
            )
        },
        {
            key: '2',
            label: (
                <CreateTemplate service_type={7} service_id={item.id}/>
            )
        },
        {
            key: '10',
            label: (
                <Approval pId={pId} service_type={7}/>
            )
        }
    ]
    if (selectedMenuKey && IdConMap[selectedMenuKey]) {
        if (permissions.some((e: any) => e === '项目提交'))
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
                        <SubmissionList />
                    )
                },
                {
                    key:'3',
                    label: '提交'
                }
            ]
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
                            selectedMenuKey &&IdConMap[selectedMenuKey] && item.type !== '教学资源' && (
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
                            defaultExpandedKeys={selectedMenuKey ? [selectedMenuKey] : []}
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

                    </Content>
                </Layout>
            </Layout>
        </div>
    )
        ;
};
export default ProjectInfo;
