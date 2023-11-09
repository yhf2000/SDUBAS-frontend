import {Button, Form, message} from "antd";
import ItemPassword from "../../Component/User/Form/Item/ItemPassword";
import {Api} from "../../API/api";
import {useNavigate, useParams} from "react-router-dom";
import Title from "antd/es/typography/Title";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import {sha256} from "js-sha256";

const NewPwd = () =>{
    const {token} = useParams();
    const navigate = useNavigate();
    const userName = useSelector((state:IState)=>state.UserReducer.userInfo?.username)
    return(
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Form
                title={'设置新密码'}
                autoFocus
                onFinish={(data:any)=>{
                    data.password = sha256(data.password+userName)
                    Api.setPass({token:token,data:data}).then(
                        (res:any)=>{
                            message.success('设置成功');
                            navigate('/c/login',{replace:true});
                        }
                    ).catch(()=>{})
                }}
                layout="vertical"
                // labelCol={{span: 4}}
                // wrapperCol={{span: 8}}
                style={{width:'400px'}}
            >
                <Title level={4}>重设密码</Title>
                <ItemPassword newpass={true}/>
                <Form.Item>
                    <Button type={'primary'} htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NewPwd;