import React from 'react'
import {Tabs } from 'antd';
import AppetizerTable from './FoodCousesComponents/AppetizerTable';
import MainEntriesTable from './FoodCousesComponents/MainEntriesTable';
import DessertsTable from './FoodCousesComponents/DessertsTable';
import TeaCoffe from './FoodCousesComponents/TeaCoffe';
import JuicesDrinks from './FoodCousesComponents/JuicesDrinks';

const ShowFoodCouses = () => {
  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        <div style={{marginBottom: '20px'}}>
            <span>Foods Data</span>
        </div>
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Appetizers", "Main Entries", "Desserts", "Tea Coffe", "Juices Drinks"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Appetizers` : i === 1 ? "Main Entries" : i === 2 ? "Desserts" : i === 3 ? "Tea Coffe" : "Juices Drinks",
                    key: id,
                    disabled: i === 28,
                    children: i === 0 ? <AppetizerTable /> : i === 1 ? <MainEntriesTable /> : i === 2 ? < DessertsTable /> : i===3?<TeaCoffe />:<JuicesDrinks/>,
                };
                })}
            />
        </div>
    </div>
  )
}

export default ShowFoodCouses