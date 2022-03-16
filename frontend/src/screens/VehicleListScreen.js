import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useLocation,useNavigate } from "react-router-dom"
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl, FormattedMessage } from "react-intl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listVehicles, deleteVehicle } from '../actions/vehicleActions'

function VehicleListScreen() {

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const intl = useIntl()

    const vehicleList = useSelector(state => state.vehicleList)
    const { loading, error, vehicles, pages, page } = vehicleList

    const vehicleDelete = useSelector(state => state.vehicleDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = vehicleDelete

    const { pathname, search } = useLocation()
    const backUrl = `${pathname}${search}`

    useEffect(() => {
        dispatch(listVehicles(search))

    }, [dispatch, search, successDelete])


    const deleteHandler = (id) => {

        if (window.confirm(intl.formatMessage({
            id: "vehicleList.deleteVehiclePrompt"
        }))) {
            dispatch(deleteVehicle(id))
        }
    }

    return (
        <div>
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
                                        <th><FormattedMessage id="vehicleList.photoMainTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.nameTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.priceTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.categoryTableHead" /></th>
                                        <th><FormattedMessage id="vehicleList.brandTableHead" /></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {vehicles.map(vehicle => (
                                        <tr key={vehicle.id}>
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