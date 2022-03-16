import React, { useEffect } from "react"
import { Link, useParams, useLocation,useNavigate } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { FormattedMessage, useIntl } from "react-intl"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listVehicleDetails, vehicleCatalogDetails } from "../actions/vehicleActions"
import VehicleForm from "../components/vehicle/VehicleForm"

const VehicleEditScreen = ({ vehicleDetails, listVehicleDetails, vehicleCatalogDetails }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const { error, loading, vehicle, cities } = vehicleDetails
  const intl = useIntl()

  const { search } = useLocation()
  const backUrl = new URLSearchParams(search).get('backUrl') ? new URLSearchParams(search).get('backUrl') : "/vehiclelist" 

  const initialValues = {
    vehicleId: vehicle?.vehicleId,
    fuelConsumption: vehicle?.fuelConsumption,
    currentCity: vehicle?.currentCity,
  }

  useEffect(() => {

      if (id) {
        listVehicleDetails(id, true)
      }
      else {
        vehicleCatalogDetails()
      }

  }, [navigate, listVehicleDetails, vehicleCatalogDetails, id])
  
  return (
    <div>
      {id ? loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (<>
        <Link to={backUrl}>
          <FormattedMessage id="vehicleEdit.goBack" />
        </Link>
        <VehicleForm title={intl.formatMessage({ id: "vehicleEdit.editTitle" })}
          initialValues={initialValues} uid={id}
          cities={cities}  urlReturnSuccess={backUrl}>
        </VehicleForm>
      </>
      ) : <>
        <Link to={backUrl}>
          <FormattedMessage id="vehicleEdit.goBack" />
        </Link>
        <VehicleForm title={intl.formatMessage({ id: "vehicleEdit.addTitle" })}
          urlReturnSuccess="/vehiclelist" cities={cities}>
        </VehicleForm>
      </>}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    vehicleDetails: state.vehicleDetails
  };
};
export default connect(mapStateToProps, { listVehicleDetails, vehicleCatalogDetails })(VehicleEditScreen);
