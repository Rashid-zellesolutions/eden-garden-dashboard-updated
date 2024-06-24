import React, { useState } from 'react';
import { Table } from 'antd';
const DataTable = ({ data }) => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Color',
            dataIndex: 'color',
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
        },
    ];
    return <Table style={{ width: "100%" }} pagination={false} columns={columns} dataSource={data} />;
};
export default DataTable;