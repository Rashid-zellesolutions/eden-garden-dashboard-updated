import React, { useState, useEffect } from 'react';
import Loader from '../../Loader';

const PayRoll = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="coming-soon">
      {isLoading ? <Loader /> : 
      <div style={{
        width:'100%',
        height:'90vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
      }}>
        <h3 style={{
        fontFamily:'Poppins',color:'#353E49',textAlign:'center'
      }}>Payroll</h3>
        <h1 style={{
        fontFamily:'Poppins',color:'#B78953',textAlign:'center'
      }}>Coming Soon</h1>

      </div>
      }
    </div>
  );
};

export default PayRoll;
