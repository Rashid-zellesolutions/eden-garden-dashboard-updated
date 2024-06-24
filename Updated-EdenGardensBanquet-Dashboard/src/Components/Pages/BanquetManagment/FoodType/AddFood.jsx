import React, { useEffect, useState } from 'react'
import {Tabs } from 'antd';
import Packages from './Packages';
import axios from 'axios';
import BreakFast from './FoodPackages/BreakFast';
import Lunch from './FoodPackages/Lunch';
import Dinner from './FoodPackages/Dinner';
import Baverages from './FoodPackages/Baverages';

const AddFood = () => {
    const [foodData, setFoodData] = useState();
    // useEffect(() => {
    //     try {
    //         const getFoodPackages = async() => {
    //             const response = await axios.get();
    //         }
    //     } catch (error) {
    //         console.error("Error Geting Food Packages", error);
    //     }
    // }, [])
  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        {/* <div style={{marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                fontWeight: '600'}}>
            <span>Foods</span>
        </div> */}
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Breakfast", "Lunch", "Dinner", "Beverages"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Breakfast` : i === 1 ? "Lunch" : i === 2 ? "Dinner" : "Beverages",
                    key: id,
                    disabled: i === 28,
                    children: i === 0 ? <BreakFast /> : i === 1 ? <Lunch /> : i === 2 ? <Dinner /> : <Baverages />,
                };
                })}
            />
        </div>
    </div>
  )
}

export default AddFood