import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InputField from '../../../../InputField';
import { Table, Select, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import DeletePopup from '../../../../DeletePopup';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../../../../SuccessPopup';
import { Url ,Url2, hostUrl } from '../../../../../env';
import image from '../../../../../assets/image.png';
import Loader from '../../../../Loader';

const CoursesComp = ({heading, pkgButton, imageName, namePlaceholder, appData, setAppData, formSubmit,
    isEditing, setIsEditing, currentRecord, setCurrentRecord, clearForm,
    data, formSubmitted, setFormSubmitted, deleteModal, setDeleteModal, successPopupOpen, setSuccessPopupOpen,
    successPopupMessage, setSuccessPopupMessage, loading, setLoading, packageVisible, setPackageVisible,
    addPackages, handleChange, handleDeleteService
    }) => {
    const [deleteData, setDeleteData] = useState(null);

    const handleOpenDeletePopup = (record) => {
        setDeleteData(record);
        setDeleteModal(true);
    };
    console.log("set pkg visible", setPackageVisible)

    const handleCloseDeletePopup = () => {
        setDeleteModal(false);
        setDeleteData(null);
    };
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }

    

    useEffect(() => {
        if (formSubmitted) {
            setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])

    useEffect(() => {
        if (isEditing && currentRecord) {
            setAppData({
                name: currentRecord.name,
                description: currentRecord.description,
                cost: currentRecord.cost,
                appetizersImagePath: null,
            });
        }
    }, [isEditing, currentRecord]);

    const handleMenuClick = (record, key) => {
        if (key === 'edit') {
            setIsEditing(true);
            setCurrentRecord(record);
            setPackageVisible(true);
        } else if (key === 'delete') {
            handleOpenDeletePopup(record);
        }
    };

    const handleDeleteConfirm = () => {
        if (deleteData) {
            handleDeleteService(deleteData._id);
            handleCloseDeletePopup();
            console.log("Delete Pop Up")
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
        render: (img) => <img src={`${hostUrl}${img}`} /* src={`${img===""?image:`${Url2}${img}`}`} */ height={25} width={25} alt='img' />
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
        title: 'description',
        key: 'description',
        dataIndex: 'description',
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
             <div style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
            }}>
              {loading ? <Loader/> : <>
               
               <div style={{
                    marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                    fontWeight: '600'
                }}>
                    <span>{heading}</span>
                </div>
                <div style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={data} /* pagination={shouldShowPagination ? { pageSize: 5 } : false} */ />
                </div>
                <div style={{ width: '100%', display: 'flex', padding: '0px 10px', justifyContent: 'start', marginTop: '10px', marginBottom: '10px' }}>
                    {packageVisible ? <h3>{pkgButton}</h3> : <Button type="primary" htmlType="submit"
                        style={{
                            display: 'inline-block',
                            height: '35px',
                            width: '20%',
                            background: 'black',
                            marginTop: '20px',
                            right: '0',
                        }}
                        className="custom-hover-btn"
                        onClick={addPackages}
                    >
                        {pkgButton}
                    </Button>}
                    
                </div>
                {packageVisible && (
                    <div style={{ width: '100%', padding: '10px' }}>
                        <form style={{ width: '100%' }} onSubmit={formSubmit}>
                            <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
                                <InputField
                                    width={'33%'}
                                    label={'Name'}
                                    name="name"
                                    placeholder={namePlaceholder}
                                    value={appData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    width={'33%'}
                                    label={'description'}
                                    name="description"
                                    placeholder={'description'}
                                    value={appData.description}
                                    onChange={handleChange}
                                />
                                <InputField
                                    width={'33%'}
                                    label={'Cost ($)'}
                                    name="cost"
                                    placeholder={'Cost ($)'}
                                    value={appData.cost}
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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', gap: '15px', marginBottom: '10px' }}>
                                <Button type="primary" htmlType="submit"
                                    style={{
                                        display: 'inline-block',
                                        height: '35px',
                                        width: '20%',
                                        background: 'black',
                                        right: '0',
                                    }}
                                    className="custom-hover-btn"
                                >
                                    {isEditing ? 'Update' : pkgButton}
                                </Button>
                                <Button 
                                onClick={() => {
                                    clearForm()
                                    addPackages()
                                    setIsEditing(false)
                                }}
                                type='primary'
                                style={{
                                    display: 'inline-block',
                                    height: '35px',
                                    width: '10%',
                                    background: 'black',
                                    right: '0',
                                }}>
                                    {isEditing ? 'Cancel' : 'Cancel'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
               
               </>}
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <DeletePopup 
             isModalOpen={deleteModal}
             handleCancel={handleCloseDeletePopup}
             Delete={handleDeleteConfirm}
             name={deleteData?.foodType}
             setLoading={setLoading}
        />
        </>
    );
}

export default CoursesComp;