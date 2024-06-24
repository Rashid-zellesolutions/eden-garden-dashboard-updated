import React, { useEffect, useState } from 'react'
import { Space, Table, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JuicesDrinks = () => {

    const [juicesDrinks, setJuicesDrinks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAppetizers = async() => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/JuicesDrinks/get-juices-drinks')
                console.log(response.data.juiceDrinkObj)
                setJuicesDrinks(response.data.juiceDrinkObj);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        }
        fetchAppetizers()
    }, [])

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];

      const deleteJuiceDrink = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8080/api/v1/JuicesDrinks/delete-juices-drinks/${id}`);
          console.log(response.status);
          if (response.status === 200) {
           alert("Juice Drinks Deleted");
            // Update the state to remove the deleted item
            setJuicesDrinks(juicesDrinks.filter(item => item._id !== id));
          }
        } catch (error) {
          console.error("Error Deleting Data", error);
        }
      };
      // console.log(appetizerData[0]._id)
      const handleMenuClick = (record, key) => {
        if (key === 'edit') {
          navigate(`/update-juice-drink/${record._id}`, { state: { record } });
          console.log(record)
        } else if (key === 'delete') {
          deleteJuiceDrink(record._id);
        }
      };
    const menu = (record) => (
        <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>

            <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
                Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<MdDeleteOutline style={{ fontSize: "18px" }} />}>
                Delete
            </Menu.Item>
        </Menu>
    );

const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => <img src={juicesDrinks.juiceDrinkImagePath} height={25} width={25} alt='img' />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'PacFor',
      key: 'pacfor',
      dataIndex: 'pacfor',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
            <div style={{
                boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px"
            }}>

                <EllipsisOutlined size={45} />
            </div>
        </Dropdown>
      ),
    },
  ];
  
  const data = juicesDrinks.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
    pacfor: item.pacFor,
    img: item.img
  }));



  return (
    <div style={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
        flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
        padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
    }}>
        <div style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}>
            <span>juices Drinks</span>
        </div>
        <div style={{width: '100%'}}>
            <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default JuicesDrinks