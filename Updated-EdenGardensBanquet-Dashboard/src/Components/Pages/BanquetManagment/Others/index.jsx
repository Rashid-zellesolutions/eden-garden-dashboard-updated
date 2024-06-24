import React, { useEffect, useState } from 'react'
import InputField from '../../../InputField'
import { Button } from 'antd'
import '../FoodType/module.FoodType.css';
import Decors from '../Decor/Decors';
import axios from 'axios';

const Others = () => {
    const [diningData, setDiningData] = useState({name: '', cost: '', diningImage: ''});
    const [cutleryData, setCutleryData] = useState({name: '', cost: '', cutleryImage: ''});
    const [soundData, setSoundData] = useState({name: '', cost: '', soundImage: ''});
    
    
    const handleDiningChange = (e, section) => {
        const {name, value, files} = e.target;
        if(section === 'Dining Option'){
        setDiningData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    }
    }
    const handleCutleryChange = (e, section) => {
        const {name, value, files} = e.target;
            if(section === 'Cutlery'){
            setCutleryData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value
            }));
        }
    }
    const handleSoundChange = (e, section) => {
      const {name, value, files} = e.target;
      if(section === 'Sound'){
          setSoundData(prevState => ({
              ...prevState,
              [name]: files ? files[0] : value
          }));
      }
  }

    const DiningSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/DiningOption/add-dining-option', diningData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Dining Added")
            console.log(response.data)

        } catch (error) {
            console.error("Error Adding Data", error);
        }
    }
    const cutlerSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/api/v1/Cutlery/add-cutlery', cutleryData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Cutlery Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Table", error);
        }
    }
    const soundSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/Sound/add-sound-data', soundData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            alert("Sound Added");
            console.log(response.data)
        } catch (error) {
            console.error("Error Adding Chair", error);
        }
    }

  return (
    <div style={{width: '100%', padding: '10px 25px'}}>
        <form >
    <Decors  heading={'Dining Option'} 
        width={'33%'}
        type={'file'}
        isTrue={true}
        data={diningData}
        imageName={'diningImage'}
        handleChange={handleDiningChange}
        onSubmit={DiningSubmit}
    />
    <Decors heading={'Cutlery'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true} 
        data={cutleryData}
        imageName={'cutleryImage'}
        handleChange={handleCutleryChange}
        onSubmit={cutlerSubmit}
    />
    <Decors heading={'Sound'} 
        width={'33%'} 
        type={'file'} 
        isTrue={true} 
        data={soundData}
        imageName={'soundImage'}
        handleChange={handleSoundChange}
        onSubmit={soundSubmit}
    />
      </form>
    </div>
  )
}

export default Others
