import { createContext, useContext, useState, useEffect } from 'react';
import { Url } from '../env';

const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const [allService, setAllService] = useState([])
    const [category, setCategory] = useState([])
    const [settingService, setSettingService] = useState([])
    const [loading, setLoading] = useState(false)
    const GetAllServices = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}EventScap/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setAllService(result.EventScap.reverse())
                    setLoading(false)
                    return
                } else {
                    setLoading(false)
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const GetCategory = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}Category/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.status === 200) {
                    setCategory(result.Category.reverse())
                    setLoading(false)
                    return
                } else {
                    setLoading(false)
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const GetSettingService = () => {
        setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${Url}SettingService/Get`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setSettingService(result.Services.reverse())
                    setLoading(false)
                    return
                } else {
                    console.log("error");
                }
                // console.log(result)
            })
            .catch(error => {
                setLoading(false)
                console.log('error', error)
            });
    }

    return (
        <SettingContext.Provider value={{
            GetAllServices,
            allService,
            setAllService,
            GetCategory,
            category, setCategory,
            setSettingService,
            settingService,
            GetSettingService,
            loading,
            setLoading
        }}>
            {children}
        </SettingContext.Provider>
    );
}
export const useSettingContext = () => {
    return useContext(SettingContext);
};