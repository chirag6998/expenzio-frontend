import { Col, Row } from "antd";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Row className="mt-28">
            <Col span={13} offset={6} className="pb-14 pt-14 items-center"
                style={{
                    borderRadius: '10px',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    minHeight: '600px',
                    backgroundColor: "white",
                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
                }}>
                {children}
            </Col>
        </Row>
    )
}

export default Layout;