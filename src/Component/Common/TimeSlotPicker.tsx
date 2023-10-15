import {useEffect, useState} from "react";
import {Checkbox, message} from "antd";

//传入14:00类似这样的字符串
const TimeSlotPicker = (props: any) => {
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
    const [disabled, setDisabled] = useState<number[]>([]);
    const totalSlots = (props.endTime - props.startTime) * 2;//0.5小时的区间数
    const {value,onChange} = props;
    //判断是否预定
    const isSlotBooked = (slotIndex: number) => {
        return props.booked.some((slotRange:any) => {
            const [startTime, endTime] = slotRange;
            return slotIndex * 0.5 + props.startTime >= startTime && (slotIndex + 1) * 0.5 + props.startTime <= endTime;
        });
    }

    //判断是否过期
    const isSlotDisabled = (slotIndex: number) => {
        const isPast = props.startTime + (slotIndex+1) * 0.5 <= new Date().getHours()+new Date().getMinutes()/60&&props.date === "0";
        return isPast || isSlotBooked(slotIndex);
    }
    //处理单个的选择
    const handleSlotChange = (slotIndex: number) => {
        //如果selectedSlots中含有则取消,以及取消其后面的
        if (selectedSlots.includes(slotIndex)) {
            //特判一下，如果是队首位置
            const selectedIndex = selectedSlots.indexOf(slotIndex);
            if(selectedIndex !== 0)
                setSelectedSlots(selectedSlots.slice(0, selectedIndex));
            else setSelectedSlots(selectedSlots.slice(1,selectedSlots.length))
            return;
        }
        //如果selected为空,则直接添加
        if (selectedSlots.length === 0) {
            // console.log('handle', slotIndex)
            setSelectedSlots([slotIndex]);
            return;
        } else if (selectedSlots.length === 1)//只有一个的话
        {
            const minVal = Math.min(selectedSlots[0], slotIndex);
            const maxVal = Math.max(selectedSlots[0], slotIndex);
            const newSelectedSlots = [];//之间的所有时间都被选择
            for (let i = minVal; i <= maxVal; i++)
            {
                if(disabled.includes(i))
                {
                    message.info('请选择连续的区间');
                    return ;
                }
                else
                    newSelectedSlots.push(i);
            }
            setSelectedSlots(newSelectedSlots);
            return;
        } else//有多个
        {
            const minVal = Math.min(...selectedSlots,slotIndex);
            const maxVal = Math.max(...selectedSlots,slotIndex);
            const newSelectedSlots = [];
            for(let i = minVal;i <= maxVal;i++)
            {
                if(disabled.includes(i))
                {
                    message.info('请选择连续的区间');
                    return ;
                }
                else
                    newSelectedSlots.push(i);
            }
            setSelectedSlots(newSelectedSlots);
            return;
        }
    }
    const renderTimeRange = (slotIndex: number) => {
        const current = slotIndex * 0.5 + props.startTime;
        if (current % 1 > 0)
            return (
                <>{Math.floor(current).toString().padStart(2, '0')}:30-{Math.floor(current + 1).toString().padStart(2,'0')}:00</>
            )
        else
            return (
                <>{current.toString().padStart(2,'0')}:00-{current.toString().padStart(2,'0')}:30</>
            )
    }
    useEffect(() => {
        let newDisabled = [];
        for (let i = 0; i < totalSlots; i++) {
            if (isSlotDisabled(i))
                newDisabled.push(i);
        }
        setDisabled(newDisabled);
    }, [])
    useEffect(()=>{
        const minVal = Math.min(...selectedSlots);
        const maxVal = Math.max(...selectedSlots)
        const newVal = [minVal*0.5+props.startTime,(maxVal+1)*0.5+props.startTime]
        onChange(newVal);
    },[setSelectedSlots,selectedSlots])
    return (
            <Checkbox.Group
                style={{display: 'flex', flexDirection: 'column',margin:'3px'}}
                value={selectedSlots}
            >
                {Array.from({length: totalSlots}, (_, index) => {
                    const slotIndex = index;
                    return (
                        <Checkbox
                            key={slotIndex}
                            value={slotIndex}
                            disabled={disabled.includes(slotIndex)}
                            onChange={() => handleSlotChange(slotIndex)}
                        >
                            {renderTimeRange(slotIndex)}
                            {isSlotBooked(slotIndex)?<span style={{marginLeft:'300px'}}>已被预约</span>
                            :isSlotDisabled(slotIndex)&&<span style={{marginLeft:'300px'}}>已过期</span>}
                        </Checkbox>
                    );
                })}
            </Checkbox.Group>
    );
}

export default TimeSlotPicker;