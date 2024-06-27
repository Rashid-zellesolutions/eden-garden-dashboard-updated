import React, { useState } from 'react'
import { Table, Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import SuccessPopup from '../../../../SuccessPopup';
import InputField from '../../../../InputField';
import DeletePopup from '../../../../DeletePopup';
import {hostUrl } from '../../../../../env';
import Loader from '../../../../Loader';

const DecorComp = ({heading, addBtn, updateBtn, handleSubmit, imageName, data, decorData, loading, setLoading, formSubmitted, setFormSubmitted,
  handleChange, isEditing, setIsEditing, currentRecord, setCurrentRecord, clearForm, successPopupMessage, setSuccessPopupMessage,
  successPopupOpen, setSuccessPopupOpen, setFormVisible, isFieldsVisible, setIsFiledsVisible, isFormVisible, setIsFormVisible,
  handleDeleteService,
}) => {

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const handleCloseSuccessPopup = () => {
    setSuccessPopupOpen(false)
  }

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
  
  const handleOpenDeletePopup = (record) => {
    setDeleteData(record);
    setDeleteModal(true);
  };

  const handleMenuClick = (record, key) => {
    if (key === 'edit') {
      setIsEditing(true);
      setCurrentRecord(record);
      setIsFormVisible(true);
    } else if (key === 'delete') {
      handleOpenDeletePopup(record);
    }
  };

  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>

      <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
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
      render: (img) => <img src={`${hostUrl}${img}`} height={25} width={25} alt='img' />
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
        <span>{heading}</span>
      </div>
      <div style={{ width: '100%' }}>
        <Table columns={columns} dataSource={data} />
        {
          !isFormVisible ?
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
              onClick={setFormVisible}
            >
              {addBtn}
            </Button> : <div style={{ width: '100%', padding: '10px' }}>
              {isEditing ? <h3>{updateBtn}</h3> : <h3>{addBtn}</h3>}
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
                  <InputField
                    width={'33%'}
                    label={'Name'}
                    name="name"
                    placeholder={'Name'}
                    value={decorData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    width={'33%'}
                    label={'description'}
                    name="description"
                    placeholder={'description'}
                    value={decorData.description}
                    onChange={handleChange}
                  />
                  <InputField
                    width={'33%'}
                    label={'Cost ($)'}
                    name="cost"
                    placeholder={'Cost ($)'}
                    value={decorData.cost}
                    onChange={handleChange}
                  />
                  <InputField
                    width={'33%'}
                    label={'Image'}
                    name={imageName}
                    type={'file'}
                    onChange={handleChange}
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
                    setFormVisible()
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
      </div>
      <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
      <DeletePopup
        isModalOpen={deleteModal}
        handleCancel={handleCloseDeletePopup}
        Delete={handleDeleteConfirm}
        name={deleteData?.foodType}
        setLoading={setLoading}
      />
    </div>
   }
    <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
 <DeletePopup 
  isModalOpen={deleteModal}
  handleCancel={handleCloseDeletePopup}
  Delete={handleDeleteConfirm}
  name={deleteData?.seatingObj}
  setLoading={setLoading}
/>
   </>
  )
}

export default DecorComp