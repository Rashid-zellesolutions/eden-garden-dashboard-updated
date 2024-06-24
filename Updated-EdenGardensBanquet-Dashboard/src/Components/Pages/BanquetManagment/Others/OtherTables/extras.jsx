import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import InputField from '../../../../InputField';
import SuccessPopup from '../../../../SuccessPopup';
import { Url } from '../../../../../env';

const Extras = () => {
  const [extrasData, setExtrasData] = useState({});
  const [extrasFormData, setExtrasFormData] = useState({ _id: '', extraRoomCost: '', valetCost: '', securityCost: '' });
  const [isEditEnable, setEditEnable] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('');
  const handleCloseSuccessPopup = () => {
    setSuccessPopupOpen(false)
  }


  const editExtras = () => {
    setIsEditing(true);
    setCurrentRecord(extrasData);
    setEditEnable(true);
  };

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get(`${Url}Extras/get-extras`);
        console.log(response.data.extras);
        setExtrasData(response.data.extras);
      } catch (error) {
        console.error('Error Fetching Data', error);
      }
    };
    fetchExtras();
  }, []);

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get(`${Url}Extras/get-extras`);
        console.log(response.data.extras);
        setExtrasData(response.data.extras);
      } catch (error) {
        console.error('Error Fetching Data', error);
      }
    };
    fetchExtras();
  }, [formSubmitted]);

  useEffect(() => {
    if (isEditing && currentRecord) {
      setExtrasFormData({
        _id: currentRecord._id,
        extraRoomCost: currentRecord.extraRoomCost,
        valetCost: currentRecord.valetCost,
        securityCost: currentRecord.securityCost,
      });
    }
  }, [isEditing, currentRecord]);

  const clearForm = () => {
    setExtrasFormData({ _id: '', extraRoomCost: '', valetCost: '', securityCost: '' });
  };

  const handleExtrasChange = (e) => {
    const { name, value } = e.target;
    setExtrasFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log(extrasFormData);
  };

  const extrasSelectionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${Url}Extras/update-extras/${currentRecord._id}`, extrasFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccessPopupOpen(true);
      setSuccessPopupMessage('Data Updated');
      console.log(response.data);

      clearForm();
      setFormSubmitted(true);
      setEditEnable(false);
      setCurrentRecord(null);
    } catch (error) {
      console.error('Error Adding Data', error);
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#fff',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          padding: '10px 25px',
          borderRadius: '4px',
          marginBottom: '23px',
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            marginTop: '10px',
            fontFamily: 'poppins',
            color: '#73787c',
            fontWeight: '600',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Miscellaneous</span>
          {!isEditEnable ? (
            <Button
              type="primary"
              htmlType="submit"
              style={{
                height: '25px',
                width: '8%',
                background: 'black',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="custom-hover-btn"
              onClick={editExtras}
            >
              Edit
            </Button>
          ) : (
            <div style={{ width: '10px', height: '10px' }}></div>
          )}
        </div>

        {/* {extrasData.map((item, i) => { */}
            {/* return  */}
            <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '30%',
                height: '50px',
                backgroundColor: '#F5F5F5',
                borderRadius: '5px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Room Cost
              </span>
              <span
                style={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                ${extrasData.extraRoomCost}
              </span>
            </div>
            <div
              style={{
                width: '30%',
                height: '50px',
                backgroundColor: '#F5F5F5',
                borderRadius: '5px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Valet Cost
              </span>
              <span
                style={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                ${extrasData.valetCost}
              </span>
            </div>
            <div
              style={{
                width: '30%',
                height: '50px',
                backgroundColor: '#F5F5F5',
                borderRadius: '5px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Security Cost
              </span>
              <span
                style={{
                  color: 'black',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                ${extrasData.securityCost}
              </span>
            </div>
          </div>
          {/* })} */}
        

 {  isEditEnable &&     <div style={{ width: '100%',marginTop: '20px', }}>
 <span style={{
    
    fontFamily: 'poppins',
    color: '#73787c',
    fontWeight: '600',
 }}>Edit Miscellaneous </span>
          <form style={{ width: '100%' }} onSubmit={extrasSelectionSubmit}>
            <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
              <InputField
                width={'33%'}
                label={'Extra Room Cost'}
                name="extraRoomCost"
                placeholder={'In Dollars ($)'}
                value={extrasFormData.extraRoomCost}
                onChange={handleExtrasChange}
              />
              <InputField
                width={'33%'}
                label={'Valet Cost (Each)'}
                name="valetCost"
                placeholder={'In Dollars ($)'}
                value={extrasFormData.valetCost}
                onChange={handleExtrasChange}
              />
              <InputField
                width={'33%'}
                label={'Security Cost (Each)'}
                name="securityCost"
                placeholder={'In Dollars ($)'}
                value={extrasFormData.securityCost}
                onChange={handleExtrasChange}
              />
            </div>
            {isEditEnable && (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', marginBottom: '10px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    display: 'inline-block',
                    height: '35px',
                    width: '10%',
                    background: 'black',
                  }}
                  className="custom-hover-btn"
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        </div>}
      </div>
      <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
    </>
  );
};

export default Extras;
