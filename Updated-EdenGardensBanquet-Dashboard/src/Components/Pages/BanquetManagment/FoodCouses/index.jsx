import React, { useState } from 'react'
import Loader from '../../../Loader';
import InputField from '../../../InputField';
import { Button, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.css'

const FoodCouses = () => {
    const [loader, setLoader] = useState(true)
    const [appetizer, setAppetizer] = useState({
        name: '',
        pacFor: '',
        cost: '',
        appetizerImage: null
    })
    const [mainEntries, setMainEntries] = useState({
        name: '',
        pacFor: '',
        cost: '',
        mainEntriesImage: null
    })
    const [dessert, setDessert] = useState({
        name: '',
        pacFor: '',
        cost: '',
        dessertImage: null
    });
    const [teaCoffe, setTeaCoffe] = useState({
        name: '',
        pacFor: '',
        cost: '',
        teaCoffeeImage: null
    });
    const [juicesDrinks, setJuicesDrinks] = useState({
        name: '',
        pacFor: '',
        cost: '',
        juiceDrinkImage: null
    })

    // Appetizers
    const handleAppetizerChange = (field, value) => {
        setAppetizer({...appetizer, [field]: value})
    }
    const handleAppetizerImage = (info) => {
        // setAppetizer({...appetizer, [e.target.name]: e.target.files[0]})
        if (info.file.status === 'done' || info.file.status === 'uploading') {
            const file = info.file.originFileObj;
            setAppetizer((prevState) => ({
              ...prevState,
              appetizerImage: file,
            }));
          }
    }

    // Main Entries
    const handleMainEntriesChange = (field, value) => {
        setMainEntries({...mainEntries, [field]: value});
    }
    const handleMainEntriesImage = (info) => {
        if (info.file.status === 'done' || info.file.status === 'uploading') {
            const file = info.file.originFileObj;
            setMainEntries((prevState) => ({
              ...prevState,
              mainEntriesImage: file,
            }));
        }
    }

    // Dessert 
    const handleDessertChange = (field, value) => {
        setDessert({...dessert, [field]: value});
    }
    const handleDessertImage = (info) => {
        if (info.file.status === 'done' || info.file.status === 'uploading') {
            const file = info.file.originFileObj;
            setDessert((prevState) => ({
              ...prevState,
              dessertImage: file,
            }));
        }
    }

    // Tea Coffe
    const handleTeaCoffeChange = (field, value) => {
        setTeaCoffe({...teaCoffe, [field]: value});
    }
    const handleTeaCoffeImage = (info) => {
        if (info.file.status === 'done' || info.file.status === 'uploading') {
            const file = info.file.originFileObj;
            setTeaCoffe((prevState) => ({
              ...prevState,
              teaCoffeeImage: file,
            }));
        }
    }

    // Juices Drinks
    const handleJuicesDrinksChange = (field, value) => {
        setJuicesDrinks({...juicesDrinks, [field]: value});
    }
    const handleJuicesDrinksImage = (info) => {
        if (info.file.status === 'done' || info.file.status === 'uploading') {
          const file = info.file.originFileObj;
          setJuicesDrinks((prevState) => ({
            ...prevState,
            juiceDrinkImage: file,
          }));
        }
      };


    setTimeout(() => {
        setLoader(false);
    }, 2000)

    const inputFields = [
        {type: "text", placholder: "Name", label: "name"},
        {type: "text", placholder: "PacFor", label: "pacFor"},
        {type: "text", placholder: "Cost", label: "cost"},
        {type: "file", label: "Icon",}
    ]

    const handleSubmitAppetizer = async(e) => {
        e.preventDefault();
        console.log(appetizer)
        try {
            const formData = new FormData();
            formData.append('name', appetizer.name);
            formData.append('pacFor', appetizer.pacFor);
            formData.append('cost', appetizer.cost);
            formData.append('appetizerImage', appetizer.appetizerImage);
            const response = await axios.post('http://localhost:8080/api/v1/Appetizers/add-appetizer', formData , {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert("Appetizers Added")
        } catch (error) {
            console.error("error", error);
        }
        // Add your submission logic here
    };

    const handleSubmitMainEntries = async(e) => {
        e.preventDefault();
        console.log(mainEntries)
        try {
            const formData = new FormData();
            formData.append('name', mainEntries.name);
            formData.append('pacFor', mainEntries.pacFor);
            formData.append('cost', mainEntries.cost);
            formData.append('mainEntriesImage', mainEntries.mainEntriesImage);
            const response = await axios.post('http://localhost:8080/api/v1/MainEntries/add-main-entries', formData , {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert("Main Entries Added")
        } catch (error) {
            console.error("error", error);
        }
    };

    const handleSubmitDessert = async(e) => {
        e.preventDefault();
        console.log(dessert)
        try {
            const formData = new FormData();
            formData.append('name', dessert.name);
            formData.append('pacFor', dessert.pacFor);
            formData.append('cost', dessert.cost);
            formData.append('dessertImage', dessert.dessertImage);
            const response = await axios.post('http://localhost:8080/api/v1/Dessert/add-dessert', formData , {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert("desserts Added")
        } catch (error) {
            console.error("error", error);
        }
    };

    const handleSubmitteaCoffee = async(e) => {
        e.preventDefault();
        console.log(teaCoffe)
        try {
            const formData = new FormData();
            formData.append('name', teaCoffe.name);
            formData.append('pacFor', teaCoffe.pacFor);
            formData.append('cost', teaCoffe.cost);
            formData.append('teaCoffeeImage', teaCoffe.teaCoffeeImage);
            const response = await axios.post('http://localhost:8080/api/v1/TeaCoffee/add-tea-coffe', formData , {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert("Tea Coffe Added")
        } catch (error) {
            console.error("error", error);
        }
    };

    const handleSubmitJuicesDrinks = async(e) => {
        e.preventDefault();
        console.log(juicesDrinks)
        try {
            const formData = new FormData();
            formData.append('name', juicesDrinks.name);
            formData.append('pacFor', juicesDrinks.pacFor);
            formData.append('cost', juicesDrinks.cost);
            formData.append('juiceDrinkImage', juicesDrinks.juiceDrinkImage);
            const response = await axios.post('http://localhost:8080/api/v1/JuicesDrinks/add-juices-drinks', formData , {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert("Juices Drinks Added")
        } catch (error) {
            console.error("error", error);
        }
    };

    return (
    <div className='food-couses-container'>
        {loader ? <Loader /> : null}
        <div className='input-wrapper' style={{width: '100%', padding: '10px 25px'}}>

            {/* Appetizer Form */}
            <form onSubmit={handleSubmitAppetizer} style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
            }}>
                <div 
                    className='heading'
                    style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}
                >
                    <span>
                        Appetizer
                    </span>
                </div>
                <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                    {inputFields.map((field, i) => {
                        return field.type === 'file' ?( 
                            // <InputField 
                            //     key={i} 
                            //     placeholder={field.placholder} 
                            //     label={field.label} 
                            //     type={field.type} 
                            //     width={"100%"} 
                            //     onChange={handleAppetizerImage}
                            //     name={'appetizersImage'}
                            // /> 
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{marginTop: '-18px', color: '#73787c', fontWeight: '500', fontFamily: 'poppins !important', marginBottom: '5px'}}>{field.label}</label>
                                <Upload 
                                    showUploadList={false}
                                    beforeUpload={false}
                                    onChange={handleAppetizerImage}
                                    name='appetizerImage'
                                    multiple={false}
                                    width={'100%'}
                                    height={350}
                                    style={{width: '100% !important' , marginTop: -30}}
                                >
                                    <Button style={{width: '100% !important'}} icon={<UploadOutlined />}> Click </Button>
                                </Upload>
                            </div>
                        ) : (
                            <InputField 
                                key={i} 
                                placeholder={field.placholder} 
                                label={field.label} 
                                type={field.type} 
                                onChange={(e) => handleAppetizerChange(field.label, e.target.value)}
                                width={"100%"} 
                            />
                        ) 
                    })}
                </div>
                <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                </div>
            </form>
            
            {/* Main Entries Form */}
            <form onSubmit={handleSubmitMainEntries} style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
            }}>
                <div 
                    className='heading'
                    style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}
                >
                    <span>
                        Main Entries
                    </span>
                </div>
                <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                    {inputFields.map((field, i) => {
                        return field.type === 'file' ?(
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{marginTop: '-18px', color: '#73787c', fontWeight: '500', fontFamily: 'poppins !important', marginBottom: '5px'}}>{field.label}</label>
                                <Upload 
                                    showUploadList={false}
                                    onChange={handleMainEntriesImage}
                                    name='mainEntriesImage'
                                    multiple={false}
                                    width={'100%'}
                                    height={350}
                                    style={{width: '100% !important' , marginTop: -30}}
                                >
                                    <Button style={{width: '100% !important'}} icon={<UploadOutlined />}> Click </Button>
                                </Upload>
                            </div> 
                        ) : (
                            <InputField 
                                key={i} 
                                placeholder={field.placholder} 
                                label={field.label} 
                                type={field.type} 
                                onChange={(e) => handleMainEntriesChange(field.label, e.target.value)}
                                width={"100%"} 
                            />
                        ) 
                    })}
                </div>
                <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                </div>
            </form>
            
            {/* Dessert Form */}
            <form onSubmit={handleSubmitDessert} style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
            }}>
                <div 
                    className='heading'
                    style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}
                >
                    <span>
                        Desserts
                    </span>
                </div>
                <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                    {inputFields.map((field, i) => {
                        return field.type === 'file' ?( 
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{marginTop: '-18px', color: '#73787c', fontWeight: '500', fontFamily: 'poppins !important', marginBottom: '5px'}}>{field.label}</label>
                                <Upload 
                                    showUploadList={false}
                                    onChange={handleDessertImage}
                                    name='dessertImage'
                                    multiple={false}
                                    width={'100%'}
                                    height={350}
                                    style={{width: '100% !important' , marginTop: -30}}
                                >
                                    <Button style={{width: '100% !important'}} icon={<UploadOutlined />}> Click </Button>
                                </Upload>
                            </div> 
                        ) : (
                            <InputField 
                                key={i} 
                                placeholder={field.placholder} 
                                label={field.label} 
                                type={field.type} 
                                onChange={(e) => handleDessertChange(field.label, e.target.value)}
                                width={"100%"} 
                            />
                        ) 
                    })}
                </div>
                <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                </div>
            </form>

            {/* Tea Coffe */}
            <form onSubmit={handleSubmitteaCoffee} style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
            }}>
                <div 
                    className='heading'
                    style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}
                >
                    <span>
                        Tea Coffe
                    </span>
                </div>
                <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                    {inputFields.map((field, i) => {
                        return field.type === 'file' ?( 
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{marginTop: '-18px', color: '#73787c', fontWeight: '500', fontFamily: 'poppins !important', marginBottom: '5px'}}>{field.label}</label>
                                <Upload 
                                    showUploadList={false}
                                    onChange={handleTeaCoffeImage}
                                    name='teaCoffeeImage'
                                    multiple={false}
                                    width={'100%'}
                                    height={350}
                                    style={{width: '100% !important' , marginTop: -30}}
                                >
                                    <Button style={{width: '100% !important'}} icon={<UploadOutlined />}> Click </Button>
                                </Upload>
                            </div> 
                        ) : (
                            <InputField 
                                key={i} 
                                placeholder={field.placholder} 
                                label={field.label} 
                                type={field.type} 
                                onChange={(e) => handleTeaCoffeChange(field.label, e.target.value)}
                                width={"100%"} 
                            />
                        ) 
                    })}
                </div>
                <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                </div>
            </form>

            {/* Juices Drinks */}
            <form onSubmit={handleSubmitJuicesDrinks} style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
            }}>
                <div 
                    className='heading'
                    style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}
                >
                    <span>
                        Juices Drinks
                    </span>
                </div>
                <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                    {inputFields.map((field, i) => {
                        return field.type === 'file' ?(
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{marginTop: '-18px', color: '#73787c', fontWeight: '500', fontFamily: 'poppins !important', marginBottom: '5px'}}>{field.label}</label>
                                <Upload 
                                showUploadList={false}
                                onChange={handleJuicesDrinksImage}
                                name='juiceDrinkImage'
                                multiple={false}
                                width={'100%'}
                                height={350}
                                style={{width: '100% !important' , marginTop: -30}}
                            >
                                <Button style={{width: '100% !important'}} icon={<UploadOutlined />}> Click </Button>
                            </Upload>
                            </div>
                        ) : (
                            <InputField 
                                key={i} 
                                placeholder={field.placholder} 
                                label={field.label} 
                                type={field.type} 
                                onChange={(e) => handleJuicesDrinksChange(field.label, e.target.value)}
                                width={"100%"} 
                            />
                        ) 
                    })}
                </div>
                <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default FoodCouses;
