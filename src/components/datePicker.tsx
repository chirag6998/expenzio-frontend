import React from 'react';
import { DatePicker, Space } from 'antd';
import { DatePickerParams } from '../types/types';

const { RangePicker } = DatePicker;

function DatePickerComponent({ dates, setDates }: DatePickerParams) {

    return (
        <Space direction="vertical" size={12}>
            <RangePicker value={dates} onCalendarChange={(val) => {
                setDates(val);
            }} />
        </Space>
    )
}

export default DatePickerComponent;