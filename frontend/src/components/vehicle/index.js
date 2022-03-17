import validator from 'validator';

export const validateFormVehicle = formValues => {

  const errors = {};

  if (!formValues.vehicleId) {
    errors.vehicleId = 'vehicleEdit.vehicleIdNotEmpty';
  }
  else if (formValues.vehicleId.length > 200) {
    errors.vehicleId = 'vehicleEdit.vehicleIdMaxLength';
  }
  if (!formValues.fuelConsumption) {
    errors.fuelConsumption = 'vehicleEdit.fuelConsumptionNotEmpty';
  }
  else {
    if (typeof formValues.fuelConsumption === "string" && !validator.isNumeric(formValues.fuelConsumption)) {
      errors.fuelConsumption = 'vehicleEdit.fuelConsumptionMustBeNumber';
    }
    else {
      if (formValues.fuelConsumption < 0) {
        errors.fuelConsumption = 'vehicleEdit.fuelConsumptionGreaterThanZero';
      }
    }
  }
  if ((!formValues.currentCity)) {
    errors.currentCity = 'vehicleEdit.currentCityNotEmpty';
  }
  if (formValues.fuelConsumed) {
    if (typeof formValues.fuelConsumed === "string" && !validator.isNumeric(formValues.fuelConsumed)) {
      errors.fuelConsumed = 'vehicleEdit.fuelConsumedMustBeNumber';
    }
    else {
      if (formValues.fuelConsumed < 0) {
        errors.fuelConsumed = 'vehicleEdit.fuelConsumedGreaterThanZero';
      }
    }
  }
  if (formValues.distanceTraveled) {
    if (typeof formValues.distanceTraveled === "string" && !validator.isNumeric(formValues.distanceTraveled)) {
      errors.distanceTraveled = 'vehicleEdit.distanceTraveledMustBeNumber';
    }
    else {
      if (formValues.distanceTraveled < 0) {
        errors.distanceTraveled = 'vehicleEdit.distanceTraveledGreaterThanZero';
      }
    }
  }

  return errors;
};



export const validateFormVehicleMoveCity = formValues => {
    
  const errors = {};

  if ((!formValues.currentCity)) {
    errors.currentCity = 'vehicleEdit.currentCityNotEmpty';
  }
  return errors;
};

