import validator from 'validator';

export const validateFormVehicle = formValues => {

  const errors = {};

  if (!formValues.vehicleId) {
    errors.vehicleId = 'vehicleEdit.nameNotEmpty';
  }
  else if (formValues.vehicleId.length > 200) {
    errors.vehicleId = 'vehicleEdit.nameMaxLength';
  }
  if (!formValues.fuelConsumption) {
    errors.fuelConsumption = 'vehicleEdit.priceNotEmpty';
  }
  else {
    if (typeof formValues.fuelConsumption === "string" && !validator.isNumeric(formValues.fuelConsumption)) {
      errors.fuelConsumption = 'vehicleEdit.priceMustBeNumber';
    }
    else {
      if (formValues.fuelConsumption < 0) {
        errors.fuelConsumption = 'vehicleEdit.priceGreaterThanZero';
      }
    }
  }
  if ((!formValues.currentCity)) {
    errors.currentCity = 'vehicleEdit.categoryNotEmpty';
  }

  return errors;
};
