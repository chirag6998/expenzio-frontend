import React from 'react';
import { Switch } from 'antd';
import { SwitchParams } from '../types/types';

function SwitchComponent({ onChange }: SwitchParams) {

    return <Switch onChange={onChange} />
}

export default SwitchComponent;