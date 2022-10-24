import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils/constant';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            isLoadingGender: false,
            roleArr: [],
            isLoadingRole: false,
            positionArr: [],
            isLoadingPosition: false,
            previewImgURL: [],
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, PrevState, SnapShot) {
        if (prevProps.genderRedux != this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.positionRedux != this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        if (prevProps.roleRedux != this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        let objectUrl = URL.createObjectURL(file);

        this.setState({
            previewImgURL: objectUrl
        })

    }

    openPreviewImage = () => {
        if (this.state.previewImgURL.length === 0) {
            this.setState({
                isOpen: false
            })
            return
        }

        this.setState({
            isOpen: true
        })
    }

    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let isGetGender = this.props.isLoadingGenderRedux;

        let roleArrs = this.state.roleArr;
        let isLoadingRoles = this.props.isLoadingRoleRedux;

        let positionArrs = this.state.positionArr;
        let isLoadingPositions = this.props.isLoadingPositionRedux;

        return (
            <div className="user-redux-container">
                <div className="title" >Manage redux user</div>
                <div>
                    <span>{isGetGender === true ? 'Loading gender' : ''}</span>
                    <span>{isLoadingRoles === true ? 'Loading Role' : ''}</span>
                    <span>{isLoadingPositions === true ? 'Loading Role' : ''}</span>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select id="inputState" className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select id="inputState" className="form-control">
                                    {positionArrs && positionArrs.length > 0 &&
                                        positionArrs.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select id="inputState" className="form-control">
                                    {roleArrs && roleArrs.length > 0 &&
                                        roleArrs.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">Tải ảnh</label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,

        positionRedux: state.admin.positions,
        isLoadingPositionRedux: state.admin.isLoadingPosition,

        roleRedux: state.admin.roles,
        isLoadingRoleRedux: state.admin.isLoadingRole,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
