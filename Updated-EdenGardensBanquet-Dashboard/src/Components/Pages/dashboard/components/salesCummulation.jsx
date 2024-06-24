import React, { useState } from "react";
import './components.css'
import increaseI from '../../../../assets/increase.png'
import decreaseI from '../../../../assets/decrease.png'


function SaleCummulation({ refundAmount, receivedTotalAmount, balnaceAmount }) {
    return <div className="saleCummulation">
        <div className="tabSaleCm1">
            <div className="section1TabSal">
                <h1>$ { parseFloat(receivedTotalAmount).toLocaleString('en-US')}</h1>
                <h4>Total Amount</h4>
            </div>
            <div style={{ width: '10px' }}></div>
            <div className="section2TabSal">
                <img src={increaseI} alt="" srcset="" />
                <div className="section2TabSalA">
                    <h3>+ 85%</h3>
                    <h5>last week</h5>
                </div>
            </div>
        </div>
        <div className="tabSaleCm2">
            <div className="section1TabSal">
                <h1>$ { parseFloat(refundAmount).toLocaleString('en-US')}</h1>
                <h4>Refund Amount</h4>
            </div>
            <div style={{ width: '10px' }}></div>
            <div className="section2TabSal">
                <img src={increaseI} alt="" srcset="" />
                <div className="section2TabSalA">
                    <h3>+ 50%</h3>
                    <h5>last week</h5>
                </div>
            </div>
        </div>
        <div className="tabSaleCm3">
            <div className="section1TabSal">
                <h1>$ { parseFloat(balnaceAmount).toLocaleString('en-US')}</h1>
                <h4>Balance Amount</h4>
            </div>
            <div style={{ width: '10px' }}></div>
            <div className="section2TabSal">
                <img src={decreaseI} alt="" srcset="" />
                <div className="section2TabSalA">
                    <h3>- 85%</h3>
                    <h5>last week</h5>
                </div>
            </div>
        </div>
    </div>
}

export default SaleCummulation;