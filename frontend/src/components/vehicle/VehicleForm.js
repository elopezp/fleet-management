import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Form as FinalForm, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createVehicle, updateVehicle } from "../../actions/vehicleActions";
import { connect } from "react-redux";
import { useIntl, FormattedMessage } from "react-intl"
import Loader from "../Loader";
import Message from '../Message'
import { validateFormVehicle } from ".";
import { VEHICLE_CREATE_RESET, VEHICLE_UPDATE_RESET } from '../../constants/vehicleConstants'
import { RenderInput, RenderSelect } from '../RenderField'



const VehicleForm = ({ uid, title, initialValues, cities, createVehicle, updateVehicle, urlReturnSuccess }) => {

    const navigate = useNavigate()
    const intl = useIntl()
    const dispatch = useDispatch()


    const vehicleCreate = useSelector(state => state.vehicleCreate)
    const { error: errorCreate, loading: loadingCreate, success: successCreate } = vehicleCreate

    const vehicleUpdate = useSelector(state => state.vehicleUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = vehicleUpdate


    useEffect(() => {
        if (successCreate) {
            dispatch({ type: VEHICLE_CREATE_RESET })
            if (urlReturnSuccess) {
                navigate(urlReturnSuccess)
            }
        }
        else if (successUpdate) {
            dispatch({ type: VEHICLE_UPDATE_RESET })
            if (urlReturnSuccess) {
                navigate(urlReturnSuccess)
            }
        }
    }, [dispatch, navigate, successCreate, successUpdate, uid, urlReturnSuccess])

    const onSubmit = formValues => {
        if (uid) {
            formValues.id = uid
            updateVehicle(formValues);
        }
        else {
            createVehicle(formValues);
        }

    };


    return (
        <div >
            {title && <h2>{title}</h2>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            <FinalForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validateFormVehicle}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Row >
                            <Field name="vehicleId" sm={12} md={6} component={RenderInput}
                                label={intl.formatMessage({ id: "vehicleEdit.nameLabel" })}
                                placeholder={intl.formatMessage({ id: "vehicleEdit.namePlaceholder" })}
                            >
                            </Field>

                            <Field name="currentCity" sm={12} md={6} component={RenderSelect}
                                label={intl.formatMessage({ id: "vehicleEdit.categoryLabel" })}
                                placeholder={intl.formatMessage({ id: "vehicleEdit.categoryPlaceholder" })}
                                options={cities} >
                            </Field>

                        </Form.Row>

                        <Form.Row >
                            <Field name="fuelConsumption" sm={12} md={3} component={RenderInput}
                                label={intl.formatMessage({ id: "vehicleEdit.priceLabel" })}
                                placeholder={intl.formatMessage({ id: "vehicleEdit.pricePlaceholder" })}
                                type="number"
                            >
                            </Field>

                        </Form.Row>

                        <Button type='submit' variant='primary'>
                            {uid ?
                                <FormattedMessage id="vehicleEdit.updateButton" />
                                : <FormattedMessage id="vehicleEdit.saveButton" />}
                        </Button>
                    </Form>
                )}
            </FinalForm>
        </div>
    );
};

const DecoratedComponent = connect(null, { createVehicle, updateVehicle })(VehicleForm);

export default DecoratedComponent;