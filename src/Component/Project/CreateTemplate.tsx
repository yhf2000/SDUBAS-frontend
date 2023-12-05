import {Button, Form, Input, message, Modal, Radio, Select} from "antd";
import {useState} from "react";
import {Api} from "../../API/api";
import TableWithPagination from "../Common/Table/TableWithPagination";
import ItemPermission from "../Permission/Form/Item/ItemPermission";
import {useDispatch} from "../../Redux/Store";

const CreateTemplate = (props: any) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <>
            <Button type={'text'} onClick={() => {
                setVisible(true)
            }}>创建模板</Button>
            <Modal
                open={visible}
                footer={null}
                onCancel={() => {
                    setVisible(false)
                }}
                title={'创建模板'}
            >
                <Form
                    onFinish={async (data: any) => {
                        Api.createTemplates({
                            data: data,
                            service_type: props.service_type,
                            service_id: props.service_id
                        })
                            .then(() => {
                                setVisible(false);
                                message.success('提交成功')
                                AddTableVersion('TemplateRolesTable')
                            })
                            .catch(()=>{})
                    }}
                >
                    <Form.Item name={'role_name'} label={'模板角色名称'}>
                        <Input/>
                    </Form.Item>
                    <ItemPermission name={'privilege_list'} service_type={props.service_type} label={'添加权限'}/>
                    {/*<Form.Item label={'是否时间限制'} name={'time_limit'}>*/}
                    {/*    <Radio.Group>*/}
                    {/*        <Radio value={0}>是</Radio>*/}
                    {/*        <Radio value={1}>否</Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Form.Item>*/}
                    <Form.Item>
                        <Button htmlType={'submit'} type={'primary'}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                <TableWithPagination
                    name={'TemplateRolesTable'}
                    API={async (data: any) => {
                        return Api.getTemplates({
                            data: {
                                ...data,
                                service_type: props.service_type,
                                service_id: props.service_id
                            }
                        })
                    }}
                    columns={[
                        {
                            title: '模板名称',
                            dataIndex: 'role_name',
                            key: 'name'
                        },
                        {
                            title: '模板权限',
                            dataIndex: 'privilege_list',
                            key: 'permission',
                            render:(list:any)=>{
                                let str = ''
                                for(let i = 0;i < list.length;i++)
                                    if(i != list.length-1)
                                        str += list[i]+','
                                    else str += list[i]
                                return(<span>{str}</span>)
                            }
                        },
                    ]}
                />
            </Modal>
        </>
    )
}

export default CreateTemplate;