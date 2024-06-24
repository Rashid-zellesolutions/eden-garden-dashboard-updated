import React, { useEffect, useState } from 'react'
import {Tabs } from 'antd';
import Appetizers from './Courses/Appetizers';
import MainEntries from './Courses/MainEntrees';
import Desserts from './Courses/Desserts';
import TeaCoffe from './Courses/TeaCoffe';
import JuiceDrink from './Courses/JuiceDrink';

const Courses = () => {
  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        {/* <div style={{marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                fontWeight: '600'}}>
            <span>Meals</span>
        </div> */}
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Appetizers", "Main Entries", "Desserts", "Tea Coffe", "Juices Drinks"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Appetizers` : i === 1 ? "Main Entrees" : i === 2 ? "Desserts" : i === 3 ?  "Tea Coffee" : "Juices Drinks",
                    key: id,
                    disabled: i === 28,
                    children: i === 0 ? <Appetizers /> : i === 1 ? <MainEntries /> : i === 2 ? <Desserts /> : i === 3 ? <TeaCoffe /> : <JuiceDrink />,
                };
                })}
            />
        </div>
    </div>
  )
}

export default Courses