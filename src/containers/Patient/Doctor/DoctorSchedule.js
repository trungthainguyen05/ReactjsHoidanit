import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        // console.log('moment Vi', moment(new Date()).format('dddd - DD/MM'));
        // console.log('moment En', moment(new Date()).locale('en').format("ddd - DD/MM"));

        this.setArrDays(language);
    }

    setArrDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object);
        }
        // console.log('tr check arrDate: ', arrDate);


        this.setState({
            allDays: arrDate
        })
    }

    componentDidUpdate(prevProps, PrevState, SnapShot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    handleOnChangeSelect = async (event) => {
        console.log('tr check onchange: ', event.target.value)
        console.log('tr check doctorId: ', this.props.doctorIdFromParent)
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;

            let date = event.target.value;

            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('tr check getScheduleByDate from react: ', res)
        }


    }

    render() {
        let { allDays } = this.state;
        // console.log('tr check allDate state: ', allDays);

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
                        onChange={(event) => this.handleOnChangeSelect(event)}
                    >
                        {allDays && allDays.length > 0
                            && allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
