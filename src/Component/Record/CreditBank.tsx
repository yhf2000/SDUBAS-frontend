import TableWithPagination, {TableWithPaginationProps} from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, Image} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";

const CreditBank = () => {
    const [t] = useTranslation();
    return (
        <div>
            <TableWithPagination
                type={'0'}
                API={async (data:any)=>{return Api.getProList({data:{...data}})}}
                columns={[
                    {
                        title: 'proImage',
                        dataIndex: 'proImage',
                        key: 'proImage',
                        render: (imgUrl: string,row:any) => {
                            return (
                                <Link to={`/c/project-info/${row.pId}`}>
                                    <Image src={imgUrl} alt={'img'} width={150} height='auto'/>
                                </Link>
                            );
                        }
                    },
                    {
                        title: '项目',
                        dataIndex: 'title',
                        key: 'title',
                        render:(title:string,row:any)=>{
                            return(
                                <Link to={`/c/project-info/${row.pId}`}>
                                    {title}
                                </Link>
                            )
                        }
                    },
                    {
                        title: '学分',
                        dataIndex: 'credit',
                        key: 'credit',
                    },
                    {
                        title: '日期',
                        dataIndex: 'date',
                        key: 'date'
                    },
                ]}
            />
        </div>
    );
}


export default CreditBank;