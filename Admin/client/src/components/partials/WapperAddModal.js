import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addWapper } from "../../actions/wapperAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
// import  Web3 from 'web3';

import 'react-toastify/dist/ReactToastify.css';



class WapperAddModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            fromAddress: "",
            amount: "",
            errors: {},
};
    }
    // componentDidMount(props){
    //     this.MetaMask()
    // }

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
            $('#add-wapper-modal').modal('hide');
            toast(nextProps.auth.form.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    // MetaMask = async (e) => {
    //     try{
    //         if (window.ethereum) {
    //             const web3 = new Web3(window.ethereum);
    //             this.setState({ web3state: web3 })
    //             try {
    //                 window.ethereum.enable().then(async () => {
    //                     // User has allowed account access to DApp...
    //                     const accounts = await web3.eth.getAccounts();
    //                     console.log("Account : ", accounts[0]);
    //                     const data = accounts[0];
    
    //                     this.setState({ user: data });
                        
    //                 });
    //             } catch (e) {
    //                 // User has denied account access to DApp...
    //             }
    //         }
    //         // Legacy DApp Browsers
    //         else if (window.web3) {
    //             const web3 = new Web3(window.web3.currentProvider);
    //             this.setState({ web3state: web3 })
    //         }
    //         // Non-DApp Browsers
    //         else {
    //             //alert('No Dapp Supported Wallet Found');
    //             console.log("No Dapp Supported Wallet Found")
    //         }
    //     }catch(e){

    //     }
       
    // }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    

    onWapperAdd = e => {
        e.preventDefault();
        const newWapper = {
            
            fromAddress: this.state.fromAddress,
            amount: this.state.amount,
            
        };
        
        this.props.addWapper(newWapper, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-wapper-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add New Transfer</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onWapperAdd} id="add-wapper">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="fromAddress">From Address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.fromAddress}
                                                placeholder="Enter From Address"
                                                id="fromAddress"
                                                type="text"
                                                error={errors.fromAddress}
                                                className={classnames("form-control", {
                                                    invalid: errors.fromAddress
                                                })}/>
                                            <span className="text-danger">{errors.fromAddress}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="amount">Transfer Amount</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                placeholder="Enter Transfer Amount"
                                                value={this.state.amount}
                                                id="amount"
                                                type="text"
                                                error={errors.amount}
                                                className={classnames("form-control", {
                                                    invalid: errors.amount
                                                })}/>
                                            <span className="text-danger">{errors.amount}</span>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-wapper"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Transfer Amount
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

WapperAddModal.propTypes = {
    addWapper: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addWapper }
)(withRouter(WapperAddModal));
