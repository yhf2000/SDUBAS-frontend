import React, {useState} from 'react';
import {Button, Card, Col, Layout, Row, Space, Tree, Image, Tag} from 'antd';
import {DataNode} from 'antd/lib/tree';
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";

const {Sider, Content} = Layout;

const treeData: DataNode[] = [
    {
        title: '第一章 时间复杂度基础',
        key: '0',
        children: [
            {
                title: '第一节 渐进时间复杂度',
                key: '0-0',
                children: [
                    {
                        title: '课程',
                        key: '0-0-0',
                    },
                    {
                        title: '作业',
                        key: '0-0-1',
                    },
                    {
                        title: '课件',
                        key: '0-0-2',
                    },
                ],
            },
        ],
    },
];

const ProjectInfo: React.FC = () => {
    const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

    const handleMenuSelect = (selectedKeys: React.Key[], {node}: any) => {
        setSelectedMenuId(String(node.key));
    };

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
                        <Button>我的学习时长</Button>
                        <Button>评价课程</Button>
                        <Button type="primary">申请认证证书</Button>
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
                        selectedKeys={selectedMenuId !== null ? [selectedMenuId] : []}
                        treeData={treeData}
                        style={{background: '#f0f2f5', paddingTop: 8, paddingLeft: 4, paddingBottom: 8}}
                    />
                </Sider>
                <Layout>
                    <Content style={{padding: '24px'}}>
                        <div>当前选中的菜单ID: {selectedMenuId}</div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ProjectInfo;
