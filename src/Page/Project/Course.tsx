import {Card, Form, Input, List, message, Space, Tag, Typography} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {useTranslation} from "react-i18next";
import ProCard from "../../Component/Project/ProCard";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import {Link, useNavigate} from "react-router-dom";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import {useDispatch} from "../../Redux/Store";
import {Api} from "../../API/api";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";

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
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (item:any)=>{
        navigate(`/c/project-info/${item.id}`)
    }
    return (
        <>
            <Card
                title={t('Course')}
                extra={
                    <ModalFormUseForm
                        titile={'新建课程'}
                        type={'create'}
                        btnName={'新建课程'}
                        TableName={'CourseTable'}
                        subForm={[
                            {
                                component: ProjectForm1,
                                label: "",
                            },
                            {
                                component:ProjectForm2,
                                label:""
                            }
                        ]}
                        dataSubmitter={(value:any)=>{
                            return Api.newPro({data:value});
                        }}
                    />}
            >
                <TableWithPagination
                    name={'CourseTable'}
                    useList={true}
                    API={async (data:any)=>{return Api.getProList({data:{...data}})}}
                    // initData={initData}
                    getForm={(onFinish: any) => {
                        return (
                            <Space size={30}>
                                <Form.Item label={t("Search")} name={"title"}>
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