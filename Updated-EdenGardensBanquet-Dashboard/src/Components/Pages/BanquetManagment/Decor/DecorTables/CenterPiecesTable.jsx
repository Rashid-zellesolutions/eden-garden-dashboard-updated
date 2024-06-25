import React, { useEffect, useState } from 'react'
import { Space, Table, Menu, Dropdown,Button } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../../InputField';
import SuccessPopup from '../../../../SuccessPopup';
import DeletePopup from '../../../../DeletePopup';
import { Url,Url2, hostUrl } from '../../../../../env';
import Loader from '../../../../Loader';

const CenterTable = () => {

  const [cpData, setCpData] = useState([]);
  const [isCpAddVisible, setCpAddVisible] = useState(false);
  const [cpFormData, setCpFormData] = useState({ name: '', cost: '', description: '', centerpieceImage: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleCloseSuccessPopup = () => {
    setSuccessPopupOpen(false)
  }

  const addCp = () => {
    setCpAddVisible(!isCpAddVisible);
  };

  const handleDeleteService = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${Url}CenterPieces/delete-centerpiece/${id}`);
      setCpData(cpData.filter(item => item._id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting food type", error);
      console.error('Failed to delete food type');
      setLoading(false);
    }
  };

  const handleCloseDeletePopup = () => {
    setDeleteModal(false);
    setDeleteData(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteData) {
      handleDeleteService(deleteData._id);
      handleCloseDeletePopup();
    }
  };

  const clearForm = () => {
    setCpFormData({name: '', cost: '', description: '', centerpieceImage: ''});
  };

  const handleCpSelectionChange = (e, section) => {
    const { name, value, files } = e.target;
    if (name === 'centerpieceImage') {
      setCpFormData({ ...cpFormData, [name]: files[0] });
      console.log(cpFormData)
    } else {
      setCpFormData({ ...cpFormData, [name]: value });
      console.log(cpFormData)
    }
  }

  const cpSelectionSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formDataToSend = new FormData();
      Object.keys(cpFormData).forEach(key => {
          formDataToSend.append(key, cpFormData[key]);
      });
      if (isEditing && currentRecord) {
        setLoading(true);
        console.log(currentRecord)
        const response = await axios.put(`${Url}CenterPieces/update-centerpiece/${currentRecord._id}`, cpFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Updated");
        console.log(response.data)
        setLoading(false);
      } else {
        setLoading(true);
        const response = await axios.post(`${Url}CenterPieces/add-centerpiece`, cpFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Added");
        console.log(response.data)
        setLoading(false);
      }
      setLoading(false);
  clearForm();
  setFormSubmitted(true);
  setCpAddVisible(false);
  setIsEditing(false);
  setCurrentRecord(null);
    



    } catch (error) {
      console.error("Error Adding Data", error);
    }

  }

  const navigate = useNavigate();
  const fetchCp = async() => {
    try {
      setLoading(true);
        const response = await axios.get(`${Url}CenterPieces/get-centerpiece-data`)
        console.log(response.data.centerpiece)
        setCpData(response.data.centerpiece);
        setLoading(false);
    } catch (error) {
        console.error("Error Fetching Data", error);
        setLoading(false);
    }
}
  useEffect(() => {
      fetchCp();
      if (formSubmitted) {
        fetchCp(); // Fetch data if formSubmitted is true
        setFormSubmitted(false); // Reset formSubmitted to false
      }
  }, [formSubmitted])

  useEffect(() => {
    if (isEditing && currentRecord) {
      setCpFormData({
        name: currentRecord.name,
        description: currentRecord.description,
        cost: currentRecord.cost,
        centerpieceImage: null,
      });
    }
  }, [isEditing, currentRecord]);

  const handleOpenDeletePopup = (record) => {
    setDeleteData(record);
    setDeleteModal(true);
  };

  // console.log(appetizerData[0]._id)
  const handleMenuClick = (record, key) => {
    if (key === 'edit') {
      setIsEditing(true);
      setCurrentRecord(record);
      setCpAddVisible(true);
    } else if (key === 'delete') {
      handleOpenDeletePopup(record);
    }
  };


  const menu = (record) => (
    <Menu  onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>

        <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
        {/* <Link to={`/update-appetizer/${appetizerData._id}`} >Edit</Link> */}
        edit
        </Menu.Item>
        <Menu.Item key="delete" icon={<MdDeleteOutline style={{ fontSize: "18px" }} />}>
            Delete
        </Menu.Item>
    </Menu>
);

const columns = [
  {
    title: 'Image',
    dataIndex: 'img',
    key: 'img',
    render: (img) => <img src={`${hostUrl}${img}`} height={25} alt='img' />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cost ($)',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
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

const data = cpData.map((item, index) => ({
  key: index,
  _id: item._id,
  name: item.name,
  cost: item.cost,
  description: item.description,
  img: item.centerPieceImagePath
}));

useEffect(() => {
}, [cpFormData])

return (
 <>
{ loading? <Loader/> : <div style={{
    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
    flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
    padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
}}>
    <div style={{
                    marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                    fontWeight: '600'
                }}>
        <span>Centerpieces</span>
    </div>
    <div style={{width: '100%'}}>
        <Table columns={columns} dataSource={data} />
    </div>
    {
      !isCpAddVisible ?
        <Button type="primary" htmlType="submit"
          style={{
            display: 'inline-block',
            height: '35px',
            width: '25%',
            background: 'black',
            marginTop: '20px',
            right: '0',
          }}
          className="custom-hover-btn"
          onClick={addCp}
        >
          Add Centerpiece
        </Button> : <div style={{ width: '100%', padding: '10px' }}>
          <form style={{ width: '100%' }} onSubmit={cpSelectionSubmit}>
            <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
              <InputField
                width={'33%'}
                label={'Name'}
                name="name"
                placeholder={'Name'}
                value={cpFormData.name}
                onChange={handleCpSelectionChange}
              />
              <InputField
                width={'33%'}
                label={'description'}
                name="description"
                placeholder={'description'}
                value={cpFormData.description}
                onChange={handleCpSelectionChange}
              />
              <InputField
                width={'33%'}
                label={'Cost ($)'}
                name="cost"
                placeholder={'Cost ($)'}
                value={cpFormData.cost}
                onChange={handleCpSelectionChange}
              />
              <InputField
                width={'33%'}
                label={'Image'}
                name="centerpieceImage"
                type={'file'}
                onChange={handleCpSelectionChange}
              />
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', marginBottom: '10px'}}>
                <Button type="primary" htmlType="submit"
                style={{
                    display: 'inline-block',
                    height: '35px',
                    width: '10%',
                    background: 'black',
                    right: '0',
                    marginRight:'10px'
                }}
                className="custom-hover-btn"
                >
                {isEditing ? 'Update' : 'Proceed'}
                </Button>
                <Button type="primary" 
                onClick={()=>{
                    clearForm();
                    addCp();
                    setIsEditing(false)
                    
                }}
                style={{
                    display: 'inline-block',
                    height: '35px',
                    width: '10%',
                    background: 'black',
                    right: '0',
                }}
                className="custom-hover-btn"
                >
                {isEditing ? 'Cancel' : 'Cancel'}
                </Button>
            </div>

          </form>
        </div>

    }
</div>}
 <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
 <DeletePopup 
  isModalOpen={deleteModal}
  handleCancel={handleCloseDeletePopup}
  Delete={handleDeleteConfirm}
  name={deleteData?.centerpiece}
  setLoading={setLoading}
/>
 
 
 </>
)
}

export default CenterTable