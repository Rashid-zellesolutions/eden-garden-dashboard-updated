import React, { useEffect, useState } from 'react'
import Loader from '../../../Loader';
import InputField from '../../../InputField';
import { Button, Space, Select } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import './module.FoodType.css'
import axios from 'axios';

const FoodTypeTwoo = () => {
  const [loading, setLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Packages
  const [appetizers, setAppetizers] = useState([]);
  const [mainEntries, setMainEntries] = useState([]);
  const [desserts, setDesserts] = useState([]);;
  const [teaCoffe, setTeaCoffe] = useState([]);
  const [juicesDrinks, setJuicesDrinks] = useState([])
  const [formData, setFormData] = useState({
    foodType: '',
    value: '', // This field corresponds to the 'value' property in the schema
    packages: []
});

  setTimeout(() => {
    setLoading(false);
}, 2000)

  useEffect(() => {
    const fetchPackagesData = async() => {
      // Appetizer
      const Appetizer_Response = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer');
      setAppetizers(Appetizer_Response.data.appetizerObj)

      // Main Entries
      const Main_Entries_Response = await axios.get('http://localhost:8080/api/v1/MainEntries/get-main-entries');
      setMainEntries(Main_Entries_Response.data.mainEntriesObj)

      // Desserts
      const Dessert_Response = await axios.get('http://localhost:8080/api/v1/Dessert/get-dessert');
      setDesserts(Dessert_Response.data.dessertObj)

      // Tea Coffe Request
      const teaCoffe_Response = await axios.get('http://localhost:8080/api/v1/TeaCoffee/get-tea-coffee');
      setTeaCoffe(teaCoffe_Response.data.teaCoffeObj)

      // Juices Drinks
      const juices_Drinks_Response = await axios.get('http://localhost:8080/api/v1/JuicesDrinks/get-juices-drinks');
      setJuicesDrinks(juices_Drinks_Response.data.juiceDrinkObj)
      

    }
    fetchPackagesData()
  }, [isCheck])

  const showPackages = (e) => {
    setShowOptions(!showOptions);
    setIsCheck(e.target.checked)
    console.log(isCheck)
  }
  const handleFoodType = (e) => {
    const { value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      foodType: value,
      value: value.toLowerCase()
    }));
  };

  // const handlePackageName = (e) => {
  //   const { value } = e.target;

  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     packages: prevFormData.packages.map((pkg, index) =>
  //       index === 0 ? { ...pkg, name: value } : pkg
  //     )
  //   }));
  // };
  const handlePackageName = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      packages: [{ ...prevFormData.packages[0], name: value }]
    }));
  };

  const handleAppetizerPackage = (value) => {
    const selectedItems = value.map(name => appetizers.find(item => item.name === name));
    
    setFormData(prevState => {
        const updatedPackages = prevState.packages.map(pkg => ({
            ...pkg,
            appetizers: selectedItems
        }));
        return { ...prevState, packages: updatedPackages };
    });
};

  const handleMainEntriesPackage = (value, option) => {
    // Find the selected appetizer object based on the selected value
    const selectedMainEntries = mainEntries.find(item => item.name === value);

    if(selectedMainEntries){
      const updatedMainEntries = {...selectedMainEntries, constant: 'true'};
    

    // Update the form data with the selected appetizer object
    setFormData(prevFormData => ({
      ...prevFormData,
      packages: prevFormData.packages.map(pkg =>
        pkg.id === updatedMainEntries.packageId ? { ...pkg, mainEntries: updatedMainEntries } : pkg
      )
    }));
    console.log("main entries object", updatedMainEntries)
  }
  };

  const handledessertPackage = (value, option) => {
    // Find the selected appetizer object based on the selected value
    const selectedDessert = desserts.find(item => item.name === value);

    if(selectedDessert){
      const updatedDessert = {...selectedDessert, constant: 'true'};
    

    // Update the form data with the selected appetizer object
    setFormData(prevFormData => ({
      ...prevFormData,
      packages: prevFormData.packages.map(pkg =>
        pkg.id === updatedDessert.packageId ? { ...pkg, desserts: updatedDessert } : pkg
      )
    }));
    // console.log(updatedMainEntries)
  }
  };

  const handleTeaCoffePackage = (value, option) => {
    // Find the selected appetizer object based on the selected value
    const selectedTeaCoffe = teaCoffe.find(item => item.name === value);

    if(selectedTeaCoffe){
      const updatedTeaCoffe = {...selectedTeaCoffe, constant: 'true'};
    

    // Update the form data with the selected appetizer object
    setFormData(prevFormData => ({
      ...prevFormData,
      packages: prevFormData.packages.map(pkg =>
        pkg.id === updatedTeaCoffe.packageId ? { ...pkg, teaCoffe: updatedTeaCoffe } : pkg
      )
    }));
    // console.log(updatedMainEntries)
  }
  };

  const handleJuicesDrinksPackage = (value, option) => {
    // Find the selected appetizer object based on the selected value
    const selectedJuicesDrinks = juicesDrinks.find(item => item.name === value);

    if(selectedJuicesDrinks){
      const updatedJuicesDrinks = {...selectedJuicesDrinks, constant: 'true'};
    

    // Update the form data with the selected appetizer object
    setFormData(prevFormData => ({
      ...prevFormData,
      packages: prevFormData.packages.map(pkg =>
        pkg.id === updatedJuicesDrinks.packageId ? { ...pkg, juicesDrinks: updatedJuicesDrinks } : pkg
      )
    }));
    // console.log(updatedMainEntries)
  }
  };

  useEffect(() => {
    console.log(formData.packages);
  }, [formData]);

  const resetUnselectedFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      packages: prevFormData.packages.map((pkg) => ({
        ...pkg,
        appetizers: pkg.appetizers ? pkg.appetizers : null,
        mainEntries: pkg.mainEntries ? pkg.mainEntries : null,
        desserts: pkg.desserts ? pkg.desserts : null,
        teaCoffe: pkg.teaCoffe ? pkg.teaCoffe : null,
        juicesDrinks: pkg.juicesDrinks ? pkg.juicesDrinks : null,
      })),
    }));
  };

  const SubmitFoodType = async(e) => {
    e.preventDefault()
    resetUnselectedFields()
    try {
      const response = await axios.post('http://localhost:8080/api/v1/FoodType/add-food-type', formData);
      console.log('FoodType created:', response.data);
      alert("Food type Added");
    } catch (error) {
      console.error("Error Adding Food Type");
    }
  }

  return (
    <div className='add-food-container'>
      {loading ? <Loader /> : null}
      <div className='input-wrapper' style={{width: '100%', padding: '10px 25px'}}>
      <form onSubmit={SubmitFoodType} style={{width: '100%'}}>
        <div style={{
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
                        Add Food Type
                    </span>
                </div>
                <div style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '15px',
                }}>
                    <div style={{width: '100%'}}>
                      <InputField 
                        label={'Add Food'}
                        width={'30%'}
                        onChange={handleFoodType}
                        name={'foodType'}
                        placeholder={'Describe Food Type'}
                      />
                      <Checkbox 
                        onChange={showPackages}
                        name='showOptions'
                        id='showOptions'
                      > Packages Include</Checkbox>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'end', width: '100%'}}>
                    <Button type="primary" htmlType="submit" style={{ display: 'inline-block', height: "35px", width: "20%", background: "black", right: '0' }} className="custom-hover-btn">Proceed</Button>
                </div>
            </div>
            {showOptions && (
              <div style={{
                width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
                flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0,0,0,0.16) 0px 1px 4px',
                padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
              }}>
                <div style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}>
                  <span>Add Packages</span>
                </div>
                <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{
                    display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'start', gap: '15px',
                    
                  }}>
                    {/* Package Name */}
                    <InputField 
                      placeholder={'Enter Package Name'}
                      width={'100%'}
                      label={'Enter Name'}
                      onChange={handlePackageName}
                      name={'packageName'}
                    />

                    {/* Appetizers */}
                    <div style={{width: '100%'}}>
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
                        defaultValue="Appetizers"
                        mode='multiple'
                        onChange={handleAppetizerPackage}
                        options={appetizers.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                    {/* Main Entries */}
                    <div style={{width: '100%'}}>
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
                        defaultValue="Main Entries"
                        onChange={handleMainEntriesPackage}
                        options={mainEntries.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                  </div>
                  <div style={{display: 'flex', width: '100%', gap: '15px', justifyContent: 'center', 
                    alignItems: 'center',
                  }}>
                    {/* Desserts */}
                    <div style={{width: '100%'}}>
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
                        defaultValue="Desserts"
                        onChange={handledessertPackage}
                        options={desserts.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                    {/* Tea Coffe */}
                    <div style={{width: '100%'}}>
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
                        defaultValue="Tea And Coffe"
                        onChange={handleTeaCoffePackage}
                        options={teaCoffe.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                    {/* Juices Drinks */}
                    <div style={{width: '100%'}}>
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
                        defaultValue="Juices And Drinks"
                        onChange={handleJuicesDrinksPackage}
                        options={juicesDrinks.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </form>
      </div>
    </div>
  )
}

export default FoodTypeTwoo