import React, {useState, useEffect} from 'react'
import {Tabs } from 'antd';
import BackdropTable from './DecorTables/BackdropTable';
import CenterTable from './DecorTables/CenterPiecesTable';
import LightinigTable from './DecorTables/LightningTable';
import DecorComp from './DecorTables/DecorsComp';
import axios from 'axios';
import { Url } from '../../../../env';


const ShowDecor = () => {

  // Universel Variables
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Seating Arrangments Data
  
  const [seatingData, setSeatingData] = useState([]);
  const [seatingFormData, setSeatingFormData] = useState(
    { name: '', cost: '', description: '', seatingImage: '' }
  );

  const addSeatingArrangement = () => {
    setIsFormVisible(!isFormVisible);
  };

  const fetchSeatingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}SeatingArrangments/get-seating-arrangments`)
      console.log(response.data.seatingObj)
      setSeatingData(response.data.seatingObj);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching Data", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSeatingData()
  }, []);
  useEffect(() => {
    if (formSubmitted) {
      fetchSeatingData(); 
      setFormSubmitted(false); 
    }
  }, [formSubmitted])

  const handleSeatingChange = (e, section) => {
    const { name, value, files } = e.target;
    if (name === 'seatingImage') {
      setSeatingFormData({ ...seatingFormData, [name]: files[0] });
    } else {
      setSeatingFormData({ ...seatingFormData, [name]: value });
    }
  }
  console.log("Seating Change ", seatingFormData)

  useEffect(() => {
    if (isEditing && currentRecord) {
      setSeatingFormData({
        name: currentRecord.name,
        description: currentRecord.description,
        cost: currentRecord.cost,
        description: currentRecord.description,
        seatingImage: null,
      });
    }
  }, [isEditing, currentRecord]);

  const seatingSubmit = async (e) => {
  
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(seatingFormData).forEach(key => {
        formDataToSend.append(key, seatingFormData[key]);
    });
      if (isEditing && currentRecord) {
        setLoading(true);
        console.log(currentRecord)
        const response = await axios.put(`${Url}SeatingArrangments/update-seating-arrangments/${currentRecord._id}`, seatingFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Seating Arrangments Updated");
        console.log(response.data);
        setLoading(false);
      }  else {
        setLoading(true);
      const response = await axios.post(`${Url}SeatingArrangments/add-seating-arrangments`, seatingFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setSuccessPopupOpen(true)
      setSuccessPopupMessage("Seating Arrangments Added");
      console.log(response.data)
      setLoading(false);
     }

    } catch (error) {
      console.error("Error Adding Data", error);
      setLoading(false);
    }
    clearSeatingForm();
    setFormSubmitted(true);
    setSuccessPopupOpen(true)
    setSuccessPopupMessage("Data Added");
    setIsFormVisible(false);
    setLoading(false);
  }

 

  const clearSeatingForm = () => {
    setSeatingFormData({ name: '', cost: '', description: '', seatingImage: null });
  };

  const seaTingValues = seatingData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
    description: item.description,
    img: item.seatingArrangmentsImagePath
  }));

  const handleDeleteSeating = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${Url}SeatingArrangments/delete-seating-arrangments/${id}`);
      console.log('Food Type deleted successfully');
      setSeatingData(seatingData.filter(item => item._id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting food type", error);
      console.error('Failed to delete food type');
      setLoading(false);
    }
  };



  // Chair Selection Data
  const [chairData, setChairData] = useState([]);
  const [chairFormData, setChairFormData] = useState(
    { name: '', cost: '', description: '', chairImage: '' }
  );

  const clearChairForm = () => {
    setChairFormData({name: '', cost: '', description: '', chairImage: ''});
  };

  const fetchChair = async() => {
    try {
      setLoading(true);
        const response = await axios.get(`${Url}ChairSelection/get-chair-selection-data`)
        console.log(response.data.chairsData)
        setChairData(response.data.chairsData);
        setLoading(false);
    } catch (error) {
        console.error("Error Fetching Data", error);
        setLoading(false);
    }
}

  useEffect(() => {
    fetchChair()
  }, [])

  useEffect(() => {
      if (formSubmitted) {
        fetchChair(); // Fetch data if formSubmitted is true
        setFormSubmitted(false); // Reset formSubmitted to false
      }
  }, [formSubmitted])

  const chairValues = chairData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
    description: item.description,
    img: item.chairImagePath
  }));

  useEffect(() => {
    if (isEditing && currentRecord) {

      setChairFormData({
        name: currentRecord.name,
        description: currentRecord.description,
        cost: currentRecord.cost,
        chairImage: null,
      });
    }
  }, [isEditing, currentRecord]);

  const handleChairSelectionChange = (e, section) => {
    const { name, value, files } = e.target;
    if (name === 'chairImage') {
      setChairFormData({ ...chairFormData, [name]: files[0] });
      console.log(chairFormData)
    } else {
      setChairFormData({ ...chairFormData, [name]: value });
      console.log(chairFormData)
    }
  }

  const chairSelectionSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formDataToSend = new FormData();
      Object.keys(chairFormData).forEach(key => {
          formDataToSend.append(key, chairFormData[key]);
      });
      if (isEditing && currentRecord) {
        setLoading(true);
        console.log(currentRecord)
        const response = await axios.put(`${Url}ChairSelection/update-chair-selection/${currentRecord._id}`, chairFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Updated");
        console.log(response.data);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await axios.post(`${Url}ChairSelection/add-chair-selection`, chairFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Added");
        console.log(response.data)
        setLoading(false);
      }
      clearChairForm();
      setFormSubmitted(true);
      setSuccessPopupOpen(true)
      setSuccessPopupMessage("Data Added");
      setIsFormVisible(false);
      setLoading(false);
    } catch (error) {
      console.error("Error Adding Data", error);
    }
  }

  const handleDeleteChair = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${Url}ChairSelection/delete-chair-selection/${id}`);
      setChairData(chairData.filter(item => item._id !== id));
      setLoading(false);
    } catch (error) {
      
      console.error("Error deleting food type", error);
      console.error('Failed to delete food type');
      setLoading(false);
    }
    console.log("chair id ", id)
  };

  // Backdrop And Mandap
  const [backdropData, setBackdropData] = useState([]);
  const [backdropFormData, setBackdropFormData] = useState(
    { name: '', cost: '', description: '', backDropImage: '' }
  );

  const clearBackdropForm = () => {
    setBackdropFormData({name: '', cost: '', description: '', backDropImage: ''});
  };

  const fetchBackdrop = async() => {
    try {
      setLoading(true);
        const response = await axios.get(`${Url}BackdropAndMandap/get-backdrop-data`)
        console.log(response.data.backdrop)
        setBackdropData(response.data.backdrop);
        setLoading(false);
    } catch (error) {
        console.error("Error Fetching Data", error);
        setLoading(false);
    }
  }
  useEffect(() => {
    fetchBackdrop()
  }, [])

  useEffect(() => {
      if (formSubmitted) {
        fetchBackdrop(); // Fetch data if formSubmitted is true
        setFormSubmitted(false); // Reset formSubmitted to false
      }
  }, [formSubmitted])

  
  
  

  const backdropValues = backdropData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
    description: item.description,
    img: item.backdropImagePath
  }));
  useEffect(() => {
    if (isEditing && currentRecord) {
      setBackdropFormData({
        name: currentRecord.name,
        description: currentRecord.description,
        cost: currentRecord.cost,
        backDropImage: null,
      });
    }
  }, [isEditing, currentRecord]);

  const handleBackdropSelectionChange = (e, section) => {
    const { name, value, files } = e.target;
    if (name === 'backDropImage') {
      setBackdropFormData({ ...backdropFormData, [name]: files[0] });
      console.log(backdropFormData)
    } else {
      setBackdropFormData({ ...backdropFormData, [name]: value });
      console.log(backdropFormData)
    }
  }

  const backdropSelectionSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formDataToSend = new FormData();
      Object.keys(backdropFormData).forEach(key => {
          formDataToSend.append(key, backdropFormData[key]);
      });
      if (isEditing && currentRecord) {
        setLoading(true);
        console.log(currentRecord)
        const response = await axios.put(`${Url}BackdropAndMandap/update-backdrop/${currentRecord._id}`, backdropFormData, {
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
        const response = await axios.post(`${Url}BackdropAndMandap/add-backdrop`, backdropFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessPopupOpen(true)
        setSuccessPopupMessage("Data Added");
        console.log(response.data)
        setLoading(false);
      }
      clearChairForm();
      setFormSubmitted(true);
      setSuccessPopupOpen(true)
      setSuccessPopupMessage("Data Added");
      setIsFormVisible(false);
      setLoading(false);
    } catch (error) {
      console.error("Error Adding Data", error);
    }
  }

  const handleDeleteBackdrop = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${Url}BackdropAndMandap/delete-backdrop/${id}`);
      setBackdropData(backdropData.filter(item => item._id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting food type", error);
      console.error('Failed to delete food type');
      setLoading(false);
    }
  };


  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Seating Arrangments", "Chairs", "Backdrop Mandap", "Centerpieces", "Lighting"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Seating Arrangment`  : i === 1 ? "Chairs"  : i === 2 ? "Backdrop Mandap" : i === 3 ? "Centerpieces" : "Lighting",
                    key: id,
                    disabled: i === 28,
                    children:  i === 0 ? 
                    // Seating Arrangments
                    <DecorComp 
                      heading={'Seating Arrangments'} addBtn={'Add Seating Arrangments'} updateBtn={'Update Seating Arrangments'}
                      imageName={'seatingImage'} data={seaTingValues} loading={loading} setLoading={setLoading}
                      formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} decorData={seatingFormData} handleChange={handleSeatingChange}
                      isEditing={isEditing} setIsEditing={setIsEditing} currentRecord={currentRecord} setCurrentRecord={setCurrentRecord}
                      clearForm={clearSeatingForm} handleSubmit={seatingSubmit} setFormVisible={addSeatingArrangement} isFormVisible={isFormVisible}
                      setIsFormVisible={setIsFormVisible} handleDeleteService={handleDeleteSeating}
                      successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage}
                      successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen}
                    /> 
                    : i === 1 ? <DecorComp 
                      heading={'Chair Selection'} addBtn={'Add Chairs'} updateBtn={'Update Chairs'} imageName={'chairImage'}
                      decorData={chairFormData} data={chairValues}
                      loading={loading} setLoading={setLoading} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}
                      isEditing={isEditing} setIsEditing={setIsEditing} currentRecord={currentRecord} setCurrentRecord={setCurrentRecord}
                      isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} successPopupMessage={successPopupMessage}
                      setSuccessPopupMessage={setSuccessPopupMessage} successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen}
                      clearForm={clearChairForm} setFormVisible={addSeatingArrangement} handleChange={handleChairSelectionChange}
                      handleSubmit={chairSelectionSubmit} handleDeleteService={handleDeleteChair}
                    />
                    : i === 2 ? <DecorComp 
                      heading={'Backdrop And Mandap'} addBtn={'Add Backdrop And Mandap'} updateBtn={'Update Backdrop And Mandap'}
                      imageName={'backDropImage'} decorData={backdropFormData} data={backdropValues} loading={loading} setLoading={setLoading}
                      formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} isEditing={isEditing} setIsEditing={setIsEditing}
                      currentRecord={currentRecord} setCurrentRecord={setCurrentRecord} isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible}
                      successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage} clearForm={clearBackdropForm}
                      setFormVisible={addSeatingArrangement} handleChange={handleBackdropSelectionChange} handleSubmit={backdropSelectionSubmit}
                      handleDeleteService={handleDeleteBackdrop}
                      
                    />
                    : i === 3 ? <CenterTable /> 
                    : <LightinigTable />,
                };
                })}
            />
        </div>
    </div>
  )
}

export default ShowDecor