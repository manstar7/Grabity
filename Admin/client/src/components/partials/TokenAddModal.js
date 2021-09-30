import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToken } from "../../actions/tokenAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';



class TokenAddModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "",
            symbol: "",
            addresses: "",
            chainId: "",
            decimals: "",
            file:{},
            errors: {},
};
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
            $('#add-token-modal').modal('hide');
            toast(nextProps.auth.form.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
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

    onTokenAdd = e => {
        e.preventDefault();
        const newToken = {
            name: this.state.name,
            symbol:this.state.symbol,
            addresses: this.state.addresses,
            chainId: this.state.chainId,
            decimals:this.state.decimals,
            file: this.state.file
        };
       
        this.props.addToken(newToken, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-token-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Token</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTokenAdd} id="add-token">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Token Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                placeholder="Enter Token Name"
                                                id="name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}/>
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="symbol">Token Symbol</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                placeholder="Enter Token Symbol"
                                                value={this.state.symbol}
                                                id="symbol"
                                                type="text"
                                                error={errors.symbol}
                                                className={classnames("form-control", {
                                                    invalid: errors.symbol
                                                })}/>
                                            <span className="text-danger">{errors.symbol}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="address"> Token Address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                placeholder="Enter Token Address"
                                                value={this.state.addresses}
                                                error={errors.addresses}
                                                id="addresses"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.addresses
                                                })}
                                            />
                                            <span className="text-danger">{errors.addresses}</span>
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
                                    form="add-token"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Token
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TokenAddModal.propTypes = {
    addToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addToken }
)(withRouter(TokenAddModal));
