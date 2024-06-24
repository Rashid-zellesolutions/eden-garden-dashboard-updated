import React, { useEffect, useState } from 'react'
import InputField from '../../../../InputField'
import Loader from '../../../../Loader'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const UpdateJuiceDrinks = () => {
    const [loading, setLoading] = useState(true)
    const [juiceDrinkData, setJuiceDrink] = useState({
        name: '',
        cost: '',
        pacFor: '',
        juiceDrinkImage: null
    })
    const {id} = useParams()
    console.log(id)
    setTimeout(() => {
        setLoading(false);
    }, 2000)
    useEffect(() => {
        const fetchSingleProduct = async() => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/JuicesDrinks/get-single-juice-drink/${id}`)
                console.log(response.data.juiceDrinkObj)
                setJuiceDrink(response.data.juiceDrinkObj)
            } catch (error) {
                console.error("Error Feching Data", error);
            }
        }
        fetchSingleProduct();
    }, [id])
    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setJuiceDrink(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log("Tea Coffe Data after input change:", juiceDrinkData);
    }
    // const handleImageChange = (info) => {
    //     if (info.file.status === 'done' || info.file.status === 'uploading') {
    //         const file = info.file.originFileObj;
    //         setAppetizerData((prevState) => ({
    //             ...prevState,
    //             appetizerImage: file,
    //         }));
    //         console.log("Appetizer Data after image change:", appetizerData);
    //     }
    //     console.log("Image info:", info);
    // };
    const handleImageChange = (e) => {
        setJuiceDrink({...juiceDrinkData, juiceDrinkImage: e.target.files[0]});
    }
    
    console.log(juiceDrinkData.juiceDrinkImage);
    
    const handleJuiceDrinkUpdate = async(e) => {
        e.preventDefault();
        // console.log(appetizerData.appetizerImage)
        const formData = new FormData();
        formData.append('name', juiceDrinkData.name);
        formData.append('cost', juiceDrinkData.cost);
        formData.append('pacFor', juiceDrinkData.pacFor);
        formData.append('juiceDrinkImage', juiceDrinkData.juiceDrinkImage);
        // if (appetizerData.appetizerImage) {
        //     formData.append('appetizerImage', appetizerData.appetizerImage); // Append image file
        // }
        console.log(formData)

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/JuicesDrinks/update-juices-drinks/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data);
            alert("Data Updated")
        } catch (error) {
            console.error("Error Updating Appetizer", error);
        }
    }
  return (
    <div style={{width: '100%'}}>
        {loading ? <Loader /> : null}
        <div style={{width: '100%', padding: '10px 25px'}}>
            <form onSubmit={handleJuiceDrinkUpdate} style={{width: '100%'}}>
                <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                    flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
                    padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
                }}>
                    <div style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}>
                        <span> Update JuiceDrinks </span>
                    </div>
                    <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                        <InputField 
                            width={'100%'}
                            value={juiceDrinkData.name}
                            required
                            name={'name'}
                            onChange={handleInputsChange}
                        />
                        <InputField 
                            width={'100%'}
                            value={juiceDrinkData.cost}
                            required
                            name={'cost'}
                            onChange={handleInputsChange}
                        />
                        <InputField 
                            width={'100%'}
                            value={juiceDrinkData.pacFor}
                            required
                            name={'pacFor'}
                            onChange={handleInputsChange}
                        />
                        <InputField 
                            type={'file'}
                            onChange={handleImageChange}
                            name='juiceDrinkImage'
                            width={'100%'}
                        />
                        {/* <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{marginTop: '-18px', marginBottom: '5px'}}></label>
                                <Upload 
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    type='file'
                                    onChange={handleImageChange}
                                    name='appetizerImage'
                                    multiple={false}
                                    width={'100%'}
                                    height={350}
                                    style={{width: '100% !important' , marginTop: -30}}
                                >
                                    <Button style={{width: '100% !important'}} icon={<UploadOutlined />}> Click </Button>
                                </Upload>
                        </div> */}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                        <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateJuiceDrinks
