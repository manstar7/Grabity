import axios from "axios";
import isEmpty from "is-empty";
import {
    GET_ERRORS,
    FORM_ADD,
    FORM_UPDATE
} from "./types";

export const addForm = (param, history) => dispatch => {
    var formData = new FormData();
    formData.append('pid',0 );
    formData.append('risk',5 );
    formData.append('lpSymbol',param.tokenSymbol+ ' - ' +param.quoteTokenSymbol);
    formData.append('alloc',param.alloc*100);
    formData.append('isTokenOnly',false );
    // formData.append('lpAddresses',param.lpAddresses );
    formData.append('tokenSymbol',param.tokenSymbol );
    formData.append('tokenAddresses',param.tokenAddresses );
    formData.append('quoteTokenSymbol',param.quoteTokenSymbol );
    formData.append('quoteTokenAdresses',param.quoteTokenAdresses );
    formData.append('depositFee',param.depositFee );
    formData.append('file',param.file );

//console.log("formdata>>>>>>>",formData)   
    axios
        .post("/api/form-add", formData)
        .then(res =>{   
            // console.log("yyyhyu>>",res)
            dispatch({
                type: FORM_ADD,
                payload: res,
            })
        }
        ).catch(err =>{   
            // console.log("yyyhyu>>",err)
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
    }
    );
};

export const updateForm = (param) => dispatch => {
    console.log("updateForm>>>>>",param);
    // return false;
    var formUpdateData = new FormData();
    if (!isEmpty(param._id))   formUpdateData.append('_id',param._id );
    formUpdateData.append('pid',0);
    if (!isEmpty(param.risk))   formUpdateData.append('risk',5 );
    formUpdateData.append('lpSymbol',param.tokenSymbol+ ' - ' +param.quoteTokenSymbol);
    if (!isEmpty(param.alloc)) formUpdateData.append('alloc',param.alloc*100 );
     formUpdateData.append('isTokenOnly',false );
    if (!isEmpty(param.lpAddresses)) formUpdateData.append('lpAddresses',param.lpAddresses );
    if (!isEmpty(param.tokenSymbol)) formUpdateData.append('tokenSymbol',param.tokenSymbol );
    if (!isEmpty(param.tokenAddresses))formUpdateData.append('tokenAddresses',param.tokenAddresses );
    if (!isEmpty(param.quoteTokenSymbol)) formUpdateData.append('quoteTokenSymbol',param.quoteTokenSymbol );
    if (!isEmpty(param.quoteTokenAdresses))formUpdateData.append('quoteTokenAdresses',param.quoteTokenAdresses );
    if (!isEmpty(param.depositFee))formUpdateData.append('depositFee',param.depositFee );
    if (!isEmpty(param.file)) {
        formUpdateData.append('file',param.file );
        //console.log('1111111');
    }
    // else {
    //     console.log('222222222');
    // }
    // console.log("formUpdateData>>>>>",formUpdateData)
    axios
        .post("/api/form-update", formUpdateData)
        .then(res =>
            dispatch({
                type: FORM_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
