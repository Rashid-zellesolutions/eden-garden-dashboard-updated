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

const VenueWorking = () => {

    const [venueData, setVenueData] = useState([]);
    const [isVenueAddVisible, setVenueAddVisible] = useState(false);
    const [venueFormData, setVenueFormData] = useState({name : "", capacity : "", fixedCharges : "", personCharges : "", venueImage : "" });
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

    const addVenue = () => {
      setVenueAddVisible(!isVenueAddVisible);
    };


    const handleDeleteService = async (id) => {
      try {
        setLoading(true);
        await axios.delete(`${Url}Venue/delete/${id}`);
        setVenueData(venueData.filter(item => item._id !== id));
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
      setVenueFormData({name : "", capacity : "", fixedCharges : "", personCharges : "", venueImagePath : "" });
    };

    const handleVenueSelectionChange = (e, section) => {
      const { name, value, files } = e.target;
      if (name === 'venueImage') {
        setVenueFormData({ ...venueFormData, [name]: files[0] });
        console.log(venueFormData)
      } else {
        setVenueFormData({ ...venueFormData, [name]: value });
        console.log(venueFormData)
      }
    }




    const venueSelectionSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const formDataToSend = new FormData();
        Object.keys(venueFormData).forEach(key => {
            formDataToSend.append(key, venueFormData[key]);
        });
        if (isEditing && currentRecord) {
          setLoading(true);
          console.log(currentRecord)
          const response = await axios.put(`${Url}Venue/update-venue/${currentRecord._id}`, venueFormData, {
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
          const response = await axios.post(`${Url}Venue/add-venue`, venueFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSuccessPopupOpen(true)
          setSuccessPopupMessage("Data Added");
          console.log(response.data)
          setLoading(false);
        }

    clearForm();
    setFormSubmitted(true);
    setVenueAddVisible(false);
    setIsEditing(false);
    setCurrentRecord(null);
    setLoading(false);
      
  
  
  
      } catch (error) {
        console.error("Error Adding Data", error);
      }
  
    }
  






    const navigate = useNavigate();
    const fetchVenue = async() => {
      try {
        setLoading(true);
          const response = await axios.get(`${Url}Venue/get`)
          console.log(response.data.Venue)
          setVenueData(response.data.Venue);
          setLoading(false);
      } catch (error) {
          console.error("Error Fetching Data", error);
          setLoading(false);
      }
  }
    useEffect(() => {
       
        fetchVenue();
        if (formSubmitted) {
          fetchVenue(); // Fetch data if formSubmitted is true
          setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])

    useEffect(() => {
      if (isEditing && currentRecord) {
  
        setVenueFormData({
            name : currentRecord.name, capacity : currentRecord.capacity, fixedCharges : currentRecord.fixedCharges, personCharges : currentRecord.personCharges, venueImagePath : null 
        });
      }
    }, [isEditing, currentRecord]);

    const handleOpenDeletePopup = (record) => {
      setDeleteData(record);
      setDeleteModal(true);
    };








    const handleMenuClick = (record, key) => {
      if (key === 'edit') {
        setIsEditing(true);
        setCurrentRecord(record);
        setVenueAddVisible(true);
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
      render: (img) => <img src={`${hostUrl}${img}`} height={50} alt='img' />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
      },
    {
      title: 'Cost (Per Person)',
      dataIndex: 'personCharges',
      key: 'personCharges',
    },
    {
        title: 'Cost (Fixed)',
        dataIndex: 'fixedCharges',
        key: 'fixedCharges',
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

  const data = venueData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    capacity: item.capacity,
    personCharges: item.personCharges,
    fixedCharges: item.fixedCharges,
    img: item.venueImagePath
  }));

  useEffect(() => {
  }, [venueFormData])



  return (
   <>
   
   { loading? <Loader/> :
   <div style={{
      width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
      flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
      padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
  }}>
      <div style={{
                      marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                      fontWeight: '600'
                  }}>
          <span>Venue</span>
      </div>
      <div style={{width: '100%'}}>
          <Table columns={columns} dataSource={data} />
      </div>


      {
        !isVenueAddVisible ?
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
            onClick={addVenue}
          >
            Add Venue
          </Button> : <div style={{ width: '100%', padding: '10px' }}>
          <h3>{isEditing?"Edit Venue":"Add Venue"}</h3>
            <form style={{ width: '100%' }} onSubmit={venueSelectionSubmit}>
              <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px',flexWrap:'wrap' }}>
                <InputField
                  width={'33%'}
                  label={'Name'}
                  name="name"
                  placeholder={'Name'}
                  value={venueFormData.name}
                  onChange={handleVenueSelectionChange}
                />
                    <InputField
                  width={'30%'}
                  label={'Charges (Per Person)'}
                  name="capacity"
                  placeholder={'Charges (Per Person)'}
                  type={"number"}
                  value={venueFormData.capacity}
                  onChange={handleVenueSelectionChange}
                />
                <InputField
                  width={'30%'}
                  label={'Charges (Per Person)'}
                  name="personCharges"
                  placeholder={'Charges (Per Person)'}
                  type={"number"}
                  value={venueFormData.personCharges}
                  onChange={handleVenueSelectionChange}
                />
                  <InputField
                  width={'30%'}
                  label={'Charges (Fixed)'}
                  name="fixedCharges"
                  placeholder={'Charges (Fixed)'}
                  type={"number"}
                  value={venueFormData.fixedCharges}
                  onChange={handleVenueSelectionChange}
                />
               
                <InputField
                  width={'30%'}
                  label={'Image'}
                  name="venueImage"
                  type={'file'}
                  onChange={handleVenueSelectionChange}
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
                    addVenue();
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
    name={deleteData?.Venue}
    setLoading={setLoading}
/>
   
   
   </>
  )
}

export default VenueWorking