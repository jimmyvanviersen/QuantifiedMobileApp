// React import

// Library imports (Alphabetical order)
import axios from 'axios';

// Absolute imports from the project (Alphabetical order)
import { API_URL } from './API_URL';
import { getToken } from './Token';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


// GET requests data from a specified source
const get = async (destination) => {
    
    // fetch Bearer token value from local storage
    let auth = JSON.parse(await getToken());

    // send GET request with custom header
    const response = await axios({
        method: 'get',
        url: `${API_URL}${destination}`,
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${auth.token}`,
            'content-type': 'application/json',
        }
    })
    // return response from API
    return response;
};


// GET all devices connected to the users account
export const getDevices = () => {
    // set destination for API_URL
    let destination = 'devices/';
    // return response from get request
    return get(destination);
};

// Using the Device ID, GET specific events
export const getAirPressure = (device_id) => {
    let destination = `air_pressure_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getBattery = (device_id) => {
    let destination = `battery_voltage_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getChimneyHumidity = (device_id) => {
    let destination = `chimney_humidity_events/?device_id=${device_id}&limit=1`
    return get(destination)
}

export const getChimneyTemperature = (device_id) => {
    let destination = `chimney_temperature_events/?device_id=${device_id}&limit=1`
    return get(destination)
}

export const getGeolocation = (device_id) => {
    let destination = `geolocation_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getMass = (device_id) => {
    let destination = `mass_events/?device_id=${device_id}&limit=1`
    return get(destination)
}

export const getPAR = (device_id) => {
    let destination = `par_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getPrecipitation = (device_id) => {
    let destination = `precipitation_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getHumidity = (device_id) => {
    let destination = `relative_humidity_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getSoilConductivity = (device_id) => {
    let destination = `soil_electric_conductivity_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getSoilPermittivity = (device_id) => {
    let destination = `soil_relative_permittivity_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getSoilTemperature = (device_id) => {
    let destination = `soil_temperature_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getTemperature = (device_id) => {
    //let destination = `temperature_events/?device_id=${device_id}&limit=10`;
    let destination = `temperature_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};

export const getTProbe = (device_id) => {
    let destination = `tprobe_events/?device_id=${device_id}&limit=1`;
    return get(destination);
};
