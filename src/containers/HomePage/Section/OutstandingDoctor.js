import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';

class OutstandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps, PrevState, SnapShot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        console.log('trungcheck arrDoctors: ', arrDoctors);
        let { language } = this.props;
        return (
            <div>
                <div className="section-share section-outstanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {/* {arrDoctors && arrDoctors.length > 0
                                    && arrDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                        let nameEn = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                        return (
                                            <div className="section-customize" key={index}>
                                                <div className="bg-image section-outstanding-doctor"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                                <div className="position text-center">
                                                    <div>
                                                        {language === LANGUAGES.VI ? nameVi : nameEn}
                                                        Giáo sư, Tiến sỹ Lê Văn Anh
                                                    </div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                } */}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
