import { Tabs } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Consultant from "../../Consultant";
import EventType from "../../EventType";
import Stage from "../../Stage";
import Vendors from "../../Vendors";
import Venue from "../../Venue";
import EventType2 from "../BanquetManagment/Dining/DiningComponents/addEventType";
import StageTable from "../BanquetManagment/Decor/DecorTables/StageTable";
import VenueWorking from "../BanquetManagment/Decor/DecorTables/venueWorking";
import Supplies from "../Supplies/Supplies";

function Other() {
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("data"))
    useEffect(() => {
        if (!userData.token) {
            navigate("/Login")
            return
        } else {
            return
        }
    }, [userData])
    return (
        <div className='add-booking-container'>
            <Tabs
                defaultActiveKey="0"
                tabPosition={"right"}
                style={{
                    height: 300,
                }}
                items={["Venue", "Event Type", "Stage", "Consultant", "Vendors","Supplies"].fill(null).map((e, i) => {
                    const id = String(i);
                    return {
                        label: i === 0 ? `Venue` : i === 1 ? "Event Type" : i === 2 ? "Stage" : i === 3 ? "Consultant" :i===4? "Vendors" :"Supplies",
                        key: id,
                        disabled: i === 28,
                        children: i === 0 ? <VenueWorking /> : i === 1 ? <EventType2 /> : i === 2 ? < StageTable /> : i===3?<Consultant />: i===4?<Vendors/> :<Supplies/>,
                    };
                })}
            />
        </div>
    )
}
export default Other