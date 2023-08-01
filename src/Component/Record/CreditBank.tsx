import TableWithPagination, {TableWithPaginationProps} from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Image} from "antd";

const CreditBank = () => {
    return (
        <div>
            <TableWithPagination
                API={"getCreditBank"}
                columns={[
                    {
                        title: 'proImage',
                        dataIndex: 'proImage',
                        key: 'proImage',
                        render: (imgUrl: string) => {
                            return (
                                <center>
                                    <Image src={imgUrl} alt={'img'} width={150} height='auto'/>
                                </center>
                            );
                        }
                    },
                    {
                        title:'项目',
                        dataIndex:'title',
                        key:'title',
                    },
                    {
                        title:'项目内容',
                        dataIndex: 'content',
                        key:'content'
                    },
                    {
                        title:'完成情况',
                        dataIndex:'credit',
                        key:'credit',
                    },
                    {
                        title:'成绩',
                        dataIndex: 'score',
                        key: 'score'
                    },
                    {
                        title:'日期',
                        dataIndex: 'date',
                        key:'date'
                    }
                ]}
            />
        </div>
    );
}


export default CreditBank;