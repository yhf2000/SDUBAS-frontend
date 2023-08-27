import {Button, Form, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch} from "../../../Redux/Store";
import TableWithPagination from "../../Common/Table/TableWithPagination";
import {Api} from "../../../API/api";
import DeleteConfirm from "../../Common/DeleteConfirm";

const Assignment = (props: any) => {
    const dispatch = useDispatch();
    const addTableVersion = (name:string)=>{
        dispatch({type:'addTableVersion',name:name})
    }
    return (
        <>
            <Form
                onFinish={()=>{
                    //添加用户的Api
                    //tableVersion的变化
                }}
            >
                <Form.Item
                    name={'assign'}
                    label={'分配'}
                >
                    <TextArea placeholder={'格式为\'张三,李四\''}/>
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>添加</Button>
                </Form.Item>
            </Form>
            {/*<TableWithPagination*/}
            {/*    name={'Role'+props.roleId+'Users'}*/}
            {/*    Api={async (data:any)=>{return Api.getAssignment({data:data})}}*/}
            {/*    columns={[*/}
            {/*        {*/}
            {/*            title:'用户名',*/}
            {/*            key:'username',*/}
            {/*            dataIndex:'username'*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title:'删除',*/}
            {/*            key:'delete',*/}
            {/*            render:(_:any,row:any)=>{*/}
            {/*                return(*/}
            {/*                    <DeleteConfirm*/}
            {/*                        onConfirm={async ()=>{*/}
            {/*                            Api.deleteAssignment({data:row})*/}
            {/*                                .then(()=>{*/}
            {/*                                    addTableVersion('Role'+props.roleId+'Users');*/}
            {/*                                    message.success('删除成功')*/}
            {/*                                })*/}
            {/*                                .catch(()=>{})*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                )*/}
            {/*            }*/}
            {/*        }*/}
            {/*    ]}*/}
            {/*/>*/}
        </>
    )
}

export default Assignment;