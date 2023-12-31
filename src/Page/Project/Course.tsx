import {Card, Form, Input, List, message, Select, Space, Tag, Typography} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import ProCard from "../../Component/Project/ProCard";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import { useNavigate} from "react-router-dom";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import {Api} from "../../API/api";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";
import {arraytostr} from "../../Utils/arraytostr";
import {tagOptions} from "../../Config/Project/data";
import {useEffect} from "react";
import {useDispatch} from "../../Redux/Store";

const Course = () => {
    const navigate = useNavigate();
    const handleClick = (item:any)=>{
        navigate(`/c/project-info/${item.id}`)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        Api.getUserPermission({data: {service_type: 7}})
            .then((res: any) => {
                    dispatch({type:'setUserPermission',service_type:7,data:res.map((e: any) => e.label)})
                }
            ).catch(()=>{})
    }, [])
    return (
        <div className={"table-container"}>
            <Card
                title={'课程平台'}
                headStyle={{textAlign:'left'}}
                style={{minWidth:'1000px'}}
                extra={
                    <ModalFormUseForm
                        title={'新建课程'}
                        type={'create'}
                        btnName={'新建课程'}
                        TableName={'CourseTable'}
                        subForm={[
                            {
                                component: ProjectForm1({type:'课程'}),
                                label: "",
                            },
                            {
                                component:ProjectForm2({service_type:7}),
                                label:""
                            }
                        ]}
                        dataSubmitter={(value:any)=>{
                            value.tag = arraytostr(value.tag);
                            // console.log(value)
                            return Api.newPro({data:value});
                        }}
                    />}
            >
                <TableWithPagination
                    name={'CourseTable'}
                    useList={true}
                    API={async (data:any)=>{
                        if(data.tag)
                            data.tag = arraytostr(data.tag);
                        else data.tag = ''
                        return Api.getProListByType({data:{projectType:'课程',...data}})}}
                    // initData={initData}
                    getForm={(onFinish: any) => {
                        return (
                            <Space size={30}>
                                <Form.Item label={'标签'} name={'tag'}>
                                    <Select onChange={onFinish} mode={'multiple'} style={{width: 120,height:'30px'}}  maxTagCount='responsive'>
                                        {tagOptions.map((option:any)=>{
                                            return(<Select.Option key={option.key} value={option.value}>{option.value}</Select.Option>)
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item label={"名称"} name={"project_name"}>
                                    <Input onPressEnter={onFinish}/>
                                </Form.Item>
                            </Space>
                        );
                    }}
                    renderItem={(item: any) => {
                        return (
                            <List.Item key={item.name}>
                                <ProCard item={item} onClick={() => handleClick(item)} TableName={'CourseTable'}/>
                            </List.Item>
                        )
                    }}
                />
            </Card>
        </div>
    );
}

export default Course;