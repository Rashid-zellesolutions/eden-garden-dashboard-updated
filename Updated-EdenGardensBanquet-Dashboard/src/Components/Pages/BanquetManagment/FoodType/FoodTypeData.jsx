import React, { useEffect, useState } from 'react'
import InputField from '../../../InputField'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FoodTypeData = () => {
    
    const [foodData, setFoodData] = useState([]);
    useEffect(() => {
        const fetchFoodTypes = async() => {
            const resposne = await axios.get(`http://localhost:8080/api/v1/FoodType/get-food-type`);
            console.log(resposne.data.foodTypeObj)
            setFoodData(resposne.data.foodTypeObj)
        }
        fetchFoodTypes();
    }, [])

    // const handleSingleData = async(e) => {
    //     const response = await axios.get(`http://localhost:8080/api/v1/FoodType/get-single-food/${foodData._id}`)
    // }

  return (
    <div style={{width: '100%', padding: '10px 25px'}}>
        <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
            flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
            padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
        }}>
            <div style={{
                marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                fontWeight: '600'
            }}>
                <span>Food Types</span>
            </div>
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px'}}>
            {foodData.map((items, i) => {
                return <div style={{width: '100%'}}>
                    <Link to={`/get-single-food/${items._id}`} style={{ textDecoration: 'none' }}>
                    <InputField 
                        width={'100%'}
                        name={items.foodType}
                        value={items.foodType}
                        readOnly={'readOnly'}
                    />
                    </Link>
                </div>
            })}
            </div>
        </div>
    </div>
  )
}

export default FoodTypeData
