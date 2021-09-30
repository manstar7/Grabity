import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateStake } from "../../actions/stakeAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class StakeUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            
            TokenIN: this.props.record.TokenIN,
            TokenOUT: this.props.record.TokenOUT,
            uint256_startBlock: this.props.record. uint256_startBlock,
            uint256_lockBlock: this.props.record.uint256_lockBlock,
            uint256_rewardPerBlock: this.props.record. uint256_rewardPerBlock,
            uint256_endBlock: this.props.record.uint256_endBlock,
            file:{},
            errors: {},
           };
    }
    componentDidMount(props){
        console.log("data :",this.props.record)
    }

    componentWillReceiveProps(nextProps) {
         console.log("next Props>>>>",nextProps)
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                TokenIN: nextProps.record.TokenIN,
                TokenOUT: nextProps.record.TokenOUT,
                uint256_startBlock: nextProps.record. uint256_startBlock,
                uint256_lockBlock: nextProps.record. uint256_lockBlock,
                uint256_rewardPerBlock: nextProps.record. uint256_rewardPerBlock,
                uint256_endBlock: nextProps.record.uint256_endBlock,
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
            $('#update-stake-modal').modal('hide');
        
    }

    onChange = e => {
        if (e.target.id === 'stake-update-TokenIN') {
            this.setState({ TokenIN: e.target.value });
        }
       if (e.target.id === 'stake-update-TokenOUT') {
          this.setState({ TokenOUT: e.target.value });
        }
        if (e.target.id === 'stake-update-uint256_startBlock') {
            this.setState({ uint256_startBlock: e.target.value });
        }
        if (e.target.id === 'stake-update-uint256_lockBlock') {
            this.setState({ uint256_lockBlock: e.target.value });
        }
        if (e.target.id === 'stake-update-uint256_rewardPerBlock') {
            this.setState({ uint256_rewardPerBlock: e.target.value });
        }
        if (e.target.id === 'stake-update-uint256_endBlock') {
            this.setState({ uint256_endBlock: e.target.value });
        }
    };
    onFileChange = event => {
        var name = event.target.value;
           // Update the state
           this.setState({ file: event.target.files[0]});
           this.setState({ imagepath: name});
           console.log(event.target.files[0]);
         };
   
    onStakeUpdate = e => {
        e.preventDefault();
        const updateStake = {
            _id: this.state.id,
            TokenIN:this.state.TokenIN,
            TokenOUT: this.state.TokenOUT,
            uint256_startBlock:this.state. uint256_startBlock,
            uint256_lockBlock: this.state. uint256_lockBlock,
            uint256_rewardPerBlock: this.state.uint256_rewardPerBlock,
            uint256_endBlock: this.state.uint256_endBlock,
            file: this.state.file
  };
        this.props.updateStake(updateStake);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-stake-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update StakeSwap</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onStakeUpdate} id="update-stake">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="stake-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="TokenIN">Token IN</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.TokenIN}
                                                id="stake-update-TokenIN"
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
                                            <label htmlFor="TokenOUT ">Token OUT</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.TokenOUT}
                                                error={errors.TokenOUT}
                                                id="stake-update-TokenOUT"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.TokenOUT
                                                })}
                                            />
                                            <span className="text-danger">{errors.TokenOUT}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="uint256_startBlock">Start Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.uint256_startBlock}
                                                error={errors.uint256_startBlock}
                                                id="stake-update-uint256_startBlock"
                                                type="text"
                                                // readOnly= {true}
                                                className={classnames("form-control", {
                                                    invalid: errors.uint256_startBlock
                                                })}
                                            />
                                            <span className="text-danger">{errors.uint256_startBlock}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="uint256_lockBlock">Lock Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                               onChange={this.onChange}
                                                value={this.state.uint256_lockBlock}
                                                error={errors.uint256_lockBlock}
                                                id="stake-update-uint256_lockBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.uint256_lockBlock
                                                })}
                                            />
                                            <span className="text-danger">{errors.uint256_lockBlock}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="uint256_rewardPerBlock">Reward PerBlock</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                               onChange={this.onChange}
                                                value={this.state.uint256_rewardPerBlock}
                                                error={errors.uint256_rewardPerBlock}
                                                id="stake-update-uint256_rewardPerBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.uint256_rewardPerBlock
                                                })}
                                            />
                                            <span className="text-danger">{errors.uint256_rewardPerBlock}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="uint256_endBlock">End Block</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                               onChange={this.onChange}
                                                value={this.state.uint256_endBlock}
                                                error={errors.uint256_endBlock}
                                                id="stake-update-uint256_endBlock"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.uint256_endBlock
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
                                    form="update-stake"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Stake
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StakeUpdateModal.propTypes = {
    updateStake: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateStake }
)(withRouter(StakeUpdateModal));
