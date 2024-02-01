import React from 'react';
import { Alert, Space } from 'antd';
import { AlertComponentParams } from '../types/types';

function AlertComponent({ message, type }: AlertComponentParams) {
    return (
        <div className="fixed top-10" style={{ left: '42%' }}>
            <Space direction="vertical">
                <Alert message={message} type={type} showIcon closable banner />
            </Space>
        </div>
    )
}

export default AlertComponent;
