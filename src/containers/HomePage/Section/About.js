import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div>
                <div className="section-share section-about">
                    <div className="section-about-header">
                        Hướng dẫn làm trang web bookingcare.vn
                    </div>
                    <div className="section-about-content">
                        <div className="content-left">
                            <iframe
                                width="50%"
                                height="300px"
                                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT5-kzm53oVL5ZBAe-LTREGA"
                                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>

                            </iframe>
                        </div>
                        <div className="content-right">

                        </div>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
