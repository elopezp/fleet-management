import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Form as FinalForm, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { useIntl, FormattedMessage } from "react-intl"
import Loader from "../Loader";
import Message from '../Message'
import { validateFormVehicleMoveCity } from ".";
import { listVehicleDetails, moveCityVehicle } from "../../actions/vehicleActions";
import { VEHICLE_MOVE_CITY_RESET } from '../../constants/vehicleConstants'
import { RenderSelect } from '../RenderField'



const MoveCityVehicleForm = ({ uid, title, vehicleDetails, listVehicleDetails, moveCityVehicle, urlReturnSuccess }) => {

    const navigate = useNavigate()
    const intl = useIntl()
    const dispatch = useDispatch()

    const { error, loading, vehicle, cities } = vehicleDetails

    const vehicleMoveCity = useSelector(state => state.vehicleMoveCity)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = vehicleMoveCity

    const initialValues = {
        vehicleId: vehicle?.vehicleId,
        fuelConsumption: vehicle?.fuelConsumption,
        currentCity: vehicle?.currentCity,
        fuelConsumed: vehicle?.fuelConsumed,
        distanceTraveled: vehicle?.distanceTraveled,
    }

    useEffect(() => { 
        if (successUpdate) {
            dispatch({ type: VEHICLE_MOVE_CITY_RESET })
            if (urlReturnSuccess) {
                navigate(urlReturnSuccess)
            }
        }
        else{
                listVehicleDetails(uid)
        }
    }, [successUpdate])

    const onSubmit = formValues => {
        if (uid) {
            formValues.id = uid
            moveCityVehicle(formValues);
        }
    };

    return (
        <div >
            {title && <h2>{title}</h2>}
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FinalForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validateFormVehicleMoveCity}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <h5>{initialValues.vehicleId}</h5>
                        <hr></hr>
                        <Form.Row >
                            <Field name="currentCity" sm={12} md={6} component={RenderSelect}
                                label={intl.formatMessage({ id: "vehicleEdit.currentCityLabel" })}
                                placeholder={intl.formatMessage({ id: "vehicleEdit.currentCityPlaceholder" })}
                                options={cities} >
                            </Field>
                        </Form.Row>

                        <Button type='submit' variant='primary'>
                            <FormattedMessage id="component.moveCityVehicleForm.updateButton" />
                        </Button>
                    </Form>
                )}
            </FinalForm>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        vehicleDetails: state.vehicleDetails
    };
};
const DecoratedComponent = connect(mapStateToProps, { listVehicleDetails, moveCityVehicle })(MoveCityVehicleForm);

export default DecoratedComponent;