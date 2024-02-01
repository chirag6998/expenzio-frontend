import { Col, Row } from "antd";
import React from "react";

function ErrorComponent({ children }: { children: string }) {

    return (
        <Row>
            <Col span={8} offset={8} className="text-red-500">{children}</Col>
        </Row>
    )
}

export default ErrorComponent;