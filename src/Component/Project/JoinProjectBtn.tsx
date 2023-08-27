import {Dispatch, useState} from "react";
import {connect} from "react-redux";
import {Button, message, Popconfirm} from "antd";
import {Api} from "../../API/api";
import {useDispatch} from "../../Redux/Store";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const JoinProjectBtn = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch();
    const addTableVersion = (name:string)=>{
        dispatch({type: "addTableVersion", name: name});
    }
    return (
        <>
            <Popconfirm
                title={`你确定要申请加入${props.projectName}吗？`}
                open={visible}
                onConfirm={()=>{
                    Api.joinGroupApply({pId: props.pId}).then(()=>{
                        setVisible(false);
                        setConfirmLoading(false);
                        addTableVersion("ProjectList")
                        message.success("申请成功");
                    }).catch((error:any)=>{
                        message.error(error);
                    })
                }}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={()=>{
                    setVisible(false);
                }}
            >
                <Button type="link" onClick={()=>{
                    setVisible(true);
                }}>
                    加入
                </Button>
            </Popconfirm>
        </>
    )
}

export default JoinProjectBtn;
