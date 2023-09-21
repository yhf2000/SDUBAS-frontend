import {Button, Modal, Tabs} from "antd";
import {useEffect, useState} from "react";
import {Api} from "../../API/api";
import Assignment from "./Form/Assignment";
import {useSSR} from "react-i18next";

const AssignRole = (props: any) => {
    const [roles, setRoles] = useState([]);//保存返回的角色信息
    const [visible,setVisible] = useState(false);
    // useEffect(()=>{
    //     Api.getRole().then((res:any)=>{
    //         setRoles(res);
    //     })
    // },[])需要API
    return (
        <>
            <Button type={props.btnType||'link'} onClick={()=>(setVisible(true))}>分配</Button>
            <Modal
                open={visible}
                onCancel={()=>{setVisible(false)}}
            >
                <Tabs
                    items={[
                        {
                            label: '助教',
                            key: '1',
                            children: <Assignment roleId={1}/>
                        }
                    ]}
                />
            </Modal>
        </>
    )
}

export default AssignRole;