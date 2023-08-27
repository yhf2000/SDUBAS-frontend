import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {useTranslation} from "react-i18next";
import {
    Card,
    Form,
    Input,
    List,
    message,
    Space,
} from "antd";
import ProCard from "../../Component/Project/ProCard";
import {useNavigate} from "react-router-dom";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import {Api} from "../../API/api";
import {useMemo} from "react";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";
// import ProjectForm2 from "../Component/Project/Form/ProjectForm2";


// const initData=[{
//     'id':'1',
//     'name':'区块链实验',
//     'credit':'4',
//     'progress':'3',
//     'totalProjects':'5',
//     'date':'2023-8-11',
//     'proImage':'https://seopic.699pic.com/photo/40171/9735.jpg_wh1200.jpg',
//     'score':'95'
// }]

const Experiment = () => {
    const navigate = useNavigate();
    // useMemo
    function handleClick(item: any) {
        navigate(`/c/project-info/${item.id}`);
    }
    // console.log('there is ')
    return (
        <Card
            title={'Experiment'}
            extra={
                <ModalFormUseForm
                    titile={'新建实验'}
                    type={'create'}
                    btnName={'新建项目'}
                    TableName={'ExperimentMainTable'}
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
                    dataSubmitter={(value: any) => {
                        console.log('value:', value);
                        return Api.newPro({
                            data: value
                        });
                    }}
                />}
        >
            <TableWithPagination
                name={'ExperimentMainTable'}
                useList={true}
                API={async (data:any)=>{return Api.getProList({data:{...data}})}}
                // initData={initData}
                size={'small'}
                getForm={(onFinish: any) => {
                    return (
                        <Space size={30}>
                            <Form.Item label={"Search"} name={"title"}>
                                <Input onPressEnter={() => {
                                    onFinish()
                                }}/>
                            </Form.Item>
                        </Space>
                    );
                }}
                useFormBtn={false}
                defaultPageSize={12}
                renderItem={(item: any) => {
                    return (
                        <List.Item key={item.name}>
                            <ProCard item={item} onClick={() => handleClick(item)} TableName={'ExperimentMainTable'}/>
                        </List.Item>
                    )
                }}
            />
        </Card>
    );
}

export default Experiment;