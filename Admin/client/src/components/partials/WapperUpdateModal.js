import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateWapper } from "../../actions/wapperAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class WapperUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
            fromAddress: this.props.record.fromAddress,
            amount: this.props.record.amount,
            errors: {},
            
           };
    }
    componentDidMount(props){
        console.log("data :",this.props.record)
    }

    componentWillReceiveProps(nextProps) {
        //  console.log("next Props>>>>",nextProps)
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                fromAddress: nextProps.record.fromAddress,
                amount: nextProps.record.amount,
                
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
                $('#update-wapper-modal').modal('hide');
            toast(nextProps.auth.form.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
           
        
    }

    onChange = e => {
        if (e.target.id === 'stake-update-fromAddress') {
            this.setState({ fromAddress: e.target.value });
        }
       if (e.target.id === 'stake-update-amount') {
          this.setState({ amount: e.target.value });
        }
       
    };
    // onFileChange = event => {
    //     var name = event.target.value;
    //        // Update the state
    //        this.setState({ file: event.target.files[0]});
    //        this.setState({ imagepath: name});
    //        console.log(event.target.files[0]);
    //      };
   
    onWapperUpdate = e => {
        e.preventDefault();
        const updateWapper = {
            _id: this.state.id,
            fromAddress: this.state.fromAddress,
            amount: this.state.amount,
        };
        this.props.updateWapper(updateWapper);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-wapper-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Transfer</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onWapperUpdate} id="update-wapper">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="wapper-update-id"
                                        type="text"
                                        className="d-none"/>
                                      <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="fromAddress">From Address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.fromAddress}
                                                id="wapper-update-fromAddress"
                                                type="text"
                                                readOnly= {true}
                                                error={errors.fromAddress}
                                                className={classnames("form-control", {
                                                    invalid: errors.fromAddress
                                                })}/>
                                            <span className="text-danger">{errors.fromAddress}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="amount ">Transfer Amount</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.amount}
                                                error={errors.amount}
                                                id="stake-update-amount"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.amount
                                                })}
                                            />
                                            <span className="text-danger">{errors.amount}</span>
                                        </div>
                                    </div>
                                    
                                     </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-wapper"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

WapperUpdateModal.propTypes = {
    updateWapper: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateWapper }
)(withRouter(WapperUpdateModal));
