import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    vehicleListReducer,
    vehicleDetailsReducer,
    vehicleDeleteReducer,
    vehicleCreateReducer,
    vehicleUpdateReducer,

} from './reducers/vehicleReducers'


const reducer = combineReducers({
    
    vehicleList: vehicleListReducer,
    vehicleDetails: vehicleDetailsReducer,
    vehicleDelete: vehicleDeleteReducer,
    vehicleCreate: vehicleCreateReducer,
    vehicleUpdate: vehicleUpdateReducer,

})

const initialState = {
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store