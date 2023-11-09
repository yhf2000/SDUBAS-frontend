import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {Api} from "../../API/api";
import {CheckCircleTwoTone, CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";

const ValidButton = (props: any) => {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [res, setRes] = useState<boolean | undefined>(undefined)
    useEffect(() => {
        setRes(props.isPass);
    }, [props.isPass])
    const enterLoading = () => {
        setLoadings(true);
        Api.getValid({id: props.record.id})
            .then((data: any) => {
                setRes(data.data);
            }).catch(() => {
            setLoadings(false)
        })
    };
    return (
        <>
            {
                res === undefined && (
                    <Button
                        type="link"
                        onClick={() => enterLoading()}
                        loading={props.loading || loadings}
                    >
                        Click me!
                    </Button>
                )
            }
            {
                res === true && (
                    <Button icon={<CheckCircleTwoTone twoToneColor={"#52c41a"}/>} type={'ghost'} disabled={true}/>
                )
            }
            {
                res === false && (
                    <Button icon={<CloseCircleOutlined style={{color: 'red'}}/>} type={'ghost'} disabled={true}/>
                )
            }
        </>
    )
}
export default ValidButton;
