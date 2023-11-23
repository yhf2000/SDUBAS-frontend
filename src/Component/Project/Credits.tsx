import AddCreditByRole from "./Form/AddCreditByRole";
import {Api} from "../../API/api";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {creditsTypeColumn} from "../../Config/Project/columns";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import React from "react";

export const CreditsRole = (props: any) => {
    return (
        <ModalFormUseForm
            btnName={'学分认定'}
            btnType={'text'}
            title={'学分认定'}
            subForm={[
                {
                    component: AddCreditByRole({pId: props.pId}),
                    label: ''
                }
            ]}
            // dataLoader
            dataSubmitter={async (value: any) => {
                return Api.addProCredit({pId: props.pId, data: value})
            }}
            otherContent={
                <TableWithPagination
                    name={'CreditsTypeTable'}
                    API={async (data: any) => {
                        return Api.getTypeCredits({pId: props.pId, data: data})
                    }}
                    columns={creditsTypeColumn}
                />
            }
        />
    )
}