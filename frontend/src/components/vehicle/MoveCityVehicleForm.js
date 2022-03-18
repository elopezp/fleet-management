import React, { useEffect } from 'react'
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



const MoveCityVehicleForm = ({ entity, title, vehicleDetails, listVehicleDetails, moveCityVehicle }) => {

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
        }
        else {
            if((vehicle && vehicle.id !== entity.id) || 
            (vehicle && vehicle.id === entity.id && vehicle.currentCity.id !== entity.currentCity.id))
            {
                listVehicleDetails(entity.id)
            }
        }
    }, [dispatch,listVehicleDetails,successUpdate,entity,vehicle])

    const onSubmit = formValues => {
        if (entity) {
            formValues.id = entity.id
            moveCityVehicle(formValues);
        }
    };

    return (
        <div >
            {title && <h2>{title}</h2>}
            {loading && <Loader />}
            {error && <Message variant='danger'>{errorUpdate}</Message>}
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FinalForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validateFormVehicleMoveCity}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>

                        <Form.Row >
                            <Field name="currentCity" sm={12} md={6} component={RenderSelect}
                                label={intl.formatMessage({ id: "vehicleEdit.cityLabel" })}
                                placeholder={intl.formatMessage({ id: "vehicleEdit.cityPlaceholder" })}
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