import {Card, Form, Input, List, message, Select, Space, Tag, Typography} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import ProCard from "../../Component/Project/ProCard";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import { useNavigate} from "react-router-dom";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import {Api} from "../../API/api";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";
import {arraytostr} from "../../Utils/arraytostr";

//
// const initData=[
//     {
//         'id':'3',
//         'name':'操作系统',
//         'credit':'5',
//         'progress':'3',
//         'totalProjects':'10',
//         'date':'2023-8-11',
//         'proImage':'https://www.neea.edu.cn/res/Home/1711/171116582.jpg',
//         'score':undefined
//     }
// ]
const Course = () => {
    const navigate = useNavigate();
    const handleClick = (item:any)=>{
        navigate(`/c/project-info/${item.id}`)
    }
    return (
        <>
            <Card
                title={'课程平台'}
                headStyle={{textAlign:'left'}}
                style={{minWidth:'1500px'}}
                extra={
                    <ModalFormUseForm
                        title={'新建课程'}
                        type={'create'}
                        btnName={'新建课程'}
                        TableName={'CourseTable'}
                        subForm={[
                            {
                                component: ProjectForm1,
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
                                <Form.Item label={'标签'} name={'tag'} >
                                    <Select onChange={onFinish} mode={'multiple'} style={{width:120}}>
                                        <Select.Option value={'1'}>国家</Select.Option>
                                        <Select.Option value={'2'}>省级</Select.Option>
                                        <Select.Option value={'3'}>校级</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label={"搜索"} name={"title"}>
                                    <Input onPressEnter={() => {
                                        onFinish()
                                    }}/>
                                </Form.Item>
                            </Space>
                        );
                    }}
                    useFormBtn={false}
                    defaultPageSize={5}
                    renderItem={(item: any) => {
                        return (
                            <List.Item key={item.name}>
                                <ProCard item={item} onClick={() => handleClick(item)} TableName={'CourseTable'}/>
                            </List.Item>
                        )
                    }}
                />
            </Card>
        </>
    );
}

export default Course;