import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Space} from "antd";
import moment from "moment";
import {CardTabListType} from "antd/es/card";
import {Api} from "../../API/api";
import ModalFormUseForm from "./Form/ModalFormUseForm";
import TimeSlotPicker from "./TimeSlotPicker";


interface Props {
    id: string;
    apply: boolean;
    start: number;
    end: number;
}

const today = new Date();
const tabList: CardTabListType[] = [];
for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    tabList.push({label: `${moment(date).format('MM-DD')}`, key: `${i}`});
}
//修改为用小时来计数
const ContinuousTimeGrid: React.FC<Props> = ({id, apply, start, end}) => {
    const [activeKey, setActiveKey] = useState('0')
    const [bookings, setBookings] = useState<[[number, number]]>([[0, 0]]);
    //使用时间转化为小时
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const currentTime = hour + minute / 60;

    // 计算总格子数（每个格子代表半小时，即30分钟）
    const totalSlots = (end - start) * 2;

    // 检查时间槽是否可预约
    const isBookable = (timeSlot: number): boolean => {
        // 检查时间槽是否已被预定
        for (const booking of bookings) {
            if (timeSlot + start >= booking[0] && timeSlot + 0.5 + start <= booking[1]) {
                return false;
            }
        }
        return true;
    };

    const onTabChange = (key: string) => {
        setActiveKey(key);
    }
    useEffect(() => {
        // console.log('activeKey',activeKey)
        Api.getResourceUse({rId: id,day:activeKey})
            .then((res: any) => {
                // console.log(res);
                setBookings(res);
            })
    }, [activeKey])
    return (
        <Card
            title={'资源预约情况'}
            tabList={tabList}
            activeTabKey={activeKey}
            onTabChange={onTabChange}
        >
            <div style={{display: 'flex', width: '100%'}}>
                {Array.from({length: totalSlots * 2 - 1}, (_, index) => {
                    if (index % 2 === 1) {
                        return (
                            <div
                                key={`separator-${index}`}
                                style={{
                                    borderLeft: '0.5px solid #E9E9E9',
                                }}
                            />
                        );
                    }

                    const slotIndex = Math.floor(index / 2);
                    const timeSlot = slotIndex * 0.5;
                    const isPast = timeSlot + 0.5 + start <= currentTime && activeKey == '0';
                    const isAvailable = isBookable(timeSlot);

                    let backgroundColor = 'white';
                    if (isPast) {
                        backgroundColor = 'gray';
                    } else if (!isAvailable) {
                        backgroundColor = 'green';
                    }

                    return (
                        <>
                            <div
                                key={`slot-${slotIndex}`}
                                style={{
                                    backgroundColor,
                                    width: `${100 / totalSlots}%`,
                                    aspectRatio: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            >
                                {/*<div*/}
                                {/*    style={{*/}
                                {/*        fontSize: 'auto',*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {slotIndex % 2 === 0 ? `${Math.floor(slotIndex / 2)}` : ''}*/}
                                {/*</div>*/}
                                <div style={{width: '100%', backgroundColor: '#E9E9E9'}}/>
                            </div>
                        </>
                    );
                })}
            </div>
            <div style={{display: "flex", width: '100%'}}>
                {
                    Array.from({length: totalSlots / 2 + 1}, (_, index) => {
                        return (
                            <div
                                key={`time-${index}`}
                                style={{
                                    marginBottom: '5px',
                                    fontSize: `${100 / totalSlots}%`,
                                    marginRight: `${105 / totalSlots * 1.5}%`
                                }}
                            >
                                {index + start}
                            </div>
                        )
                    })
                }
            </div>
            {
                apply && (
                    <>
                        <ModalFormUseForm
                            title={'预约'}
                            type={'create'}
                            btnName={'申请'}
                            btnType={'ghost'}
                            subForm={[
                                {
                                    component: (
                                        <>
                                            <Form.Item style={{display: 'none'}} name={'day'} initialValue={activeKey}>
                                            </Form.Item>
                                            <Form.Item name={'time_range'}>
                                                <TimeSlotPicker startTime={8} endTime={23} booked={bookings}
                                                                date={activeKey}/>
                                            </Form.Item>
                                        </>
                                    ),
                                    label: ''
                                }
                            ]}
                            dataSubmitter={(value: any) => {
                                // console.log('test',value)
                                return Api.applyResource({rId: id, data: value})
                            }}
                            afterSubmit={() => {
                                Api.getResourceUse({rId: id,day:activeKey})
                                    .then((res: any) => {
                                        setBookings(res);
                                    })
                            }}
                        />
                    </>
                )
            }
        </Card>
    );
};

export default ContinuousTimeGrid;