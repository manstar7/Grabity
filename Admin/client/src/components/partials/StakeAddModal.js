import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStake } from "../../actions/stakeAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import  Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';

class StakeAddModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
            TokenIN: "",
            TokenOUT: "",
            uint256_rewardPerBlock:"",
            uint256_startBlock:"",
            uint256_lockBlock:"",
            uint256_endBlock:"",
            imagepath : "",
            web3state : null,
            user:"",
            newConAddr: "",
            file : {},
            errors: {},
};
    }
    componentDidMount(props){
        this.MetaMask()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.form !== undefined
            && nextProps.auth.form.data !== undefined
            && nextProps.auth.form.data.message !== undefined) {
          
            toast(nextProps.auth.form.data.message, {
                position: toast.POSITION.TOP_CENTER
                
            });
            $('#add-stake-modal').modal('hide');
        }
    }
     MetaMask = async (e) => {
        try{
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                this.setState({ web3state: web3 })
                try {
                    window.ethereum.enable().then(async () => {
                        // User has allowed account access to DApp...
                        const accounts = await web3.eth.getAccounts();
                        console.log("Account : ", accounts[0]);
                        const data = accounts[0];
    
                        this.setState({ user: data });
                        
                    });
                } catch (e) {
                    // User has denied account access to DApp...
                }
            }
            // Legacy DApp Browsers
            else if (window.web3) {
                const web3 = new Web3(window.web3.currentProvider);
                this.setState({ web3state: web3 })
            }
            // Non-DApp Browsers
            else {
                //alert('No Dapp Supported Wallet Found');
                console.log("No Dapp Supported Wallet Found")
            }
        }catch(e){

        }
     }
    addStake= async (e) => {
        // console.log("web3 State : ",this.state.web3state)

        const abi = [
            {
                "inputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "_GBT",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IERC20",
                        "name": "_REWARD",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_rewardPerBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_startBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_lockBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_endBlock",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Burn",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Deposit",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "EmergencyWithdraw",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Withdraw",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "GBT",
                "outputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "REWARD",
                "outputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    }
                ],
                "name": "activateEmergency",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "emergencyActive",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "emergencyWithdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "endBlock",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "lockBlock",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }
                ],
                "name": "pendingReward",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "poolInfo",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "lastRewardBlock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "accRewardPerShare",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rewardPerBlock",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "stakedGbts",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "startBlock",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "transact",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "updatePool",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "userInfo",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardDebt",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
       const ByteCode = "0x608060405234801561001057600080fd5b50600436106101165760003560e01c80638b3827c3116100a2578063db2e21bc11610071578063db2e21bc14610231578063e3161ddd14610239578063eddaa3ab14610241578063f2fde38b14610249578063f40f0f521461026f57610116565b80638b3827c3146101c35780638da5cb5b146101e7578063cab34c08146101ef578063cef93f0c146101f757610116565b80634a63b3d3116100e95780634a63b3d3146101845780635a2f3d091461018c578063650b760914610194578063715018a6146101b35780638ae39cac146101bb57610116565b8063083c63231461011b5780631959a0021461013557806343bfa5c61461017457806348cd4cb11461017c575b600080fd5b610123610295565b60408051918252519081900360200190f35b61015b6004803603602081101561014b57600080fd5b50356001600160a01b03166102b9565b6040805192835260208301919091528051918290030190f35b6101236102d2565b6101236102d8565b6101236102fc565b61015b610320565b6101b1600480360360208110156101aa57600080fd5b5035610329565b005b6101b16105e3565b610123610697565b6101cb6106bb565b604080516001600160a01b039092168252519081900360200190f35b6101cb6106df565b6101cb6106ee565b61021d6004803603602081101561020d57600080fd5b50356001600160a01b0316610712565b604080519115158252519081900360200190f35b6101b1610aa5565b6101b1610b95565b61021d610c2a565b6101b16004803603602081101561025f57600080fd5b50356001600160a01b0316610c33565b6101236004803603602081101561028557600080fd5b50356001600160a01b0316610d3d565b7f0000000000000000000000000000000000000000000000000000000000d177e781565b6005602052600090815260409020805460019091015482565b60015481565b7f0000000000000000000000000000000000000000000000000000000000c235a781565b7f0000000000000000000000000000000000000000000000000000000000c6063781565b60025460035482565b60045460ff1615610375576040805162461bcd60e51b815260206004820152601160248201527020b1ba34bb329032b6b2b933b2b731bc9760791b604482015290519081900360640190fd5b33600090815260056020526040902061038c610b95565b80541561041d5760035481546000916103b69164e8d4a51000916103b09190610e13565b90610e75565b905060006103d1836001015483610eb790919063ffffffff16565b6001840183905590506103e43382610ef9565b60408051828152905133917f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364919081900360200190a250505b7f0000000000000000000000000000000000000000000000000000000000c606374310801561044b57508115155b156104f8576104856001600160a01b037f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a16333085611010565b6001546104929083611070565b60015580546104a19083611070565b8082556003546104bc9164e8d4a51000916103b09190610e13565b600182015560408051838152905133917fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c919081900360200190a25b7f0000000000000000000000000000000000000000000000000000000000d177e743106105c1578054610559906001600160a01b037f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a169061dead906110ca565b805460015461056791610eb7565b60015560008082556003546105879164e8d4a51000916103b09190610e13565b6001820155805460408051918252517fb90306ad06b2a6ff86ddc9327db583062895ef6540e62dc50add009db5b356eb9181900360200190a15b60035481546105da9164e8d4a51000916103b091610e13565b60019091015550565b6105eb61111c565b6000546001600160a01b0390811691161461064d576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b7f0000000000000000000000000000000000000000000000000853a0d2313c000081565b7f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a81565b6000546001600160a01b031690565b7f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a81565b600061071c61111c565b6000546001600160a01b0390811691161461077e576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60045460ff16156107d6576040805162461bcd60e51b815260206004820152601960248201527f456d657267656e637920616c7265616479206163746976652e00000000000000604482015290519081900360640190fd5b6004805460ff191660011790557f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b039081167f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a919091161415610988577f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b031663a9059cbb836001547f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b1580156108da57600080fd5b505afa1580156108ee573d6000803e3d6000fd5b505050506040513d602081101561090457600080fd5b5051604080516001600160e01b031960e087901b1681526001600160a01b03909416600485015291900360248301525160448083019260209291908290030181600087803b15801561095557600080fd5b505af1158015610969573d6000803e3d6000fd5b505050506040513d602081101561097f57600080fd5b50519050610aa0565b7f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b031663a9059cbb837f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610a2557600080fd5b505afa158015610a39573d6000803e3d6000fd5b505050506040513d6020811015610a4f57600080fd5b5051604080516001600160e01b031960e086901b1681526001600160a01b03909316600484015260248301919091525160448083019260209291908290030181600087803b15801561095557600080fd5b919050565b60045460ff161515600114610af8576040805162461bcd60e51b815260206004820152601460248201527327379030b1ba34bb329032b6b2b933b2b731bc9760611b604482015290519081900360640190fd5b33600081815260056020526040902080549091610b40917f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b031691906110ca565b8054600154610b4e91610eb7565b6001558054604080519182525133917f5fafa99d0643513820be26656b45130b01e1c03062e1266bf36f88cbd3bd9695919081900360200190a26000808255600190910155565b6002544311610ba357610c28565b600154610bb35743600255610c28565b6000610bc460026000015443611120565b90506000610bf2827f0000000000000000000000000000000000000000000000000853a0d2313c0000610e13565b9050610c1e610c156001546103b064e8d4a5100085610e1390919063ffffffff16565b60035490611070565b6003555050436002555b565b60045460ff1681565b610c3b61111c565b6000546001600160a01b03908116911614610c9d576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610ce25760405162461bcd60e51b81526004018080602001828103825260268152602001806115126026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038116600090815260056020526040812060035460025443118015610d6a575060015415155b15610ddd576000610d8060026000015443611120565b90506000610dae827f0000000000000000000000000000000000000000000000000853a0d2313c0000610e13565b9050610dd8610dd16001546103b064e8d4a5100085610e1390919063ffffffff16565b8490611070565b925050505b610e0b8260010154610e0564e8d4a510006103b0858760000154610e1390919063ffffffff16565b90610eb7565b949350505050565b600082610e2257506000610e6f565b82820282848281610e2f57fe5b0414610e6c5760405162461bcd60e51b81526004018080602001828103825260218152602001806115386021913960400191505060405180910390fd5b90505b92915050565b6000610e6c83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506111b4565b6000610e6c83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611256565b60007f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a6001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610f6857600080fd5b505afa158015610f7c573d6000803e3d6000fd5b505050506040513d6020811015610f9257600080fd5b5051905080821115610fd757610fd26001600160a01b037f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a1684836110ca565b61100b565b61100b6001600160a01b037f000000000000000000000000e2b52d9f7b55f191f7a26c7d4b73e309b918ef3a1684846110ca565b505050565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b17905261106a9085906112b0565b50505050565b600082820183811015610e6c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b17905261100b9084906112b0565b3390565b60007f0000000000000000000000000000000000000000000000000000000000d177e782101561115b576111548284610eb7565b9050610e6f565b7f0000000000000000000000000000000000000000000000000000000000d177e7831061118a57506000610e6f565b6111547f0000000000000000000000000000000000000000000000000000000000d177e784610eb7565b600081836112405760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156112055781810151838201526020016111ed565b50505050905090810190601f1680156112325780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161124c57fe5b0495945050505050565b600081848411156112a85760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156112055781810151838201526020016111ed565b505050900390565b6060611305826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166113619092919063ffffffff16565b80519091501561100b5780806020019051602081101561132457600080fd5b505161100b5760405162461bcd60e51b815260040180806020018281038252602a815260200180611559602a913960400191505060405180910390fd5b6060610e0b84846000856060611376856114d8565b6113c7576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b602083106114065780518252601f1990920191602091820191016113e7565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114611468576040519150601f19603f3d011682016040523d82523d6000602084013e61146d565b606091505b50915091508115611481579150610e0b9050565b8051156114915780518082602001fd5b60405162461bcd60e51b81526020600482018181528651602484015286518793919283926044019190850190808383600083156112055781810151838201526020016111ed565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590610e0b57505015159291505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a26469706673582212206594b7203dfcf44864941ccf0877f7ffedeac41647827c2d661311141e35b12b64736f6c634300060c0033";
        var contract = await new this.state.web3state.eth.Contract(abi)
        .deploy({
            data: ByteCode,arguments: [this.state.TokenIN,this.state.TokenOUT,this.state.uint256_rewardPerBlock,this.state.uint256_startBlock,this.state.uint256_lockBlock,this.state.uint256_endBlock] })// Writing you arguments in the array})
            .send({ from: this.state.user })
            .then( async(newContractInstance)=> {
              this.state.newConAddr = newContractInstance.options.address; 
             
                 console.log("Presale contract ",this.state.newConAddr);
                // document.forms["newToken"].submit();
            }).catch(e=>{
                //try again
                alert("Try Again !")
            
         })   
      
       
        }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onFileChange = event => {
     var name = event.target.value;
        // Update the state
        this.setState({ file: event.target.files[0]});
        this.setState({ imagepath: name});
      console.log(name);
      };

    onStakeAdd = e => {
        e.preventDefault();
        const newStake = {
           
            TokenIN:this.state.TokenIN,
            TokenOUT: this.state.TokenOUT,
            uint256_rewardPerBlock:this.state.uint256_rewardPerBlock,
            uint256_startBlock:this.state. uint256_startBlock,
            uint256_lockBlock: this.state.uint256_lockBlock,
            uint256_endBlock: this.state.uint256_endBlock,
            // depositFee: this.state.depositFee,
            file: this.state.file
        };
        console.log("image>>>>>>>",newStake);
        this.props.addStake(newStake, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-stake-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Stake</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onStakeAdd} id="add-stake">
                               
                                    <div className="row mt-2">
                                        
                                        <div className="col-md-3">
                                            <label htmlFor="TokenIN">Token IN</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.TokenIN}
                                                placeholder="Enter Token IN"
                                                id="TokenIN"
                                                type="text"
                                                error={errors.TokenIN}
                                                className={classnames("form-control", {
                                                    invalid: errors.TokenIN
                                                })}/>
                                            <span className="text-danger">{errors.TokenIN}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="TokenOUT">Token OUT</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                placeholder="Enter Token OUT"
                                                value={this.state.TokenOUT}
                                                id="TokenOUT"
                                                type="text"
                                                error={errors.TokenOUT}
                                                className={classnames("form-control", {
                                                    invalid: errors.TokenOUT
                                                })}/>
                                            <span className="text-danger">{errors.TokenOUT}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor=" uint256_startBlock"> Start Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                placeholder="Enter Start Block"
                                                value={this.state. uint256_startBlock}
                                                error={errors. uint256_startBlock}
                                                id="uint256_startBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors. uint256_startBlock
                                                })}
                                            />
                                            <span className="text-danger">{errors.uint256_startBlock}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor=" uint256_lockBlock">lock Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                placeholder="Enter lock Block"
                                                value={this.state. uint256_lockBlock}
                                                error={errors. uint256_lockBlock}
                                                id="uint256_lockBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors. uint256_lockBlock
                                                })}
                                            />
                                            <span className="text-danger">{errors.uint256_lockBlock}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="uint256_rewardPerBlock">Reward Per Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                placeholder="Enter Reward Per Block"
                                                value={this.state.uint256_rewardPerBlock}
                                                error={errors.uint256_rewardPerBlock}
                                                id="uint256_rewardPerBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.uint256_rewardPerBlock
                                                })} depositFee
                                            />
                                            <span className="text-danger">{errors.uint256_rewardPerBlock}</span>
                                        </div>
                                        </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor=" uint256_endBlock">End Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                placeholder="Enter End Block"
                                                value={this.state. uint256_endBlock}
                                                error={errors. uint256_endBlock}
                                                id="uint256_endBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors. uint256_endBlock
                                                })}
                                            />
                                            <span className="text-danger">{errors.uint256_endBlock}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="image">Add Image</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onFileChange}
                                                value={this.state.imagepath}
                                                error={errors.image}
                                                id="image"
                                                type="file"
                                                className={classnames("form-control", {
                                                    invalid: errors.image
                                                })}
                                            />
                                            <span className="text-danger">{errors.image}</span>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-stake"
                                    type="submit"
                                    className="btn btn-primary" onClick={this.addStake}>
                                    Add Stake
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StakeAddModal.propTypes = {
    addStake: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addStake }
)(withRouter(StakeAddModal));
