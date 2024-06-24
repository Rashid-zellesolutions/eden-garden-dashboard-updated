import React, { useEffect, useState } from "react";
import './components.css';
import { Spin } from "antd";

function DashboardTab(props) {
  const [isLoading, setIsLoading] = useState(true);
  // console.log(props);
  // useEffect(() => {
  //   // setIsLoading(true)
  //   if (props.value) {
  //     setIsLoading(false)
  //   }
  // }, [props.value]);

  useEffect(() => {
    // setIsLoading(true);

    // Assuming that the filtering logic is asynchronous, you might need to use a Promise or some async logic here.
    // For simplicity, I'll use a setTimeout to simulate the asynchronous behavior.
    setTimeout(() => {
      if (props.value !== undefined) {
        setIsLoading(false);
      } else {
        setIsLoading(false); // If value is undefined or has length 0, consider it as loaded
      }
    }, 1000); // You can adjust the timeout value as needed.
  }, [props.value]);
  return <div className="mainDBtab">
    <div className="dbTabBoundary">
      <div className="dbHeading">
        <h1 className="tab-heading" style={{fontSize: '14px'}}>{props.heading}</h1>
      </div>
      <img className="tab-img" src={props.image} alt="" srcSet="" />
      {isLoading ? (
        <div className="mainContentLoader" >
          <Spin style={{ color: "#b78953", background: "#b78953" }} wrapperClassName="spin-color" size="small">
            <div className="content" style={{ color: "#b78953" }} />
          </Spin>
        </div>
      ) : (
        <>
          <div className="mainContentDB" style={{display: 'flex', gap: '5px'}}>
            <h2 className="tab-number" >{props.value}</h2>
            <h4 className="tab-num-heading">{props.unit}</h4>
          </div>
        </>
      )}
    </div>
    <div className="dbBorderHider">

    </div>
  </div>
}

export default DashboardTab;