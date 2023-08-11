import {Button, Form, Input, message, Select, Space} from "antd";
import {useEffect, useState} from "react";

interface DataNode {
    id: string;
    name: string;
    faId: string | undefined;
    weight: string;
}

const ItemTreeData = (props: any) => {
    let initState: DataNode[] = [];
    useEffect(()=>{
        if (props.value!==undefined)
            for (let i = 0; i < props.value.length; i++) {
                const newNode: DataNode = {
                    id: props.value[i].id,
                    name: props.value[i].name,
                    faId: props.value[i].faId,
                    weight: props.value[i].weight,
                }
                initState.push(newNode);
            }
    },[])
    const [treeData, setTreeData] = useState<DataNode[]>(initState);
    const generateNodeId = (): string => {
        return `node-${Math.random().toString(36).substring(7)}`;
    };

    const handleAddNode = () => {
        const newNode: DataNode = {
            id: generateNodeId(),
            name: "",
            faId: undefined,
            weight: "",
        };
        setTreeData((prevTreeData) => [...prevTreeData, newNode]);
    };

    const handleRemoveNode = (id: string) => {
        const isParentNode = treeData.some((node) => node.faId === id);
        if (isParentNode) {
            message.error("请检查依赖关系");
            return false;
        }
        setTreeData((prevTreeData) => prevTreeData.filter((node) => node.id !== id));
        return true;
    };

    const handleNodeTitleChange = (index: number, value: string) => {
        let newTree = treeData.slice();
        newTree[index] = {...newTree[index], name: value}
        setTreeData(newTree);
    };
    const handleNodeWeightChange = (index: number, value: string) => {
        let newTree = treeData.slice();
        newTree[index] = {...newTree[index], weight: value}
        setTreeData(newTree);
    }

    const handleNodeFaIdChange = (index: number, value: string) => {
        let newTree = treeData.slice();
        newTree[index] = {...newTree[index], faId: value};
        setTreeData(newTree);
    };
    return (
        <>
            <div>上传项目内容</div>
            <Form.List name="contents">
                {(fields, {add, remove}) => (
                        <>
                            {fields.map((field) => (
                                <Space key={field.name} style={{marginBottom: 8}}>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "name"]}
                                        key={field.name + 'title'}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="Node title"
                                            onChange={(e) =>
                                                handleNodeTitleChange(field.name, e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "faId"]}
                                        key={field.name + 'faId'}
                                        noStyle
                                    >
                                        <Select
                                            style={{width: 120}}
                                            onChange={(value) =>
                                                handleNodeFaIdChange(field.name, value)
                                            }
                                        >
                                            <Select.Option key={null} value={undefined}>
                                                None
                                            </Select.Option>
                                            {treeData
                                                .filter((n) => n.id !== treeData[field.name].id)
                                                .map((n) => (
                                                    <Select.Option key={n.id} value={n.id}>
                                                        {n.name}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'id']}
                                        key={field.name + 'id'}
                                        noStyle
                                    >
                                        <Input type={'hidden'}/>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'weight']}
                                        key={field.name + 'weight'}
                                        noStyle
                                    >
                                        <Input placeholder="Node weight"
                                               onChange={(e) =>
                                                   handleNodeWeightChange(field.name, e.target.value)
                                               }/>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'type']}
                                        key={field.name + 'type'}
                                        noStyle
                                    >
                                        <Select style={{width: 60}}>
                                            {props.options.map((option: { key: string, value: string }) => {
                                                return (
                                                    <Select.Option
                                                        key={option.key}
                                                        value={option.key}>
                                                        {option.value}
                                                    </Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Button
                                        type={'link'}
                                        style={{width: 50}}
                                        onClick={() => {
                                            if (handleRemoveNode(treeData[field.name].id)) remove(field.name)
                                        }}>
                                        Remove
                                    </Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => {
                                    handleAddNode();
                                    add();
                                }} style={{marginBottom: 8}}>
                                    Add Node
                                </Button>
                            </Form.Item>
                        </>
                    )
                }
            </Form.List>
        </>
    );
};

export default ItemTreeData;