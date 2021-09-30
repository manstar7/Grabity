const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePoolInput(data) {
    let errors = {};
    data.tokenSymbol = !isEmpty(data.tokenSymbol) ? data.tokenSymbol : "";
    data.tokenAddresses = !isEmpty(data.tokenAddresses) ? data.tokenAddresses : "";
    data.quoteTokenSymbol = !isEmpty(data.quoteTokenSymbol) ? data.quoteTokenSymbol : "";
    data.quoteTokenAdresses = !isEmpty(data.quoteTokenAdresses) ? data.quoteTokenAdresses : "";
    //data.file = !isEmpty(data.file) ? data.file : "";
    if (Validator.isEmpty(data.tokenSymbol)) {
        errors.tokenSymbol = "Token Symbol field is required";
    }
    if (Validator.isEmpty(data.tokenAddresses,{ max: 42 })) {
        errors.tokenAddresses = "Token Address field is required";
    } 
    // if (Validator.isEmpty(data.quoteTokenSymbol)) {
    //     errors.quoteTokenSymbol = "Quote Token Symbol field is required";
    // }
    // if (Validator.isEmpty(data.quoteTokenAdresses)) {
    //     errors.quoteTokenAdresses = "Quote Token Adresses field is required";
    // }
    // if (Validator.isEmpty(data.file)) {
    //     errors.file = "Image field is required";
    // }
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};