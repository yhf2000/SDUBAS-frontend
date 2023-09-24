import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import TableWithPagination from "../../../Component/Common/Table/TableWithPagination";
import {Api} from "../../../API/api";

const UserContentScore = (props:any)=>{
    const [visible,setVisible] = useState(false);
    const [totalScore,setTotalScore] = useState('');
    useEffect(()=>{
      Api.getProScore({pId:props.pId}).then((res:any)=>{
          setTotalScore(res);
      }).catch(()=>{})
    },[])
    return(
        <>
            <Button onClick={()=>setVisible(true)} type={'text'}>成绩查询</Button>
            <Modal
                open={visible}
                onCancel={()=>setVisible(false)}
                footer={null}
            >
                <span>项目成绩:{totalScore}</span>
                <TableWithPagination
                    API={async (data:any)=>{return Api.getUserCntsScore({pId:props.pId,data:data})}}
                    name={'CntsScoreTable'}
                    columns={[
                        {
                            title:'内容',
                            dataIndex:'content_name',
                            key:'name'
                        },
                        {
                            title:'成绩',
                            dataIndex: 'score',
                            key:'score'
                        }
                    ]}
                />
            </Modal>
        </>
    );
}

export default UserContentScore;