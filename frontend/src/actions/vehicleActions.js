import axios from 'axios'
import {
    VEHICLE_LIST_REQUEST,
    VEHICLE_LIST_SUCCESS,
    VEHICLE_LIST_FAIL,

    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,

    VEHICLE_DELETE_REQUEST,
    VEHICLE_DELETE_SUCCESS,
    VEHICLE_DELETE_FAIL,

    VEHICLE_CREATE_REQUEST,
    VEHICLE_CREATE_SUCCESS,
    VEHICLE_CREATE_FAIL,

    VEHICLE_UPDATE_REQUEST,
    VEHICLE_UPDATE_SUCCESS,
    VEHICLE_UPDATE_FAIL,

} from '../constants/vehicleConstants'


export const listVehicles = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: VEHICLE_LIST_REQUEST })

        const { data } = await axios.get(`/api/vehicles${keyword}`)

        dispatch({
            type: VEHICLE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VEHICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listVehicleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: VEHICLE_DETAILS_REQUEST })

        const { data } = await axios.get( `/api/vehicles/${id}`)

        dispatch({
            type: VEHICLE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VEHICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const vehicleCatalogDetails = () => async (dispatch) => {
    try {
        dispatch({ type: VEHICLE_DETAILS_REQUEST })

        const { data } = await axios.get("/api/vehicles/catalog")

        dispatch({
            type: VEHICLE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VEHICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteVehicle = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VEHICLE_DELETE_REQUEST
        })

        await axios.delete(
            `/api/vehicles/delete/${id}/`,
        )

        dispatch({
            type: VEHICLE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: VEHICLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createVehicle = (vehicle) => async (dispatch) => {
    try {
        dispatch({
            type: VEHICLE_CREATE_REQUEST
        })

        const { data } = await axios.post(
            `/api/vehicles/create/`,
            vehicle
        )
        dispatch({
            type: VEHICLE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: VEHICLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateVehicle = (vehicle) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VEHICLE_UPDATE_REQUEST
        })

        const { data } = await axios.put(
            `/api/vehicles/update/${vehicle.id}/`,
            vehicle
        )
        dispatch({
            type: VEHICLE_UPDATE_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: VEHICLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}