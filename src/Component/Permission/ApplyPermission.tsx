import editableInput from "../User/EditableInput";
import {Button, Dropdown, MenuProps, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";


//申请权限
const ApplyPermission = (props:any)=>{
    const [visible,setVisible] = useState(false);
    return(
            <>
                <Button type={'text'} onClick={()=>setVisible(true)}>申请</Button>
                <Modal
                    open={visible}
                    onCancel={()=>setVisible(false)}
                    footer={null}
                >
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
    );
}


export default ApplyPermission;