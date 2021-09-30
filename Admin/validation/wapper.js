const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateWapperInput(data) {
    let errors = {};
    data.fromAddress = !isEmpty(data.fromAddress) ? data.fromAddress : "";
    data.amount = !isEmpty(data.amount) ? data.amount : "";
    
    // data.image = !isEmpty(data.file) ? data.image : "";
    if (Validator.isEmpty(data.fromAddress)) {
        errors.fromAddress = "From Address field is required";
    }
   
    if (Validator.isEmpty(data.amount)) {
        errors.amount = "Amount field is required";
    }
   
    // if (Validator.isEmpty(data.image)) {
    //     errors.file = "Image field is required";
    // }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};