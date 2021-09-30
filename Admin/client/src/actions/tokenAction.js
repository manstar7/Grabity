import axios from "axios";

import {
    GET_ERRORS,
    TOKEN_ADD,
    
} from "./types";

export const addToken = (param, history) => dispatch => {
    var TokenData = new FormData();
   
    TokenData.append('name',param.name);
    TokenData.append('symbol',param.symbol );
    TokenData.append('addresses',param.addresses );
    TokenData.append('chainId',10 );
    TokenData.append('decimals',18 );
    TokenData.append('file',param.file );

//console.log("TokenData>>>>>>>",TokenData)   
    axios
        .post("/api/token-add", TokenData)
        .then(res =>{   
            console.log("yyyhyu>>",res)
            dispatch({
                type: TOKEN_ADD,
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

// export const updateToken = (param) => dispatch => {
//     console.log("updateToken>>>>>",param);
//     // return false;
//     var tokenUpdateData = new FormData();
    
//     if (!isEmpty(param.name))   tokenUpdateData.append('name',param.name );
//     if (!isEmpty(param.symbol)) tokenUpdateData.append('symbol',param.symbol );
//     if (!isEmpty(param.addresses)) tokenUpdateData.append('addresses',param.addresses );
//     if (!isEmpty(param.chainId))tokenUpdateData.append('chainId',10 );
//     if (!isEmpty(param.decimals)) tokenUpdateData.append('decimals',18 );
//     if (!isEmpty(param.file)) {
//         tokenUpdateData.append('file',param.file );
//         console.log('1111111');
//     }
//     else {
//         console.log('222222222');
//     }
//     console.log("tokenUpdateData>>>>>",tokenUpdateData)
//     axios
//         .post("/api/token-update", tokenUpdateData)
//         .then(res =>
//             dispatch({
//                 type: TOKEN_UPDATE,
//                 payload: res,
//             })
//         ).catch(err =>
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         })
//     );
// };
