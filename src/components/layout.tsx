import { Col, Row } from "antd";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Row className="mt-28 text-white">
            <Col span={13} offset={6} className="pb-14 pt-14 items-center"
                style={{
                    borderRadius: '10px',
                    border: '1px solid white',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    minHeight: '600px'
                }}>
                {children}
            </Col>
        </Row>
    )
}

export default Layout;