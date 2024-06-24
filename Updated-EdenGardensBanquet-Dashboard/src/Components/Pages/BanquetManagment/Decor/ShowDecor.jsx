import React from 'react'
import {Tabs } from 'antd';
import SeatingTable from './DecorTables/SeatingArrangment';
import TableSelection from './DecorTables/tableSelection';
import ChairTable from './DecorTables/ChairSelection';
import StageTable from './DecorTables/StageTable';
import BackdropTable from './DecorTables/BackdropTable';
import CenterTable from './DecorTables/CenterPiecesTable';
import LightinigTable from './DecorTables/LightningTable';


const ShowDecor = () => {
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
                    children:  i === 0 ? <SeatingTable />  : i === 1 ? <ChairTable /> : i === 2 ? <BackdropTable /> : i === 3 ? <CenterTable /> : <LightinigTable />,
                };
                })}
            />
        </div>
    </div>
  )
}

export default ShowDecor