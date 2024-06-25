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

const Sound = () => {

    const [soundData, setSoundData] = useState([]);
    const [isSoundAddVisible, setSoundAddVisible] = useState(false);
    const [soundFormData, setSoundFormData] = useState({ name: '', cost: '', description: '', soundImage: '' });
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
  
    const addSound = () => {
      setSoundAddVisible(!isSoundAddVisible);
    };
  
    const handleDeleteService = async (id) => {
      try {
        await axios.delete(`${Url}Sound/delete-sound/${id}`);
        setSoundData(soundData.filter(item => item._id !== id));
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
      setSoundFormData({name: '', cost: '', description: '', soundImage: ''});
    };
  
    const handleSoundSelectionChange = (e, section) => {
      const { name, value, files } = e.target;
      if (name === 'soundImage') {
        setSoundFormData({ ...soundFormData, [name]: files[0] });
        console.log(soundFormData)
      } else {
        setSoundFormData({ ...soundFormData, [name]: value });
        console.log(soundFormData)
      }
    }
  
    const soundSelectionSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const formDataToSend = new FormData();
        Object.keys(soundFormData).forEach(key => {
            formDataToSend.append(key, soundFormData[key]);
        });
        if (isEditing && currentRecord) {
          console.log(currentRecord)
          const response = await axios.put(`${Url}Sound/update-sound/${currentRecord._id}`, soundFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSuccessPopupOpen(true)
          setSuccessPopupMessage("Sound Updated");
          console.log(response.data)
        } else {
          const response = await axios.post(`${Url}Sound/add-sound`, soundFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSuccessPopupOpen(true)
          setSuccessPopupMessage("Sound Added");
          console.log(response.data)
        }
  
    clearForm();
    setFormSubmitted(true);
    setSoundAddVisible(false);
    setIsEditing(false);
    setCurrentRecord(null);
      
  
  
  
      } catch (error) {
        console.error("Error Adding Data", error);
      }
  
    }
  
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSound = async() => {
            try {
                const response = await axios.get(`${Url}Sound/get-sound`)
                console.log(response.data.sound)
                setSoundData(response.data.sound);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        }
        fetchSound();
        if (formSubmitted) {
          fetchSound(); // Fetch data if formSubmitted is true
          setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])
  
    useEffect(() => {
      if (isEditing && currentRecord) {
  
        setSoundFormData({
          name: currentRecord.name,
          description: currentRecord.description,
          cost: currentRecord.cost,
          soundImage: null,
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
        setSoundAddVisible(true);
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
  
  const data = soundData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
    description: item.description,
    img: item.soundImagePath
  }));
  
  useEffect(() => {
  }, [soundFormData])
  
  
  
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
          <span>Sound Systems</span>
      </div>
      <div style={{width: '100%'}}>
          <Table columns={columns} dataSource={data} />
      </div>
  
  
      {
        !isSoundAddVisible ?
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
            onClick={addSound}
          >
            Add Sound System
          </Button> : <div style={{ width: '100%', padding: '10px' }}>
            <form style={{ width: '100%' }} onSubmit={soundSelectionSubmit}>
              <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
                <InputField
                  width={'33%'}
                  label={'Name'}
                  name="name"
                  placeholder={'Name'}
                  value={soundFormData.name}
                  onChange={handleSoundSelectionChange}
                />
                <InputField
                  width={'33%'}
                  label={'description'}
                  name="description"
                  placeholder={'description'}
                  value={soundFormData.description}
                  onChange={handleSoundSelectionChange}
                />
                <InputField
                  width={'33%'}
                  label={'Cost ($)'}
                  type={'number'}
                  name="cost"
                  placeholder={'Cost ($)'}
                  value={soundFormData.cost}
                  onChange={handleSoundSelectionChange}
                />
                <InputField
                  width={'33%'}
                  label={'Image'}
                  name="soundImage"
                  type={'file'}
                  onChange={handleSoundSelectionChange}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '15px', marginTop: '10px', marginBottom: '10px' }}>
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
                <Button type='primary'
                onClick={() => {
                  clearForm()
                  addSound()
                }}
                style={{
                  display: 'inline-block',
                  width: '10%',
                  height: '35px',
                  backgroundColor: 'black',
                  right: '0'
                }}
                className='custom-hover-btn'
                >
                  {isEditing ? 'Cancel' : 'Cancel'}
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
    name={deleteData?.sound}
    setLoading={setLoading}
  />
   
   
   </>
  )
}

export default Sound