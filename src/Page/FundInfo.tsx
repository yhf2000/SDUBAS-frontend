import {Button, Card} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import ModalFormUseForm from "../Component/Common/Form/ModalFormUseForm";
import AddBill from "../Component/Record/Form/AddBill";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import './FundInfo.css'
import {Api} from "../API/api";
const {Meta} = Card;
const FundInfo = () => {
    return (
        <>
            <Card title={'账目详情'}>
                <div className={'card-container'}>
                    <Card className={'card'}>
                        <Meta title="Note" description="This is the content of Card 1." />
                    </Card>
                    <Card className={'card'}>
                        <Meta title="Value" description="This is the content of Card 2." />
                    </Card>
                </div>
                <AddBill button={<Button type={"link"} size={'small'} style={{marginLeft:'1000px'}}>记账</Button>}/>
                <TableWithPagination
                    API={Api.getProfile}
                    columns={[
                        {
                            title:'收支',
                            dataIndex:'value',
                            key:'value'
                        },
                        {
                            title:'描述',
                            dataIndex: 'description',
                            key:'description'
                        },
                        {
                            title:'操作人',
                            dataIndex:'operator',
                            key:'operator'
                        },
                        {
                            title:'记录日期',
                            dataIndex: 'date',
                            key:'date'
                        },

                    ]}
                />
            </Card>
        </>
    )
}

export default FundInfo;
// .my-cards {
//     display: flex;
//     justify-content: center;
//     align-items: flex-start;
// }
//
// .my-card {
//     margin: 0 10px;
//     width: 300px;
// }