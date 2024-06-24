import React from 'react'
import {Tabs } from 'antd';
import DiningStyle from './DiningComponents/DiningStyle';
import CutleryStyle from './DiningComponents/CutleryStyle';
import EventType2 from './DiningComponents/addEventType';

const ShowDinings = () => {
  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
      
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Dining Styles","Cutlery Styles", "Event Type"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Dining Styles`  : i === 1 ? "Cutlery Styles" : "",
                    key: id,
                    disabled: i === 28,
                    children: i === 0 ? <DiningStyle />  : i === 1 ? <CutleryStyle /> : <></>,
                };
                })}
            />
        </div>
    </div>
  )
}

export default ShowDinings