import {Button, Form, Input, message, Modal, Radio, Select} from "antd";
import {useState} from "react";
import {Api} from "../../API/api";
import TableWithPagination from "../Common/Table/TableWithPagination";
import ItemPermission from "../Permission/Form/Item/ItemPermission";

const CreateTemplate = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button type={'text'} onClick={()=>{setVisible(true)}}>创建模板</Button>
            <Modal
                open={visible}
                footer={null}
                onCancel={()=>{setVisible(false)}}
                title={'创建模板'}
            >
                <Form
                    onFinish={async (data: any) => {
                        Api.CreateTemplate(data)
                            .then(()=>{
                                setVisible(false);
                                message.success('提交成功')
                            })
                    }}
                >
                    <Form.Item name={'template_name'} label={'模板角色名称'}>
                        <Input />
                    </Form.Item>
                    <ItemPermission name={'添加权限'} service_type={'7'} label={'添加权限'}/>
                    <Form.Item label={'是否时间限制'} name={'time_limit'}>
                        <Radio.Group>
                            <Radio value={0}>是</Radio>
                            <Radio value={1}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={'submit'} type={'primary'}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                <TableWithPagination
                    name={'TemplateRolesTable'}
                    API={async (data:any)=>{return Api.getTemplates({data:data})}}
                    useList={true}
                    renderItem={(
                        <>
                        </>
                    )}
                />
            </Modal>
        </>
    )
}

export default CreateTemplate;