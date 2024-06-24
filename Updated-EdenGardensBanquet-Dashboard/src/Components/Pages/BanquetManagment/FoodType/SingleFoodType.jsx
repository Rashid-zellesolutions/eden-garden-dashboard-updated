import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InputField from '../../../InputField'
import Packages from './Packages'
import { Button } from 'antd'
import './module.FoodType.css'
import { Link } from 'react-router-dom'

const SingleFoodType = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [singleData, setSingleData] = useState([]);

    useEffect(() => {
        const fetchSingleFoodType = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/FoodType/get-single-food/${id}`)
                setSingleData([response.data.foodTypeObj]);
            } catch (error) {
                console.log("Error fetching single food type", error);
            }
        }
        fetchSingleFoodType();
    }, [id]);
    useEffect(() => {
        console.log(singleData)
    }, [singleData])
    const deleteFoodType = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/FoodType/delete-food-type/${id}`)
            alert("Data Deleted")
            navigate('/BanquetManagment/show-food-data');
        } catch (error) {
            console.log("Error Deleting Data", error);
        }
    }

    return (
        <div style={{ width: '100%', padding: '10px 25px' }}>
            {singleData.map((item, i) => {
                return <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                    flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
                }}>
                    <div style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}>
                        <span>Food Type</span>
                    </div>
                    <div style={{ width: '100%' }}>
                        <InputField
                            label={'Food Type'}
                            width={'30%'}
                            name={item.foodType}
                            value={item.foodType}
                            readOnly={'readOnly'}
                        />
                        {console.log(singleData.foodType)}
                    </div>
                </div>
            })}
                
            
            {singleData.map(food => (
                <div>
                    {food.packages.map((item, i) => {
                        return <div>
                            <p style={{
                                marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                                fontWeight: '600'
                            }}> Package :  {item.name}</p>
                            {item.appetizers.map((appetizer, ind) => {
                                return <div> 
                                    <Packages
                                        key={ind}
                                        Namevalue={appetizer.name}
                                        Costvalue={appetizer.cost}
                                        pacForvalue={appetizer.pacFor}
                                        constantValue={appetizer.constant}
                                        heading={`Appetizers`}
                                    />
                                </div>
                            })}
                            {item.mainEntries.map((mainEntry, ind) => {
                                return <div>
                                    <Packages
                                        key={ind}
                                        Namevalue={mainEntry.name}
                                        Costvalue={mainEntry.cost}
                                        pacForvalue={mainEntry.pacFor}
                                        constantValue={mainEntry.constant}
                                        heading={`Main Entries`}
                                    />
                                </div>
                            })}
                            {item.desserts.map((dessert, ind) => {
                                return <div>
                                    <Packages
                                        key={ind}
                                        Namevalue={dessert.name}
                                        Costvalue={dessert.cost}
                                        pacForvalue={dessert.pacFor}
                                        constantValue={dessert.constant}
                                        heading={`Desserts `}
                                    />
                                </div>
                            })}
                            {item.teaCoffe.map((teaCoffe, ind) => {
                                return <div>
                                    <Packages
                                        key={ind}
                                        Namevalue={teaCoffe.name}
                                        Costvalue={teaCoffe.cost}
                                        pacForvalue={teaCoffe.pacFor}
                                        constantValue={teaCoffe.constant}
                                        heading={`Tea Coffe `}
                                    />
                                </div>
                                    })}
                            {item.juicesDrinks.map((juicDrink, ind) => {
                                return <div>
                                    <Packages
                                        key={ind}
                                        Namevalue={juicDrink.name}
                                        Costvalue={juicDrink.cost}
                                        pacForvalue={juicDrink.pacFor}
                                        constantValue={juicDrink.constant}
                                        heading={`Juice Drink `}
                                    />
                                </div>
                            })}
                        </div>
                    })}
                </div>
            ))}

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'end', width: '100%' }}>
                <Button type="primary" htmlType="submit"
                    style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }}
                    className="custom-hover-btn">
                    <Link to={`/update-food-data/${id}`}>Edit</Link></Button>
                <Button type="primary" htmlType="submit" onClick={deleteFoodType}
                    style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }}
                    className="custom-hover-btn">Delete</Button>
            </div>
        </div>
    )
}

export default SingleFoodType
