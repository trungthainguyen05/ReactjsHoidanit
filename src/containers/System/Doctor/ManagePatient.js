import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;

        this.getDataPatient(user, currentDate);
    }

    getDataPatient = async (user, currentDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: currentDate,
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            })
        }
    }

    async componentDidUpdate(prevProps, PrevState, SnapShot) {
        if (prevProps.language !== this.props.language) {
            let { user } = this.props;
            let { currentDate } = this.state;

            let formatedDate = currentDate;

            let res = await getAllPatientForDoctor({
                doctorId: user.id,
                date: formatedDate,
            })

        }
        if (prevProps.currentDate !== this.props.currentDate) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        let formatedDate = new Date(date[0] + 1).getTime();
        this.setState({
            currentDate: formatedDate,
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            this.getDataPatient(user, currentDate);
        })
    }

    render() {
        console.log('>>>check state:', this.state)
        let { dataPatient } = this.state;
        return (
            <div className="manage-patient-container">
                <div className="manage-patient-title">
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className="manage-patient-body row">
                    <div className="col-6 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12 table-manage-patient" >
                        <table>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0
                                    ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button
                                                        className="mp-btn-confirm"
                                                        onClick={() => this.handleBtnConfirm()}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>No data</tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
