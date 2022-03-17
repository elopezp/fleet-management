import React, { useEffect,useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useLocation,useNavigate } from "react-router-dom"
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl, FormattedMessage } from "react-intl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import CenteredModal from '../components/CenteredModal'
import MoveCityVehicleForm from '../components/vehicle/MoveCityVehicleForm'
import { listVehicles, deleteVehicle } from '../actions/vehicleActions'

function VehicleListScreen() {

    const [moveVehicleModalShow, setMoveVehicleModalShow] = useState(false)
    const [selectedVehicleId, setSelectedVehicleId] = useState(null)

    const dispatch = useDispatch()
    const intl = useIntl()

    const vehicleList = useSelector(state => state.vehicleList)
    const { loading, error, vehicles, pages, page, success } = vehicleList

    const vehicleDelete = useSelector(state => state.vehicleDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = vehicleDelete

    const vehicleMoveCity = useSelector(state => state.vehicleMoveCity)
    const { vehicle: vehicleMoveCityUpdated } = vehicleMoveCity

    const { pathname, search } = useLocation()
    const backUrl = `${pathname}${search}`

    useEffect(() => {
        if (!vehicleMoveCityUpdated) {
            setMoveVehicleModalShow(false)
        }
        else{
            if (!success) {
                console.log("useEffect listVehicles " + vehicles.length)
                dispatch(listVehicles(search))
            }
        }
  
    }, [dispatch, search, success, successDelete,vehicleMoveCityUpdated])


    const deleteHandler = (id) => {

        if (window.confirm(intl.formatMessage({
            id: "vehicleList.deleteVehiclePrompt"
        }))) {
            dispatch(deleteVehicle(id))
        }
    }

    const moveVehicleHandler = (id) => {
        setSelectedVehicleId(id)
        setMoveVehicleModalShow(true)
    }

    return (
        <div>
            <CenteredModal
                show={moveVehicleModalShow}
                onHide={() => setMoveVehicleModalShow(false)}
                header={intl.formatMessage({ id: "vehicleList.moveVehicleHeader" })}>
                <MoveCityVehicleForm uid={selectedVehicleId}> </MoveCityVehicleForm>
            </CenteredModal>
            <Row className='align-items-center'>
                <Col>
                    <h1><FormattedMessage id="vehicleList.title" /></h1>
                </Col>

                <Col className='text-right'>
                    <Link to={{ pathname: '/vehicle/edit', search: `?backUrl=${backUrl}` }}>
                        <Button className='my-3'>
                            <FontAwesomeIcon icon={['fa', 'plus']} className="mx-2" /><FormattedMessage id="vehicleList.addVehicle" />
                        </Button>
                    </Link>

                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive size="sm" className="text-center">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th><FormattedMessage id="vehicleList.vehicleIdTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.currentCityTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.fuelConsumptionTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.fuelConsumedTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.distanceTraveledTableHead" /></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {vehicles.map(vehicle => (
                                        <tr key={vehicle.id}>
                                            <td><Button variant='light' size="sm" onClick={() => moveVehicleHandler(vehicle.id)}>
                                                    <FontAwesomeIcon icon={['fa', 'plus']} />
                                                    <FormattedMessage id="vehicleList.moveVehicle" />
                                                </Button></td>
                                            <td>{vehicle.vehicleId}</td>
                                            <td>{vehicle.currentCity.name}</td>
                                            <td>{vehicle.fuelConsumption}</td>
                                            <td>{vehicle.fuelConsumed}</td>
                                            <td>{vehicle.distanceTraveled}</td>

                                            <td>
                                                <LinkContainer to={{ pathname: `/vehicle/${vehicle.id}/edit`, search: `?backUrl=${backUrl}` }} className="mx-1" >
                                                    <Button variant='light' size="sm">
                                                        <FontAwesomeIcon icon={['fa', 'edit']} />
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' size="sm" onClick={() => deleteHandler(vehicle.id)}>
                                                    <FontAwesomeIcon icon={['fa', 'trash']} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} />
                        </div>
                    )}
        </div>
    )
}

export default VehicleListScreen