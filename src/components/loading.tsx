import React from 'react';
import { Col, Row, Spin } from 'antd';

function Loading() {
    return (
        <Row>
            <Col span={10} offset={12} style={{ top: 300 }}><Spin size='large' /></Col>
        </Row>
    )
}

export default Loading;