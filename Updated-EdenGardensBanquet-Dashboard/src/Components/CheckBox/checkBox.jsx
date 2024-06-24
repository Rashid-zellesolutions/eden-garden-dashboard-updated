import './checkbox.css'

function CheckBox({labelText,isChecked,onChange}) {
    return(
        <div style={{display:"flex"}}>
            <div class="checkbox-wrapper-19">
            <input type="checkbox" id="cbtest-19" checked={isChecked} onChange={onChange} />
            <label for="cbtest-19" class="check-box"/>
            </div>
            <p style={{marginLeft:'10px',color:"#78737C",fontSize:'16px',fontFamily:'Poppins'}}>{labelText}</p>
        </div>
        )
        
}

export default CheckBox;