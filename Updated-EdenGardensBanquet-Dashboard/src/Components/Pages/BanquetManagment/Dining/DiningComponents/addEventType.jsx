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
import { Url,Url2 } from '../../../../../env';
import SelectField from '../../../../SelectField';

const EventType2 = () => {
  const [eventTypeData, setEventTypeData] = useState([]);
  const [isEventTypeAddVisible, setEventTypeAddVisible] = useState(false);
  const [eventTypeFormData, setEventTypeFormData] = useState({ name: '', type: '', iconOnePath: '', iconTwoPath: '' });
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

  const addEventType = () => {
    setEventTypeAddVisible(!isEventTypeAddVisible);
  };


  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`${Url}EventType/delete/${id}`);
      setEventTypeData(eventTypeData.filter(item => item._id !== id));
      setEventTypeAddVisible(false);
    } catch (error) {
      console.error("Error deleting food type", error);
      console.error('Failed to delete food type');
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
    setEventTypeFormData({name: '', type: '', iconOnePath: '', iconTwoPath: '' });
  };
  const handleEventTypeSelectionChange = (eOrValue, name) => {
    if (name === 'type') {
      setEventTypeFormData({ ...eventTypeFormData, [name]: eOrValue });
    } else {
      const { name, value, files } = eOrValue.target;
      if (name === 'iconOne' || name === 'iconTwo') {
        setEventTypeFormData({ ...eventTypeFormData, [name]: files[0] });
      } else {
        setEventTypeFormData({ ...eventTypeFormData, [name]: value });
      }
    }
  };
  
  



  const eventTypeSelectionSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formDataToSend = new FormData();
      Object.keys(eventTypeFormData).forEach(key => {
          formDataToSend.append(key, eventTypeFormData[key]);
      });
      if (isEditing && currentRecord) {
        console.log(currentRecord)
        const response = await axios.put(`${Url}EventType/edit-event/${currentRecord._id}`, eventTypeFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Updated");
        console.log(response.data)
      } else {
        const response = await axios.post(`${Url}EventType/add-event`, eventTypeFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Added");
        console.log(response.data)
      }

  clearForm();
  setFormSubmitted(true);
  setEventTypeAddVisible(false);
  setIsEditing(false);
  setCurrentRecord(null);
    



    } catch (error) {
      console.error("Error Adding Data", error);
    }

  }







  const navigate = useNavigate();
  useEffect(() => {
      const fetchEventType = async() => {
          try {
              const response = await axios.get(`${Url}EventType/get`)
              console.log(response.data.EventType)
              setEventTypeData(response.data.EventType);
          } catch (error) {
              console.error("Error Fetching Data", error);
          }
      }
      fetchEventType();
      if (formSubmitted) {
        fetchEventType(); // Fetch data if formSubmitted is true
        setFormSubmitted(false); // Reset formSubmitted to false
      }
  }, [formSubmitted])

  useEffect(() => {
    if (isEditing && currentRecord) {

      setEventTypeFormData({
        name: currentRecord.name,
        type: currentRecord.type,
        iconOnePath: null,
        iconTwoPath:null
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
      setEventTypeAddVisible(true);
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
    dataIndex: 'img1',
    key: 'img1',
    render: (img1) => <img src={`${Url2}${img1}`} height={50} alt='img' />
  },
  {
    title: 'Image2',
    dataIndex: 'img2',
    key: 'img2',
    render: (img2) => <img src={`${Url2}${img2}`} height={50} alt='img' />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
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

const data = eventTypeData.map((item, index) => ({
  key: index,
  _id: item._id,
  name: item.name,
  type: item.type,
  img1: item.iconOnePath,
  img2: item.iconTwoPath
}));

useEffect(() => {
}, [eventTypeFormData])



return (
 <>
 
 
 <div style={{
    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
    flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
    padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
}}>
    <div style={{
                    marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                    fontWeight: '600'
                }}>
        <span>Event Type</span>
    </div>
    <div style={{width: '100%'}}>
        <Table columns={columns} dataSource={data} />
    </div>


    {
      !isEventTypeAddVisible ?
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
          onClick={addEventType}
        >
          Add Event
        </Button> : <div style={{ width: '100%', padding: '10px' }}>
        <h3>{isEditing?"Edit Event Type":"Add Event Type"}</h3>
          <form style={{ width: '100%' }} onSubmit={eventTypeSelectionSubmit}>
            <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
              <InputField
                width={'33%'}
                label={'Name'}
                name="name"
                placeholder={'Name'}
                value={eventTypeFormData.name}
                onChange={handleEventTypeSelectionChange}
              />

<SelectField
  label={"Type"}
  placeholder={"Event Type"}
  name="type"
  options={[
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
  ]}
  width={"33%"}
  value={eventTypeFormData.type}
  onChange={(value) => handleEventTypeSelectionChange(value, 'type')}
/>

              <InputField
                width={'33%'}
                label={'Image1'}
                name="iconOne"
                type={'file'}
                onChange={handleEventTypeSelectionChange}
              />
               <InputField
                width={'33%'}
                label={'Image2'}
                name="iconTwo"
                type={'file'}
                onChange={handleEventTypeSelectionChange}
              />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', marginBottom: '10px' }}>
              <Button type="primary" htmlType="submit"
                style={{
                  display: 'inline-block',
                  height: '35px',
                  width: '10%',
                  background: 'black',
                  right: '0',
                }}
                className="custom-hover-btn"
              >
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </div>

          </form>
        </div>

    }
</div>
 <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
 <DeletePopup 
  isModalOpen={deleteModal}
  handleCancel={handleCloseDeletePopup}
  Delete={handleDeleteConfirm}
  name={deleteData?.EventType}
  setLoading={setLoading}
/>
 
 
 </>
)
}

export default EventType2