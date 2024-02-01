import React from 'react';
import { Select, Space } from 'antd';
import { DropDownParams } from '../types/types';

function DropDown({ options, onChange }: DropDownParams) {

    let selectOptions = options.map((option: string) => {
        return { value: option, label: option }
    })
    return (
        <Space wrap>
            <Select
                defaultValue={options[0]}
                style={{ width: 120 }}
                onChange={(value) => onChange(value)}
                options={selectOptions}
            />
        </Space>
    )
};

export default DropDown;