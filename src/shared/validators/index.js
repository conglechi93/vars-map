/* eslint-disable */

const Email = (string) => {
  let regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const PhoneNumber = (string) => {
  let regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  /*
  Validateformat
  (123) 456-7890
  (123)456-7890
  123-456-7890
  123.456.7890
  1234567890
  +31636363634
  075-63546725 
  */
  //let regex = new RegExp(/^[0-9\b\+\-\(\)]+$/);
  //let regex = new RegExp("\\+9665\\d{8}|05\\d{8}|\\+1\\(\\d{3}\\)\\d{3}-\\d{4}|\\+1\\d{10}|\\d{3}-\\d{3}-\\d{4}");
  return regex.test(string) ? Promise.resolve() : Promise.reject();
}

const Password = (string) => {
  let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
}
  

const Validators = {
  Email,
  PhoneNumber,
  Password,
};

export default Validators;
