import React, { useEffect, useState } from 'react'
import InputField from '../../../InputField'
import { Button } from 'antd'
import '../FoodType/module.FoodType.css';
import Decors from './Decors';
import axios from 'axios';

const AddDecors = () => {
    const [seatingData, setSeatingData] = useState({name: '', cost: '', seatingImage: ''});
    const [tableData, setTableData] = useState({name: '', cost: '', tableImage: ''});
    const [chairData, setChairData] = useState({name: '', cost: '', chairImage: ''});
    const [stageData, setStagedata] = useState({name: '', cost: '',});
    const [backdropData, setBackdropData] = useState({name: '', cost: '', backDropImage: ''});
    const [centerData, setCenterData] = useState({name: '', cost: '', centerpieceImage: ''});
    const [lightData, setLightData] = useState({name: '', cost: '', lightningImage: ''});
    
    const handleSeatingChange = (e, section) => {
        const {name, value, files} = e.target;
        if(section === 'Seat Arrangments'){
            setSeatingData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value
            }));
        }
    }
    const handleTableChange = (e, section) => {
        const {name, value, files} = e.target;
        if(section === 'Table Selection'){
        setTableData(presState => ({
            ...presState,
            [name]: files ? files[0] : value,
        }));
        console.log(tableData)
    }
    }
    const handleChairChange = (e, section) => {
        const {name, value, files} = e.target;
            if(section === 'Chair Selection'){
            setChairData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value
            }));
            console.log(chairData)
        }
    }
    const handleStageChange = (e, section) => {
        const {name, value} = e.target;
        if(section === 'Stage Diemention'){
            setStagedata(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    const handleBackdropChange = (e, section) => {
        const {name, value, files} = e.target;
        if(section === 'Backdrop And Mandap'){
            setBackdropData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value,
            }))
        }
    }
    const handleCenterChange = (e, section) => {
        const {name, value, files} = e.target;
        if(section === 'Center Pieces'){
            setCenterData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value,
            }))
        }
    }
    const handleLightningChange = (e, section) => {
        const {name, value, files} = e.target;
        if(section === 'Lightning'){
            setLightData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value,
            }))
        }
    }


    const seatingSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/SeatingArrangments/add-seating-arrangments', seatingData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Seats Added")
            console.log(response.data)

        } catch (error) {
            console.error("Error Adding Data", error);
        }
    }
    const tableSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/api/v1/TableSelect/add-table-seletc', tableData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Table Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Table", error);
        }
    }
    const chairSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/ChairSelection/add-chair-selection', chairData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Table Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Chair", error);
        }
    }
    const stageSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/StageDimention/add-stage-dimention', stageData)
            alert("Stage Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Stage", error);
        }
    }
    const backDropSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/BackdropAndMandap/add-backdrop', backdropData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Backdrop Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Backdrop", error);
        }
    }
    const centerSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/CenterPieces/add-centerpiece', centerData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Center Piece Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Center Piece", error);
        }
    }
    const LightningSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/Lightning/add-lightning', lightData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Lightning Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Lightning", error);
        }
    }

  return (
    <div style={{width: '100%', padding: '10px 25px'}}>
        <form >
    <Decors  heading={'Seat Arrangments'} 
        width={'33%'}
        type={'file'}
        isTrue={true}
        data={seatingData}
        imageName={'seatingImage'}
        handleChange={handleSeatingChange}
        onSubmit={seatingSubmit}
    />
    <Decors heading={'Table Selection'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true} 
        data={tableData}
        imageName={'tableImage'}
        handleChange={handleTableChange}
        onSubmit={tableSubmit}
    />
    <Decors heading={'Chair Selection'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true} 
        data={chairData}
        imageName={'chairImage'}
        handleChange={handleChairChange}
        onSubmit={chairSubmit}
    />
    <Decors heading={'Stage Diemention'} 
        width={'33%'} 
        isTrue={false} 
        data={stageData}
        handleChange={handleStageChange}
        onSubmit={stageSubmit}
    />
      <Decors heading={'Backdrop And Mandap'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true} 
        data={backdropData}
        imageName={'backDropImage'}
        handleChange={handleBackdropChange}
        onSubmit={backDropSubmit}
    />
      <Decors heading={'Center Pieces'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true}
        data={centerData}
        imageName={'centerpieceImage'}
        handleChange={handleCenterChange}
        onSubmit={centerSubmit}
    />
    <Decors heading={'Lightning'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true}
        data={lightData}
        imageName={'lightningImage'}
        handleChange={handleLightningChange}
        onSubmit={LightningSubmit}
    />
      </form>
    </div>
  )
}

export default AddDecors
