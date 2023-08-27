import React from 'react';
import ReactDOM from 'react-dom';
import TagSwitchCard from '../Component/Common/pageCard';

const Items = [
    {
        key: '0',
        label: '通知',
    },
    {
        key: '1',
        label: '学分银行',
    },
    {
        key: '2',
        label: '个人档案',
    },
    {
        key: '3',
        label: "资金档案",
    },
    {
        key: '4',
        label: "资源档案",
    }
]
const Records: React.FC = () => {
    return (
        <div>
            <TagSwitchCard data={Items}/>
        </div>
    );
};

export default Records;