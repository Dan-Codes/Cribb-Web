import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "This Field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "This Field is required";
  }
  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = "This Field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "This Field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
