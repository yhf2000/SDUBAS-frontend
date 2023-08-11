import React, {useState} from 'react';
import {Button, Card, Space, Tabs} from 'antd';
import TableWithPagination from "./Table/TableWithPagination";
import {Api} from "../../API/api";
import ModalFormUseForm from "./Form/ModalFormUseForm";
// import './TagSwitchCard.css';
import {useNavigate} from "react-router-dom";
import Information from "../Record/Information";
import CreditBank from "../Record/CreditBank";
import FundProfile from "../Record/FundProfile";
import PersonalProfile from "../Record/PersonalProfile";
import ResourceProfile from "../Record/ResourceProfile";

// 组件代码...

interface CardData {
    key: string;
    label: string;
}

interface Props {
    data: CardData[];
}

const {TabPane} = Tabs;

const TagSwitchCard: React.FC<Props> = ({data}) => {
    const [activeLabel, setActiveLabel] = useState<string>(data[0].label);
    const handleTabChange = (label: string) => {
        setActiveLabel(label);
    };
    const navigate = useNavigate();
    return (
        <div>
            <Tabs activeKey={activeLabel} onChange={handleTabChange}
                  items={data.map((item: CardData) => {
                      return {
                          key: item.label,
                          label: item.label,
                      }
                  })}
            >
            </Tabs>
            {activeLabel === '通知' && <Information/>}
            {activeLabel === '学分银行' && <CreditBank/>}
            {activeLabel === '资金档案' && <FundProfile/>}
            {activeLabel === '个人档案' && <PersonalProfile/>}
            {activeLabel === '资源档案' && <ResourceProfile/>}
        </div>
    );
};

export default TagSwitchCard;