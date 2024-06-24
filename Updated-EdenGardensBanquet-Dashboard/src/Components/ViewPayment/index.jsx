import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import NoData from "../../assets/noData.png";
import { Url } from "../../env";
import Loader from "../Loader";

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

function ViewPayment({ isModalOpen, handleCancel, PaymentId }) {
    const [payment, setPayment] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (PaymentId) {
            setLoading(true)
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${Url}Payment/SinglePayment/${PaymentId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    setPayment(result.paymentHistory.map(item => ({
                        ...item,
                        date: formatDate(item.date),
                        balance: parseFloat(item.balance.toFixed(2)).toLocaleString('en-US')
                    })));
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
                    console.log('error', error)
                });
        } else {
            return
        }
    }, [PaymentId])

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Reference',
            dataIndex: 'ref',
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
        },
        {
            title: 'Received',
            dataIndex: 'amount',
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
        },
        {
            title: 'Action',
            dataIndex: 'paidbyaction',
            render: (text, record) => (
                <Button type={"primary"} style={{ background: "#b78953" }}>Action</Button>
            ),
        },
    ];

    let locale = {
        emptyText: (
            <span>
                <img src={NoData} alt="" width={"60px"} />
                <p>No Payment </p>
            </span>
        )
    };

    return loading ? <Loader /> : (
        <Modal width={"50%"} title={"All Payment"} open={isModalOpen} onCancel={handleCancel} footer={[<>
            {/* <Button type='primary' onClick={handleCancel} style={{ background: "#b78953" }}>Cancel</Button> */}
        </>]}>

            <Table style={{ height: "30%" }} dataSource={payment} columns={columns} pagination={false} locale={locale} />
        </Modal>
    )
}

export default ViewPayment;
