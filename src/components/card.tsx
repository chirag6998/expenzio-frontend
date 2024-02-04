import React from 'react';
import { Card, Space } from 'antd';
import ButtonComponent from './button';

function CardComponent({ data, title }: { data: any[], title: string}) {

    let button = <ButtonComponent type="default" size="small">EDIT</ButtonComponent>
    let renderedData = data.map((item: any) => <p key={item.tag}>{item.tag} - {item.amount}</p>)
    return (
        <Space direction="vertical" size={16}>
            <Card title={title} extra={button} style={{ width: 300, fontFamily: "" }}>
                {renderedData}
            </Card>
        </Space>
    )
}

export default CardComponent;