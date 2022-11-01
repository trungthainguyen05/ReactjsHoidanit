import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
    render() {
        return (
            <div>
                <div className="home-footer">
                    <p>
                        © 2022 designed by Trung. More information, please contact my email.
                        <a href="#">click Here
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
