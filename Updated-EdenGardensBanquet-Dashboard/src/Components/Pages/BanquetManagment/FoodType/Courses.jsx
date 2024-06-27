import React, { useEffect, useState } from 'react'
import {Tabs } from 'antd';
import Appetizers from './Courses/Appetizers';
import MainEntries from './Courses/MainEntrees';
import Desserts from './Courses/Desserts';
import TeaCoffe from './Courses/TeaCoffe';
import JuiceDrink from './Courses/JuiceDrink';
// import AppetizersTwo from './Courses/AppetizersTwo';
import CoursesComp from './Courses/CoursesComp';
import axios from 'axios';
import { Url, Url2, hostUrl } from '../../../../env';

const Courses = () => {

    // Universel Data
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [appetizerData, setAppetizerData] = useState([]);
    const [mainEntriesData, setMainEntriesData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    const [loading, setLoading] = useState(false);
    const [packageVisible, setPackageVisible] = useState(false);
    const [dessert, setDessert] = useState([]);
    const [teaCoffe, setTeaCoffe] = useState([]);
    const [juicesDrinks, setJuicesDrinks] = useState([]);


    const addPackages = () => {
        setPackageVisible(!packageVisible);
        console.log("Clicked add packages")
    };

    // Appetizers Data 
    const [appData, setAppData] = useState({
        name: '',
        description: '',
        cost: '',
        appetizerImage: null,
    });

    const clearAppetizerForm = () => {
        setAppData({
            name: '',
            description: '',
            cost: '', 
            appetizerImage: null,
        });
    };

    const handleAppetizersChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'appetizerImage') {
            setAppData({ ...appData, [name]: files[0] });
        } else {
            setAppData({ ...appData, [name]: value });
        }
    };

    const handleSubmitAppetizer = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(appData).forEach(key => {
                formDataToSend.append(key, appData[key]);
            });

            if (isEditing && currentRecord) {
                setLoading(true);
                const response = await axios.put(`${Url}Appetizers/update-appetizer/${currentRecord._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Updated");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Appetizer Updated")
                setAppetizerData([...appetizerData, response.data]);
                setLoading(false);
            } else {
                setLoading(true);
                const response = await axios.post(`${Url}Appetizers/add-appetizer`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Added");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Appetizer Added")
                console.log("Appetizer", response);
                setLoading(false);
            }

            setFormSubmitted(true);
            setPackageVisible(false);
            setIsEditing(false);
            setCurrentRecord(null);
            clearAppetizerForm()
            setLoading(false);
        } catch (error) {
            console.error("Error Adding Appetizer", error);
        }
    };

    const fetchAppetizers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Url}Appetizers/get-appetizer`)
            console.log(response.data.appetizerObj)
            setAppetizerData(response.data.appetizerObj);
            setLoading(false);
        } catch (error) {
            console.error("Error Fetching Data", error);
        }
    }
    useEffect(() => {
        fetchAppetizers()
    }, [])
    useEffect(() => {
        fetchAppetizers();
        setFormSubmitted(false)
    }, [formSubmitted])

    const handleDeleteAppetizer = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${Url}Appetizers/delete-appetizer/${id}`);
            console.log('Food Type deleted successfully');
            setAppetizerData(appetizerData.filter(item => item._id !== id));
            setLoading(false);
        } catch (error) {
            console.error("Error deleting food type", error);
            console.error('Failed to delete food type');
            setLoading(false);
        }
    };

    const appValues = appetizerData.map((item, index) => ({
        key: index,
        _id: item._id,
        name: item.name,
        cost: item.cost,
        description: item.description,
        img: item.appetizersImagePath
    }));

    // Main Entrees Data
    const [mainEntreeData, setMainEntreeData] = useState({
        name: '',
        description: '',
        cost: '',
        mainEntriesImage: null,
    });

    const clearMainEntreesForm = () => {
        setMainEntreeData({
            name: '',
            description: '',
            cost: '', 
            mainEntriesImage: null,
        });
    };

    const handleMainEntriesChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'mainEntriesImage') {
            setMainEntreeData({ ...mainEntreeData, [name]: files[0] });
        } else {
            setMainEntreeData({ ...mainEntreeData, [name]: value });
        }
    };

    const handleSubmitMainEntrees = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(mainEntreeData).forEach(key => {
                formDataToSend.append(key, mainEntreeData[key]);
            });

            if (isEditing && currentRecord) {
                setLoading(true);
                const response = await axios.put(`${Url}MainEntries/update-entries/${currentRecord._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Updated");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Updated")
                setMainEntriesData([...mainEntreeData, response.data]);
                setLoading(false);
            } else {
                setLoading(true);
                const response = await axios.post(`${Url}MainEntries/add-main-entries`, formDataToSend, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                // alert("Appetizer Added");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                console.log("Appetizer", response);
                setLoading(false);
            }

            setFormSubmitted(true);
            setPackageVisible(false);
            setIsEditing(false);
            setCurrentRecord(null);
            clearMainEntreesForm()
        } catch (error) {
            console.error("Error Adding Appetizer", error);
        }
    };
    const fetchEntries = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Url}MainEntries/get-main-entries`)
            console.log("Juices", response.data.mainEntriesObj)
            setMainEntriesData(response.data.mainEntriesObj);
            setLoading(false);
        } catch (error) {
            console.error("Error Fetching Data", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchEntries()
        setFormSubmitted(false)
    }, [formSubmitted])

    useEffect(() => {
        fetchEntries()
    }, [])

    const handleDeleteMainEntrees = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${Url}MainEntries/delete-entry/${id}`);
            console.log('Tea deleted successfully');
            setMainEntriesData(mainEntriesData.filter(item => item._id !== id));
            setLoading(false);
        } catch (error) {
            console.error("Error deleting Dessert", error);
            console.error('Failed to delete food type');
            setLoading(false);
        }
    };

    const mainEntreeValues = mainEntriesData.map((item, index) => ({
        key: index,
        _id: item._id,
        name: item.name,
        cost: item.cost,
        description: item.description,
        img: item.mainEntriesImagePath
    }));

    // Desserts Data
    const [dessertData, setDessertData] = useState({
        name: '',
        description: '',
        cost: '',
        dessertImage: null,
    });

    const clearDessertForm = () => {
        setDessertData({
            name: '',
            description: '',
            cost: '',
            dessertImage: null,
        });
    };

    const handleDessertChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'dessertImage') {
            setDessertData({ ...dessertData, [name]: files[0] });
        } else {
            setDessertData({ ...dessertData, [name]: value });
        }
    };

    const handleDessertSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(dessertData).forEach(key => {
                formDataToSend.append(key, dessertData[key]);
            });

            if (isEditing && currentRecord) {
                setLoading(true);
                const response = await axios.put(`${Url}Dessert/update-dessert/${currentRecord._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Updated");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Dessert Updated")
                setDessert([...dessert, response.data]);
                setLoading(false);
            } else {
                setLoading(true);
                const response = await axios.post(`${Url}Dessert/add-dessert`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Added");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Dessert Added")
                console.log("Appetizer", response);
                setLoading(false);
            }

            setFormSubmitted(true);
            setPackageVisible(false);
            setIsEditing(false);
            setCurrentRecord(null);
            clearDessertForm();
        } catch (error) {
            console.error("Error Adding Appetizer", error);
        }
    };

    const fetchDesserts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Url}Dessert/get-dessert`)
            console.log("Desserts", response.data.dessertObj)
            setDessert(response.data.dessertObj);
            setLoading(false);
        } catch (error) {
            console.error("Error Fetching Data", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDesserts()
    }, [])
    useEffect(() => {
        if (formSubmitted) {
            fetchDesserts(); // Fetch data if formSubmitted is true
            setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])

    const handleDeleteDessert = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${Url}Dessert/delete-dessert/${id}`);
            console.log('Food Type deleted successfully');
            setDessert(dessert.filter(item => item._id !== id));
            setLoading(false);
        } catch (error) {
            console.error("Error deleting Dessert", error);
            console.error('Failed to delete food type');
            setLoading(false);
        }
    };

    const dessertValues = dessert.map((item, index) => ({
        key: index,
        _id: item._id,
        name: item.name,
        cost: item.cost,
        description: item.description,
        img: item.dessertsImagePath
    }));

    // Tea Coffe Data
    const [teaCoffeData, setTeaCoffeData] = useState({
        name: '',
        description: '',
        cost: '',
        teaCoffeeImage: null,
    });

    const clearTeaCoffeForm = () => {
        setTeaCoffeData({
            name: '',
            description: '',
            cost: '',
            teaCoffeeImage: null,
        });
    };

    const handleTeaCoffeChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'teaCoffeeImage') {
            setTeaCoffeData({ ...teaCoffeData, [name]: files[0] });
        } else {
            setTeaCoffeData({ ...teaCoffeData, [name]: value });
        }
    };

    const handleTeaCoffeSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(teaCoffeData).forEach(key => {
                formDataToSend.append(key, teaCoffeData[key]);
            });

            if (isEditing && currentRecord) {
                setLoading(true);
                const response = await axios.put(`${Url}TeaCoffee/update-tea-coffe/${currentRecord._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Updated");
                setLoading(false);
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                setTeaCoffe([...teaCoffe, response.data]);
                
            } else {
                setLoading(true);
                const response = await axios.post(`${Url}TeaCoffee/add-tea-coffe`, formDataToSend, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                // alert("Appetizer Added");
                setLoading(false);
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                console.log("Appetizer", response);
                
            }
            setLoading(false);
            setFormSubmitted(true);
            setPackageVisible(false);
            setIsEditing(false);
            setCurrentRecord(null);
            clearTeaCoffeForm();
            
        } catch (error) {
            console.error("Error Adding Appetizer", error);
        }
    };

    const fetchTeaCoffe = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Url}TeaCoffee/get-tea-coffee`)
            console.log("Tea", response.data.teaCoffeObj)
            setTeaCoffe(response.data.teaCoffeObj);
            setLoading(false);
        } catch (error) {
            console.error("Error Fetching Data", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTeaCoffe()
    }, [])

    useEffect(() => {
        if (formSubmitted) {
            fetchTeaCoffe(); // Fetch data if formSubmitted is true
            setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])

    const handleDeleteTeaCoffe = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${Url}TeaCoffee/delete-tea-coffe/${id}`);
            console.log('Tea deleted successfully');
            // fetchTableData(); // Refresh the table data
            // setAppetizerType(prevFoodType => prevFoodType.filter(item => item._id !== id));
            setTeaCoffe(teaCoffe.filter(item => item._id !== id));
            setLoading(false);
        } catch (error) {
            console.error("Error deleting Dessert", error);
            console.error('Failed to delete food type');
            setLoading(false);
        }
    };

    const teaCoffeValue = teaCoffe.map((item, index) => ({
        key: index,
        _id: item._id,
        name: item.name,
        cost: item.cost,
        description: item.description,
        img: item.teaCoffeImagePath
    }));

    // Juices Drinks Data
    const [juicesData, setJuicesData] = useState({
        name: '',
        description: '',
        cost: '',
        juiceDrinkImage: null,
    });

    const clearJuiceDrinksForm = () => {
        setJuicesData({
            name: '',
            description: '',
            cost: '',
            juiceDrinkImage: null,
        });
    };

    const handleJuiceDrinkChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'juiceDrinkImage') {
            setJuicesData({ ...juicesData, [name]: files[0] });
        } else {
            setJuicesData({ ...juicesData, [name]: value });
        }
    };

    const handleJuicesDrinksSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(juicesData).forEach(key => {
                formDataToSend.append(key, juicesData[key]);
            });

            if (isEditing && currentRecord) {
                setLoading(true);
                const response = await axios.put(`${Url}JuicesDrinks/update-juices-drinks/${currentRecord._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Updated");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                setJuicesDrinks([...juicesDrinks, response.data]);
                setLoading(false);
            } else {
                setLoading(true);
                const response = await axios.post(`${Url}JuicesDrinks/add-juices-drinks`, formDataToSend, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                // alert("Appetizer Added");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                console.log("Appetizer", response);
                setLoading(false);
            }

            setFormSubmitted(true);
            setPackageVisible(false);
            setIsEditing(false);
            setCurrentRecord(null);
            clearJuiceDrinksForm();
        } catch (error) {
            console.error("Error Adding Appetizer", error);
        }
    };

    const fetchJuices = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${Url}JuicesDrinks/get-juices-drinks`)
            console.log("Juices", response.data.juiceDrinkObj)
            setJuicesDrinks(response.data.juiceDrinkObj);
            setLoading(false);
        } catch (error) {
            console.error("Error Fetching Data", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchJuices()
    }, [])

    useEffect(() => {
        if (formSubmitted) {
            fetchJuices(); // Fetch data if formSubmitted is true
            setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])

    const handleDeleteJuicesDrinks = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${Url}JuicesDrinks/delete-juices-drinks/${id}`);
            console.log('Tea deleted successfully');
            // fetchTableData(); // Refresh the table data
            // setAppetizerType(prevFoodType => prevFoodType.filter(item => item._id !== id));
            setJuicesDrinks(juicesDrinks.filter(item => item._id !== id));
            setLoading(false);
        } catch (error) {
            console.error("Error deleting Dessert", error);
            console.error('Failed to delete food type');
            setLoading(false);
        }
    };

    const juicesValue = juicesDrinks.map((item, index) => ({
        key: index,
        _id: item._id,
        name: item.name,
        cost: item.cost,
        description: item.description,
        img: item.juiceDrinkImagePath
    }));

  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Appetizers", "Main Entries", "Desserts", "Tea Coffe", "Juices Drinks"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Appetizers` : i === 1 ? "Main Entrees" : i === 2 ? "Desserts" : i === 3 ?  "Tea Coffee" : "Juices Drinks",
                    key: id,
                    disabled: i === 28,
                    // Appetizers
                    children: i === 0 ? <CoursesComp 
                    heading={'Appetizers'} pkgButton={'Add Appetizers'} imageName={'appetizerImage'} namePlaceholder={'Appetizer'}
                    appData={appData} setAppData={setAppData}formSubmit={handleSubmitAppetizer}
                    isEditing={isEditing} setIsEditing={setIsEditing}
                    currentRecord={currentRecord} setCurrentRecord={setCurrentRecord}
                    appetizerData={appetizerData} setAppetizerData={setAppetizerData}
                    clearForm={clearAppetizerForm} data={appValues}
                    formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}
                    deleteModal={deleteModal} setDeleteModal={setDeleteModal}
                    deleteData={deleteData} setDeleteData={setDeleteData}
                    successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage}
                    successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen}
                    loading={loading} setLoading={setLoading}
                    addPackages={addPackages}
                    packageVisible={packageVisible} setPackageVisible={setPackageVisible}
                    handleChange={handleAppetizersChange} handleDeleteService={handleDeleteAppetizer}
                    />
                    // Main Entrees
                    : i === 1 ? <CoursesComp 
                    heading={'Main Entries'} pkgButton={'Add Main Entrees'} imageName={'mainEntriesImage'} 
                    namePlaceholder={'Main Entrees'} appData={mainEntreeData} setAppData={setMainEntreeData}
                    mainEntreeData={mainEntreeData} setMainEntreeData={setMainEntreeData}
                    isEditing={isEditing} setIsEditing={setIsEditing} currentRecord={currentRecord} 
                    setCurrentRecord={setCurrentRecord} clearForm={clearMainEntreesForm}
                    mainEntriesData={mainEntriesData} setMainEntriesData={setMainEntriesData} formSubmit={handleSubmitMainEntrees}
                    data={mainEntreeValues} addPackages={addPackages} packageVisible={packageVisible}
                    setPackageVisible={setPackageVisible} loading={loading} setLoading={setLoading}
                    successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage}
                    successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen}
                    deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteData={deleteData}
                    setDeleteData={setDeleteData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}
                    handleChange={handleMainEntriesChange} handleDeleteService={handleDeleteMainEntrees}
                    /> 
                    // Dessert
                    : i === 2 ? <CoursesComp 
                    heading={'Desserts'} pkgButton={'Add Desserts'} imageName={'dessertImage'}
                    namePlaceholder={'Dessert'} appData={dessertData} setAppData={setDessertData}
                    isEditing={isEditing} setIsEditing={setIsEditing} currentRecord={currentRecord} setCurrentRecord={setCurrentRecord}
                    clearForm={clearDessertForm} dessert={dessert} setDessert={setDessert} formSubmit={handleDessertSubmit}
                    data={dessertValues} addPackages={addPackages} packageVisible={packageVisible} setPackageVisible={setPackageVisible}
                    loading={loading} setLoading={setLoading} successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage}
                    successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen} deleteModal={deleteModal} setDeleteModal={setDeleteModal}
                    deleteData={deleteData} setDeleteData={setDeleteData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}
                    handleChange={handleDessertChange} handleDeleteService={handleDeleteDessert}
                    /> 
                    // Tea Coffe 
                    : i === 3 ? <CoursesComp 
                    heading={'Tea Coffe'} pkgButton={'Add Tea Coffe'} imageName={'teaCoffeeImage'}
                    namePlaceholder={'Tea Coffe'} appData={teaCoffeData} setAppData={setTeaCoffeData} isEditing={isEditing} setIsEditing={setIsEditing}
                    currentRecord={currentRecord} setCurrentRecord={setCurrentRecord} clearForm={clearTeaCoffeForm} teaCoffe={teaCoffe} setTeaCoffe={setTeaCoffe}
                    formSubmit={handleTeaCoffeSubmit} data={teaCoffeValue} addPackages={addPackages} packageVisible={packageVisible} setPackageVisible={setPackageVisible}
                    loading={loading} setLoading={setLoading} successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage}
                    successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen} deleteModal={deleteModal} setDeleteModal={setDeleteModal}
                    deleteData={deleteData} setDeleteData={setDeleteData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}
                    handleChange={handleTeaCoffeChange} handleDeleteService={handleDeleteTeaCoffe}
                    /> 
                    // Juices Drinks
                    : <CoursesComp 
                    heading={'Juice Drink'} pkgButton={'Add Juice Drink'} imageName={'juiceDrinkImage'} namePlaceholder={'Juice Drinks'}
                    appData={juicesData} setAppData={setJuicesData} isEditing={isEditing} setIsEditing={setIsEditing}
                    currentRecord={currentRecord} setCurrentRecord={setCurrentRecord} clearForm={clearJuiceDrinksForm} juicesDrinks={juicesDrinks}
                    setJuicesDrinks={setJuicesDrinks} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} formSubmit={handleJuicesDrinksSubmit} data={juicesValue}
                    addPackages={addPackages} packageVisible={packageVisible} setPackageVisible={setPackageVisible} loading={loading}
                    setLoading={setLoading} successPopupMessage={successPopupMessage} setSuccessPopupMessage={setSuccessPopupMessage}
                    successPopupOpen={successPopupOpen} setSuccessPopupOpen={setSuccessPopupOpen} deleteModal={deleteModal} setDeleteModal={setDeleteModal}
                    deleteData={deleteData} setDeleteData={setDeleteData} handleChange={handleJuiceDrinkChange} handleDeleteService={handleDeleteJuicesDrinks}
                    />,
                };
                })}
            />
        </div>
    </div>
  )
}

export default Courses