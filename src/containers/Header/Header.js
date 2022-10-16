import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    changeLaguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        // console.log('Trung check userinfo: ', this.props.userInfo);
        let userInfo = this.props.userInfo;

        const { processLogout } = this.props;
        let language = this.props.language;
        // console.log(language);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="languages">
                    <span className="welcome">
                        {<FormattedMessage id="homeheader.welcome" />}
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={() => this.changeLaguage(LANGUAGES.VI)}>VI</span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"} onClick={() => this.changeLaguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
