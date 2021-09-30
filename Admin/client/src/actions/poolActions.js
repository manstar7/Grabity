import axios from "axios";
import isEmpty from "is-empty";
import {
    GET_ERRORS,
    POOL_ADD,
    POOL_UPDATE
} from "./types";

export const addPool = (param, history) => dispatch => {
    var poolData = new FormData();
    poolData.append('risk',5 );
    poolData.append('pid',0);
    poolData.append('lpSymbol',param.tokenSymbol);
    poolData.append('alloc',param.alloc*100 );
    poolData.append('isTokenOnly',true );
    poolData.append('lpAddresses',param.lpAddresses );
    poolData.append('tokenSymbol',param.tokenSymbol );
    poolData.append('tokenAddresses',param.tokenAddresses );
    poolData.append('quoteTokenSymbol',"BUSD");
    poolData.append('quoteTokenAdresses',"0xe9e7cea3dedca5984780bafc599bd69add087d56" );
    poolData.append('depositFee',param.depositFee );
    poolData.append('file',param.file );

//console.log("formdata>>>>>>>",formData)
    axios
        .post("/api/pool-add", poolData)
        .then(res =>{   
            // console.log("yyyhyu>>",res)
            dispatch({
                type: POOL_ADD,
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

export const updatePool = (param) => dispatch => {
    console.log("updatePool>>>>>",param)
    var poolUpdateData = new FormData();
    if (!isEmpty(param._id))   poolUpdateData.append('_id',param._id );
      poolUpdateData.append('pid',0);
    if (!isEmpty(param.risk))   poolUpdateData.append('risk',param.risk );
    poolUpdateData.append('lpSymbol',param.tokenSymbol);
    if (!isEmpty(param.alloc)) poolUpdateData.append('alloc',param.alloc*100 );
       poolUpdateData.append('isTokenOnly',true);
    if (!isEmpty(param.lpAddresses)) poolUpdateData.append('lpAddresses',param.lpAddresses );
    if (!isEmpty(param.tokenSymbol)) poolUpdateData.append('tokenSymbol',param.tokenSymbol );
    if (!isEmpty(param.tokenAddresses))poolUpdateData.append('tokenAddresses',param.tokenAddresses );
    if (!isEmpty(param.quoteTokenSymbol)) poolUpdateData.append('quoteTokenSymbol',"BUSD" );
    if (!isEmpty(param.quoteTokenAdresses))poolUpdateData.append('quoteTokenAdresses',"0xe9e7cea3dedca5984780bafc599bd69add087d56" );
    if (!isEmpty(param.depositFee))poolUpdateData.append('depositFee',param.depositFee );
    if (!isEmpty(param.file)) {
        poolUpdateData.append('file',param.file );
        console.log('1111111',poolUpdateData);
    }
    else {
        console.log('222222222');
    }
    // console.log("poolUpdateData>>>>>",poolUpdateData)
    axios
        .post("/api/pool-update", poolUpdateData)
        .then(res =>
            dispatch({
                type: POOL_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
