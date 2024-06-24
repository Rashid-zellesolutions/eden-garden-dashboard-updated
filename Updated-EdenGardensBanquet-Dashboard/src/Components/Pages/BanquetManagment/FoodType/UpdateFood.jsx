// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import InputField from '../../../InputField'
// import Packages from './Packages'
// import { Button } from 'antd'
// import { Select, Space } from 'antd';
// import './module.FoodType.css'
// import { Link } from 'react-router-dom'

// const UpdateFood = () => {
//     const {id} = useParams()
//     const [appetizers, setAppetizers] = useState([]);
//     const [mainEntries, setMainEntries] = useState([]);
//     const [desserts, setDesserts] = useState([]);;
//     const [teaCoffe, setTeaCoffe] = useState([]);
//     const [juicesDrinks, setJuicesDrinks] = useState([])
//     const [formData, setFormData] = useState({
//         foodType: '',
//         value: '', 
//         packages: [
//             {
//                 name: '', 
//                 appetizers: null,
//                 mainEntries: null,
//                 desserts: null,
//                 teaCoffe: null,
//                 juicesDrinks: null
//             }
//         ]
//     });
//     useEffect(() => {
//         const fetchSingleFoodType = async() => {
//             const response = await axios.get(`http://localhost:8080/api/v1/FoodType/get-single-food/${id}`)
//             // console.log(response.data.foodTypeObj)
//             setFormData(response.data.foodTypeObj)
//         }
//         fetchSingleFoodType()
//         const fetchPackagesData = async() => {
//             // Appetizer
//             const Appetizer_Response = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer');
//             setAppetizers(Appetizer_Response.data.appetizerObj)
      
//             // Main Entries
//             const Main_Entries_Response = await axios.get('http://localhost:8080/api/v1/MainEntries/get-main-entries');
//             setMainEntries(Main_Entries_Response.data.mainEntriesObj)
      
//             // Desserts
//             const Dessert_Response = await axios.get('http://localhost:8080/api/v1/Dessert/get-dessert');
//             setDesserts(Dessert_Response.data.dessertObj)
      
//             // Tea Coffe Request
//             const teaCoffe_Response = await axios.get('http://localhost:8080/api/v1/TeaCoffee/get-tea-coffee');
//             setTeaCoffe(teaCoffe_Response.data.teaCoffeObj)
      
