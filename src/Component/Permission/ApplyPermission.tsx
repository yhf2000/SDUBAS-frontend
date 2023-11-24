import editableInput from "../User/EditableInput";
import {Button, Dropdown, MenuProps, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {TemplateColumns} from "../../Config/Resource/columns";
import {useDispatch} from "../../Redux/Store";


//申请权限
const ApplyPermission = (props:any)=>{
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return(
            <>
                <Button type={'text'} onClick={()=>setVisible(true)}>申请角色</Button>
                <Modal
                    open={visible}
                    onCancel={()=>setVisible(false)}
                    footer={null}
                >
                    <TableWithPagination
                        name={'TemplateRolesTable'}
                        API={async (data:any)=>{return Api.getTemplates({data:{...data,service_type:props.service_type,service_id: props.service_id}})}}
                        columns={TemplateColumns({pId:props.service_id,addTableVersion:AddTableVersion})}
                    />
                </Modal>
            </>
    );
}


export default ApplyPermission;