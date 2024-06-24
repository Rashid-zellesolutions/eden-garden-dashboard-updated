import React from 'react'
import InputField from '../../../InputField'

const Packages = ({heading,  Namevalue, readOnly, Costvalue, pacForvalue, constantValue}) => {
  return (
    <div style={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
        flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
        padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
    }}>
        <div style={{
            marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
            fontWeight: '600'
        }}>
            <span>{heading}</span>
        </div>
        <div style={{width: '100%'}}>
            <div style={{width: '100%', display: 'flex', gap:'15px'}}>
                <div style={{width: '100%', display: 'flex', gap:'15px'}}>
                    <InputField 
                    label={'Name'}
                        width={'30%'}
                        value={Namevalue}
                    />
                    <InputField 
                        label={'Cost'}
                        width={'30%'}
                        value={Costvalue}
                    />
                    <InputField 
                        label={'PacFor'}
                        width={'30%'}
                        value={pacForvalue}
                    />
                    <InputField 
                        label={'Constant'}
                        width={'30%'}
                        value={constantValue}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Packages
