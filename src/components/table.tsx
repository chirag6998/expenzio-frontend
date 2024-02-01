import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Tag } from '../types/types';
import ButtonComponent from './button';

interface DataType {
  key: string;
  name: string;
  frequency: string;
}

function TableComponent({ tableData }: { tableData: Tag[] }) {

  const columns: ColumnsType<DataType> = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>
    },
    {
      title: 'FREQUENCY',
      dataIndex: 'frequency',
      key: 'frequency',
      render: (text) => <div>{text}</div>
    },
    {
      title: 'DELETE',
      dataIndex: 'delete',
      key: 'delete',
      render: (text) => <ButtonComponent type="default" size="small">DELETE</ButtonComponent>
    }
  ]

  let data = tableData.map((tag) => {
    return { key: tag.name, name: tag.name, frequency: tag.frequency }
  })
  return (
    <Table pagination={false} columns={columns} dataSource={data} locale={{
      emptyText: 'No Data',
    }} />
  )
}

export default TableComponent;