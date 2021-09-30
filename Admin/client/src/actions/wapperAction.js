import axios from "axios";
import isEmpty from "is-empty";
import {
    GET_ERRORS,
    WAPPER_ADD,
    WAPPER_UPDATE
} from "./types";

export const addWapper = (param, history) => dispatch => {
    var wapperData = new FormData();
   
    wapperData.append('fromAddress',param.fromAddress );
    wapperData.append('amount',param.amount );
   

console.log("wapperData>>>>>>>",wapperData)   
    axios
        .post("/api/wapper-add", wapperData)
        .then(res =>{   
            console.log("yyyhyu>>",res)
            dispatch({
                type: WAPPER_ADD,
                payload: res,
            })
        }
        ).catch(err =>{   
            console.log("yyyhyu>>",err)
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
    }
    );
};

export const updateWapper = (param) => dispatch => {
    console.log("updateWapper>>>>>",param);
    // return false;
    var wapperUpdateData = new FormData();
   
    if (!isEmpty(param.fromAddress)) wapperUpdateData.append('fromAddress',param.fromAddress );
    if (!isEmpty(param.amount)) wapperUpdateData.append('amount',param.amount );
    
    console.log("formUpdateData>>>>>",wapperUpdateData)
    axios
        .post("/api/wapper-update", wapperUpdateData)
        .then(res =>
            dispatch({
                type: WAPPER_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