//             // Juices Drinks
//             const juices_Drinks_Response = await axios.get('http://localhost:8080/api/v1/JuicesDrinks/get-juices-drinks');
//             setJuicesDrinks(juices_Drinks_Response.data.juiceDrinkObj)
            
      
//           }
//           fetchPackagesData()
//     }, [])
//     const handleFoodType = (e) => {
//         const { value } = e.target;
    
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           foodType: value,
//         //   value: value.toLowerCase()
//         }));
//       };
//       const handlePackageName = (e) => {
//         const { value } = e.target;
    
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           packages: prevFormData.packages.map((pkg, index) =>
//             index === 0 ? { ...pkg, name: value } : pkg
//           )
//         }));
//       };

//       const handleAppetizerPackage = (value, option) => {
//         // Find the selected appetizer object based on the selected value
//         const selectedAppetizer = appetizers.find(item => item.name === value);
    
//         if(selectedAppetizer){
    
//         const updatedAppetizer = {...selectedAppetizer, constant: 'true'}
//         // Update the form data with the selected appetizer object
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           packages: prevFormData.packages.map(pkg =>
//             pkg.id === updatedAppetizer.packageId ? { ...pkg, appetizers: updatedAppetizer } : pkg
//           )
//         }));
//       }
//       };
    
//       const handleMainEntriesPackage = (value, option) => {
//         // Find the selected appetizer object based on the selected value
//         const selectedMainEntries = mainEntries.find(item => item.name === value);
    
//         if(selectedMainEntries){
//           const updatedMainEntries = {...selectedMainEntries, constant: 'true'};
        
    
//         // Update the form data with the selected appetizer object
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           packages: prevFormData.packages.map(pkg =>
//             pkg.id === updatedMainEntries.packageId ? { ...pkg, mainEntries: updatedMainEntries } : pkg
//           )
//         }));
//         // console.log(updatedMainEntries)
//       }
//       };
    
//       const handledessertPackage = (value, option) => {
//         // Find the selected appetizer object based on the selected value
//         const selectedDessert = desserts.find(item => item.name === value);
    
//         if(selectedDessert){
//           const updatedDessert = {...selectedDessert, constant: 'true'};
        
    
//         // Update the form data with the selected appetizer object
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           packages: prevFormData.packages.map(pkg =>
//             pkg.id === updatedDessert.packageId ? { ...pkg, desserts: updatedDessert } : pkg
//           )
//         }));
//         // console.log(updatedMainEntries)
//       }
//       };
    
//       const handleTeaCoffePackage = (value, option) => {
//         // Find the selected appetizer object based on the selected value
//         const selectedTeaCoffe = teaCoffe.find(item => item.name === value);
    
//         if(selectedTeaCoffe){
//           const updatedTeaCoffe = {...selectedTeaCoffe, constant: 'true'};
        
    
//         // Update the form data with the selected appetizer object
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           packages: prevFormData.packages.map(pkg =>
//             pkg.id === updatedTeaCoffe.packageId ? { ...pkg, teaCoffe: updatedTeaCoffe } : pkg
//           )
//         }));
//         // console.log(updatedMainEntries)
//       }
//       };
    
//       const handleJuicesDrinksPackage = (value, option) => {
//         // Find the selected appetizer object based on the selected value
//         const selectedJuicesDrinks = juicesDrinks.find(item => item.name === value);
    
//         if(selectedJuicesDrinks){
//           const updatedJuicesDrinks = {...selectedJuicesDrinks, constant: 'true'};
        
    
//         // Update the form data with the selected appetizer object
//         setFormData(prevFormData => ({
//           ...prevFormData,
//           packages: prevFormData.packages.map(pkg =>
//             pkg.id === updatedJuicesDrinks.packageId ? { ...pkg, juicesDrinks: updatedJuicesDrinks } : pkg
//           )
//         }));
//         // console.log(updatedMainEntries)
//       }
//       };
//       const updateFoodType = async(e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.put(`http://localhost:8080/api/v1/FoodType/update-food-type/${id}`, formData)
//             alert("Data Updated")
//         } catch (error) {
//             console.error("Error Updating Food", error)
//         }
//       }

//     useEffect(() => {
//         console.log("formObj: ",formData);
//       }, [formData]);

//   return (
//    <div style={{width: '100%', padding: '10px 25px'}}>
//     <form onSubmit={updateFoodType} style={{width: '100%'}}>
//         <div style={{
//             width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
//             flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
//             padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
//         }}>
//             <div style={{
//                 marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
//                 fontWeight: '600'
//             }}>
//                 <span>Food Type</span>
//             </div>
//             <div style={{width: '100%'}}>
//                     <div style={{width: '100%', display: 'flex', gap: '15px'}}>
//                         <InputField
//                             label={'Food Type'} 
//                             width={'30%'}
//                             name={'foodType'}
//                             value={formData.foodType}
//                             onChange={handleFoodType}
//                         />
//                         <InputField
//                                 label={'Package Name'} 
//                                 width={'30%'}
//                                 name={'package'}
//                                 value={formData.packages[0].name}
//                                 onChange={handlePackageName}
//                         />
//                     </div>
//             </div>
//         </div>
//         {/* Packages */}
//         <div style={{
//             width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
//             flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
//             padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
//         }}>
//             <div style={{
//                 marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
//                 fontWeight: '600'
//             }}>
//                 <span>Packages</span>
//             </div>
//             <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '15px'}}>
//                 <div style={{width: '100%', display: 'flex', gap: '15px'}}>
//                     <div style={{width: '33%'}}>
//                     <label
//                       style={{
//                         marginBottom: 15,
//                         fontFamily: 'poppins !important',
//                         color: '#73787c',
//                         fontWeight: '500',
//                       }}
//                       className="input-labels"
//                     >
//                       Appetizers
//                     </label>
//                     <Space wrap>
//                       <Select
//                        defaultValue={'appetizers'}
//                        onChange={handleAppetizerPackage}
//                        options={appetizers.map(item => ({
//                         value: item.name,
//                         label: item.name
//                       }))}
//                         style={{marginTop: '5px'}}
//                       />
//                     </Space>
//                     </div>
//                     <div style={{width: '33%'}}>
//                     <label
//                       style={{
//                         marginBottom: 15,
//                         fontFamily: 'poppins !important',
//                         color: '#73787c',
//                         fontWeight: '500',
//                       }}
//                       className="input-labels"
//                     >
//                       Main Entries
//                     </label>
//                     <Space wrap>
//                       <Select
//                         defaultValue="mainEntries"
//                         onChange={handleMainEntriesPackage}
//                         options={mainEntries.map(item => ({
//                           value: item.name,
//                           label: item.name
//                         }))}
//                         style={{marginTop: '5px'}}
//                       />
//                     </Space>
//                     </div>
//                     <div style={{width: '33%'}}>
//                     <label
//                       style={{
//                         marginBottom: 15,
//                         fontFamily: 'poppins !important',
//                         color: '#73787c',
//                         fontWeight: '500',
//                       }}
//                       className="input-labels"
//                     >
//                       Desserts
//                     </label>
//                     <Space wrap>
//                       <Select
//                         defaultValue="Desserts"
//                         onChange={handledessertPackage}
//                         options={desserts.map(item => ({
//                           value: item.name,
//                           label: item.name
//                         }))}
//                         style={{marginTop: '5px'}}
//                       />
//                     </Space>
//                     </div>
//                 </div>
//                 <div style={{width: '100%', display: 'flex', gap: '15px'}}>
//                     <div style={{width: '33%'}}>
//                     <label
//                       style={{
//                         marginBottom: 15,
//                         fontFamily: 'poppins !important',
//                         color: '#73787c',
//                         fontWeight: '500',
//                       }}
//                       className="input-labels"
//                     >
//                       Tea Coffe
//                     </label>
//                     <Space wrap>
//                       <Select
//                         defaultValue="teaCoffe"
//                         onChange={handleTeaCoffePackage}
//                         options={teaCoffe.map(item => ({
//                           value: item.name,
//                           label: item.name
//                         }))}
//                         style={{marginTop: '5px'}}
//                       />
//                     </Space>
//                     </div>
//                     <div style={{width: '33%'}}>
//                     <label
//                       style={{
//                         marginBottom: 15,
//                         fontFamily: 'poppins !important',
//                         color: '#73787c',
//                         fontWeight: '500',
//                       }}
//                       className="input-labels"
//                     >
//                       Juices Drinks
//                     </label>
//                     <Space wrap>
//                       <Select
//                         defaultValue="juicesDrinks"
//                         onChange={handleJuicesDrinksPackage}
//                         options={juicesDrinks.map(item => ({
//                           value: item.name,
//                           label: item.name
//                         }))}
//                         style={{marginTop: '5px'}}
//                       />
//                     </Space>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//         <div style={{display: 'flex', gap: '15px', justifyContent: 'end', width: '100%'}}>
//             <Button type="primary" htmlType="submit" 
//                 style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }} 
//                 className="custom-hover-btn">Update</Button>
//         </div>
//         </form>
//    </div>   
//   )
// }

// export default UpdateFood

import React, { useEffect, useState } from 'react';
import Loader from '../../../Loader';
import InputField from '../../../InputField';
import { Button, Space, Select } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import './module.FoodType.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateFoodType = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const [appetizers, setAppetizers] = useState([]);
  const [mainEntries, setMainEntries] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [teaCoffe, setTeaCoffe] = useState([]);
  const [juicesDrinks, setJuicesDrinks] = useState([]);

  const [formData, setFormData] = useState({
    foodType: '',
    packages: [],
  });

  useEffect(() => {
    const fetchPackagesData = async () => {
      try {
        const appetizerResponse = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer');
        setAppetizers(appetizerResponse.data.appetizerObj);

        const mainEntriesResponse = await axios.get('http://localhost:8080/api/v1/MainEntries/get-main-entries');
        setMainEntries(mainEntriesResponse.data.mainEntriesObj);

        const dessertResponse = await axios.get('http://localhost:8080/api/v1/Dessert/get-dessert');
        setDesserts(dessertResponse.data.dessertObj);

        const teaCoffeResponse = await axios.get('http://localhost:8080/api/v1/TeaCoffee/get-tea-coffee');
        setTeaCoffe(teaCoffeResponse.data.teaCoffeObj);

        const juicesDrinksResponse = await axios.get('http://localhost:8080/api/v1/JuicesDrinks/get-juices-drinks');
        setJuicesDrinks(juicesDrinksResponse.data.juiceDrinkObj);

        const foodTypeResponse = await axios.get(`http://localhost:8080/api/v1/FoodType/get-food-type/${id}`);
        setFormData(foodTypeResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPackagesData();
  }, [id]);

  const handleFoodType = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      foodType: value,
    }));
  };

  const handlePackageName = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedPackages = [...prevFormData.packages];
      updatedPackages[index] = { ...updatedPackages[index], name: value };
      return { ...prevFormData, packages: updatedPackages };
    });
  };

  const handleAppetizerPackage = (value, index) => {
    const selectedItems = value.map((name) => {
      const selectedAppetizer = appetizers.find((item) => item.name === name);
      return { ...selectedAppetizer, constant: 'true' };
    });
    updatePackageField('appetizers', selectedItems, index);
  };

  const handleMainEntriesPackage = (value, index) => {
    const selectedItems = value.map((name) => {
      const selectedMainEntries = mainEntries.find((item) => item.name === name);
      return { ...selectedMainEntries, constant: 'true' };
    });
    updatePackageField('mainEntries', selectedItems, index);
  };

  const handleDessertPackage = (value, index) => {
    const selectedItems = value.map((name) => {
      const selectedDessert = desserts.find((item) => item.name === name);
      return { ...selectedDessert, constant: 'true' };
    });
    updatePackageField('desserts', selectedItems, index);
  };

  const handleTeaCoffePackage = (value, index) => {
    const selectedItems = value.map((name) => {
      const selectedTeaCoffe = teaCoffe.find((item) => item.name === name);
      return { ...selectedTeaCoffe, constant: 'true' };
    });
    updatePackageField('teaCoffe', selectedItems, index);
  };

  const handleJuicesDrinksPackage = (value, index) => {
    const selectedItems = value.map((name) => {
      const selectedJuiceDrink = juicesDrinks.find((item) => item.name === name);
      return { ...selectedJuiceDrink, constant: 'true' };
    });
    updatePackageField('juicesDrinks', selectedItems, index);
  };

  const updatePackageField = (field, value, index) => {
    setFormData((prevFormData) => {
      const updatedPackages = [...prevFormData.packages];
      updatedPackages[index] = { 
        ...updatedPackages[index], 
        [field]: value 
      };
      return { ...prevFormData, packages: updatedPackages };
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const addPackage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      packages: [
        ...prevFormData.packages, 
        {
          name: '',
          appetizers: [],
          mainEntries: [],
          desserts: [],
          teaCoffe: [],
          juicesDrinks: []
        }
      ],
    }));
  };

  const removePackage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      packages: prevFormData.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/FoodType/update-food-type/${id}`, formData);
      console.log('FoodType updated:', response.data);
      alert('Food type Updated');
    } catch (error) {
      console.error('Error updating Food Type:', error);
    }
  };

  return (
    <div className="add-food-container">
      {loading && <Loader />}
      <div className="input-wrapper" style={{ width: '100%', padding: '10px 25px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'center',
              flexWrap: 'wrap',
              backgroundColor: '#fff',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              padding: '10px 25px',
              borderRadius: '4px',
              marginBottom: '23px',
            }}
          >
            <div
              className="heading"
              style={{
                marginBottom: '20px',
                marginTop: '10px',
                fontFamily: 'poppins',
                color: '#73787c',
                fontWeight: '600',
              }}
            >
              <span>Update Food Type</span>
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '100%' }}>
                <InputField
                  label={'Update Food'}
                  width={'30%'}
                  onChange={handleFoodType}
                  name={'foodType'}
                  placeholder={'Describe Food Type'}
                  value={formData.foodType}
                />
                <Checkbox
                  onChange={() => setShowOptions(!showOptions)}
                  name="showOptions"
                  id="showOptions"
                  checked={showOptions}
                >
                  Packages Include
                </Checkbox>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  display: 'inline-block',
                  height: '35px',
                  width: '20%',
                  background: 'black',
                  right: '0',
                }}
                className="custom-hover-btn"
              >
                Proceed
              </Button>
            </div>
          </div>

          {showOptions && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                flexWrap: 'wrap',
                backgroundColor: '#fff',
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                padding: '10px 25px',
                borderRadius: '4px',
                marginBottom: '23px',
              }}
            >
              <div
                className="heading"
                style={{
                  marginBottom: '20px',
                  marginTop: '10px',
                  fontFamily: 'poppins',
                  color: '#73787c',
                  fontWeight: '600',
                }}
              >
                <span>Update Packages</span>
              </div>
              {formData.packages.map((packageData, index) => (
                <div key={index} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'start',
                      gap: '15px',
                    }}
                  >
                    {/* Package Name */}
                    <InputField
                      placeholder={'Enter Package Name'}
                      width={'100%'}
                      label={'Enter Name'}
                      onChange={(e) => handlePackageName(e, index)}
                      name={`packageName-${index}`}
                      value={packageData.name}
                    />

                    {/* Appetizers */}
                    <div style={{ width: '100%' }}>
                      <label
                        style={{
                          marginBottom: 15,
                          fontFamily: 'poppins !important',
                          color: '#73787c',
                          fontWeight: '500',
                        }}
                        className="input-labels"
                      >
                        Appetizers
                      </label>
                      <Space wrap>
                        <Select
                          mode="multiple"
                          onChange={(value) => handleAppetizerPackage(value, index)}
                          value={(packageData.appetizers || []).map((item) => item.name)}
                          options={appetizers.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))}
                          style={{ marginTop: '5px' }}
                        />
                      </Space>
                    </div>

                    {/* Main Entries */}
                    <div style={{ width: '100%' }}>
                      <label
                        style={{
                          marginBottom: 15,
                          fontFamily: 'poppins !important',
                          color: '#73787c',
                          fontWeight: '500',
                        }}
                        className="input-labels"
                      >
                        Main Entries
                      </label>
                      <Space wrap>
                        <Select
                          mode="multiple"
                          onChange={(value) => handleMainEntriesPackage(value, index)}
                          value={(packageData.mainEntries || []).map((item) => item.name)}
                          options={mainEntries.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))}
                          style={{ marginTop: '5px' }}
                        />
                      </Space>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      gap: '15px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* Desserts */}
                    <div style={{ width: '100%' }}>
                      <label
                        style={{
                          marginBottom: 15,
                          fontFamily: 'poppins !important',
                          color: '#73787c',
                          fontWeight: '500',
                        }}
                        className="input-labels"
                      >
                        Desserts
                      </label>
                      <Space wrap>
                        <Select
                          mode="multiple"
                          onChange={(value) => handleDessertPackage(value, index)}
                          value={(packageData.desserts || []).map((item) => item.name)}
                          options={desserts.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))}
                          style={{ marginTop: '5px' }}
                        />
                      </Space>
                    </div>
                    {/* Tea Coffe */}
                    <div style={{ width: '100%' }}>
                      <label
                        style={{
                          marginBottom: 15,
                          fontFamily: 'poppins !important',
                          color: '#73787c',
                          fontWeight: '500',
                        }}
                        className="input-labels"
                      >
                        Tea Coffe
                      </label>
                      <Space wrap>
                        <Select
                          mode="multiple"
                          onChange={(value) => handleTeaCoffePackage(value, index)}
                          value={(packageData.teaCoffe || []).map((item) => item.name)}
                          options={teaCoffe.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))}
                          style={{ marginTop: '5px' }}
                        />
                      </Space>
                    </div>
                    {/* Juices Drinks */}
                    <div style={{ width: '100%' }}>
                      <label
                        style={{
                          marginBottom: 15,
                          fontFamily: 'poppins !important',
                          color: '#73787c',
                          fontWeight: '500',
                        }}
                        className="input-labels"
                      >
                        Juices Drinks
                      </label>
                      <Space wrap>
                        <Select
                          mode="multiple"
                          onChange={(value) => handleJuicesDrinksPackage(value, index)}
                          value={(packageData.juicesDrinks || []).map((item) => item.name)}
                          options={juicesDrinks.map((item) => ({
                            value: item.name,
                            label: item.name,
                          }))}
                          style={{ marginTop: '5px' }}
                        />
                      </Space>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <Button type="danger" onClick={() => removePackage(index)} style={{ marginTop: '10px' }}>
                    Remove Package
                  </Button>
                </div>
              ))}
              {/* Add Package Button */}
              <Button type="primary" onClick={addPackage} style={{ marginTop: '10px' }}>
                Add Package
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateFoodType;


