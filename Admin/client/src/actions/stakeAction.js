import axios from "axios";
import isEmpty from "is-empty";
import {
    GET_ERRORS,
    STAKE_ADD,
    STAKE_UPDATE
} from "./types";

export const addStake = (param, history) => dispatch => {
    var stakeData = new FormData();
    
    stakeData.append('TokenIN',param.TokenIN );
    stakeData.append('TokenOUT',param.TokenOUT );
    stakeData.append('uint256_startBlock',param. uint256_startBlock );
    stakeData.append('uint256_lockBlock',param. uint256_lockBlock );
    stakeData.append('uint256_rewardPerBlock',param.uint256_rewardPerBlock );
    stakeData.append('uint256_endBlock',param.uint256_endBlock );
    stakeData.append('file',param.file );

console.log("stakeData>>>>>>>",stakeData)   
    axios
        .post("/api/stake-add", stakeData)
        .then(res =>{   
            console.log("yyyhyu>>",res)
            dispatch({
                type: STAKE_ADD,
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

export const updateStake = (param) => dispatch => {
    console.log("updateStake>>>>>",param);
    // return false;
    var stakeUpdateData = new FormData();
    
    if (!isEmpty(param.TokenIN)) stakeUpdateData.append('TokenIN',param.TokenIN );
    if (!isEmpty(param.TokenOUT)) stakeUpdateData.append('TokenOUT',param.TokenOUT );
    if (!isEmpty(param. uint256_startBlock))stakeUpdateData.append('uint256_startBlock',param. uint256_startBlock );
    if (!isEmpty(param.uint256_lockBlock))stakeUpdateData.append('uint256_lockBlock',param.uint256_lockBlock );
    if (!isEmpty(param.uint256_rewardPerBlock))stakeUpdateData.append('uint256_rewardPerBlock',param.uint256_rewardPerBlock );
    if (!isEmpty(param.uint256_endBlock))stakeUpdateData.append('uint256_endBlock',param.uint256_endBlock );
    if (!isEmpty(param.file)) {
        stakeUpdateData.append('file',param.file );
        console.log('1111111');
    }
    else {
        console.log('222222222');
    }
    console.log("stakeUpdateData>>>>>",stakeUpdateData)
    axios
        .post("/api/stake-update", stakeUpdateData)
        .then(res =>
            dispatch({
                type: STAKE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
