import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePool } from "../../actions/poolActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import  Web3 from 'web3';

import 'react-toastify/dist/ReactToastify.css';

class PoolUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            pid: this.props.record.pid,
            risk:this.props.record.risk,
            alloc:this.props.record.alloc,
            isTokenOnly: this.props.record.isTokenOnly,
            lpAddresses: this.props.record.lpAddresses,
            tokenSymbol: this.props.record.tokenSymbol,
            tokenAddresses: this.props.record.tokenAddresses,
            quoteTokenSymbol: this.props.record.quoteTokenSymbol,
            quoteTokenAdresses: this.props.record.quoteTokenAdresses,
            depositFee: this.props.record.depositFee,
            user:this.props.record.user,
            file:{},
            errors: {},
           };
    }
    componentDidMount(props){
        console.log("data :",this.props.record)
        this.MetaMask()
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                pid: nextProps.record.pid,
                risk:nextProps.record.risk,
                alloc:nextProps.record.alloc,
                // isTokenOnly: nextProps.state.isTokenOnly,
                lpAddresses: nextProps.record.lpAddresses,
                tokenSymbol: nextProps.record.tokenSymbol,
                tokenAddresses: nextProps.record.tokenAddresses,
                quoteTokenSymbol: nextProps.record.quoteTokenSymbol,
                quoteTokenAdresses: nextProps.record.quoteTokenAdresses,
                depositFee: nextProps.record.depositFee,
                file: nextProps.record.file,
            })
           // console.log("data 2 : ",nextProps.record.quoteTokenSymbol)
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.form !== undefined
            && nextProps.auth.form.data !== undefined
            && nextProps.auth.form.data.message !== undefined
            && nextProps.auth.form.data.success) {
           
            toast(nextProps.auth.form.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        $('#update-pool-modal').modal('hide');
    }
    editPool= async (e) => {

        const ABI = [{"inputs":[{"internalType":"contract MMOToken","name":"_orange","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_mmoPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"changeTokenOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mmoPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"orange","outputs":[{"internalType":"contract MMOToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingMmo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accOrangePerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"bool","name":"emergencyWithdrawnable","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"bool","name":"_allowed","type":"bool"}],"name":"setEmergencyWithdrawnable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mmoPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawSafe","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        const masterchef = "0x0d4BE57064599EAFEF2DB70B6640e14dA9A6AF2a";
    
         const FactoryABI = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pairCodeHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"stateMutability":"nonpayable","type":"function"}];
         const factory = "0x67a1615A5A8c11B1Da7FEE49Da4323968337424f";
        
         
    
         var masterContract =  new this.state.web3state.eth.Contract(ABI, masterchef);
         var factoryContract =  new this.state.web3state.eth.Contract(FactoryABI, factory);
         
        //  var updated = this.state.updated;
         var pid = this.state.pid;

         var allocPoint = this.state.alloc;
         allocPoint = allocPoint * 100;
        
        var depositFee = this.state.depositFee;
        
    
       
        // document.getElementById('logo_overlay').style.opacity='0.5';
        // document.getElementById('loader_div').style.display='block';
            
    
       await masterContract.methods.set(pid,allocPoint,depositFee,true).send({ from: this.state.user }).then(async(result) => {
            console.log(result);
        }).catch(e=>{
               //try again
               alert("Try Again !")
            //  document.getElementById('logo_overlay').style.opacity='1';
            //  document.getElementById('loader_div').style.display='none';
        })        
    
    
     }
    onChange = e => {
        if (e.target.id === 'alloc') {
            this.setState({ alloc: e.target.value*100 });
        }
        if (e.target.id === 'pid') {
            this.setState({ pid: e.target.value});
        }
        if (e.target.id === 'form-update-tokenSymbol') {
            this.setState({ tokenSymbol: e.target.value });
        }
       if (e.target.id === 'form-update-quoteTokenSymbol') {
          this.setState({ quoteTokenSymbol: e.target.value });
        }
        if (e.target.id === 'form-update-tokenAddresses') {
            this.setState({ tokenAddresses: e.target.value });
        }
        if (e.target.id === 'form-update-quoteTokenAdresses') {
            this.setState({ quoteTokenAdresses: e.target.value });
        }
        if (e.target.id === 'form-update-depositFee') {
            this.setState({ depositFee: e.target.value });
        }
        if (e.target.id === 'lpAddresses') {
            this.setState({ lpAddresses: e.target.value });
        }

        console.log("Count 2: ",this.state.alloc,this.state.lpAddresses,this.state.pid)

    };
    onFileChange = event => {
        var name = event.target.value;
           // Update the state
           this.setState({ file: event.target.files[0]});
           this.setState({ imagepath: name});
           console.log(event.target.files[0]);
         };
   
    onPoolUpdate = e => {
        e.preventDefault();
        const updatePool = {
            _id: this.state.id,
            pid: this.state.pid,
            risk:this.state.risk,
            alloc:this.state.alloc,
            isTokenOnly: this.state.isTokenOnly,
            lpAddresses: this.state.lpAddresses,
            tokenSymbol:this.state.tokenSymbol,
            tokenAddresses:this.state.tokenAddresses,
            quoteTokenSymbol: this.state.quoteTokenSymbol,
            quoteTokenAdresses: this.state.quoteTokenAdresses,
            depositFee: this.state.depositFee,
            user:this.state.user,
            file: this.state.file
 
        };
        this.props.updatePool(updatePool);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-pool-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Pool</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onPoolUpdate} id="update-pool">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="form-update-id"
                                        type="text"
                                        className="d-none"/>
                                         <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="alloc">Multipier</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.alloc===""?this.state.alloc:this.state.alloc/100}
                                                placeholder="Multipier (x)"
                                                id="alloc"
                                                type="text"
                                                error={errors.alloc}
                                                className={classnames("form-control", {
                                                    invalid: errors.alloc
                                                })}/>
                                            <span className="text-danger">{errors.alloc}</span>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.pid}
                                                // placeholder="Multipier (x)"
                                                id="pid"
                                                type="hidden"
                                                error={errors.pid}
                                                className={classnames("form-control", {
                                                    invalid: errors.pid
                                                })}/>
                                            <span className="text-danger">{errors.pid}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="tokenSymbol">Token A Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.tokenSymbol}
                                                id="form-update-tokenSymbol"
                                                type="text"
                                                error={errors.tokenSymbol}
                                                className={classnames("form-control", {
                                                    invalid: errors.tokenSymbol
                                                })}/>
                                            <span className="text-danger">{errors.tokenSymbol}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        {/* <div className="col-md-3">
                                            <label htmlFor="quoteTokenSymbol">Token B Name</label>
                                        </div> */}
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.quoteTokenSymbol}
                                                error={errors.quoteTokenSymbol}
                                                id="form-update-quoteTokenSymbol"
                                                value="BUSD"
                                                type="hidden"
                                                className={classnames("form-control", {
                                                    invalid: errors.quoteTokenSymbol
                                                })}
                                            />
                                            <span className="text-danger">{errors.quoteTokenSymbol}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="tokenAddresses ">Token A Address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                 onChange={this.onChange}
                                                value={this.state.tokenAddresses}
                                                error={errors.tokenAddresses}
                                                id="form-update-tokenAddresses"
                                                type="text"
                                                readOnly= {true}
                                                className={classnames("form-control", {
                                                    invalid: errors.tokenAddresses
                                                })}
                                            />
                                            <span className="text-danger">{errors.tokenAddresses}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        {/* <div className="col-md-3">
                                            <label htmlFor="quoteTokenAdresses">Token B Address</label>
                                        </div> */}
                                        <div className="col-md-9">
                                            <input
                                               
                                                onChange={this.onChange}
                                                value={this.state.quoteTokenAdresses}
                                                error={errors.quoteTokenAdresses}
                                                id="form-update-quoteTokenAdresses"
                                                type="hidden"
                                                value="0xe9e7cea3dedca5984780bafc599bd69add087d56"
                                                className={classnames("form-control", {
                                                    invalid: errors.quoteTokenAdresses
                                                })}
                                            />
                                            <span className="text-danger">{errors.quoteTokenAdresses}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="depositFee">Deposit Fee</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                               onChange={this.onChange}
                                                value={this.state.depositFee}
                                                error={errors.depositFee}
                                                id="form-update-depositFee"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.depositFee
                                                })}
                                            />
                                            <span className="text-danger">{errors.depositFee}</span>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                
                                                value={this.state.lpAddresses}
                                                error={errors.lpAddresses}
                                                id="lpAddresses"
                                                type="hidden"
                                                className={classnames("form-control", {
                                                    invalid: errors.lpAddresses
                                                })} depositFee
                                            />
                                            <span className="text-danger">{errors.lpAddresses}</span>
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
                                    form="update-pool"
                                    type="submit"
                                    className="btn btn-primary" onClick={this.editPool}>
                                    Update Pool
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PoolUpdateModal.propTypes = {
    updatePool: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updatePool }
)(withRouter(PoolUpdateModal));
