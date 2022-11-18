import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getAllRequiredDoctorInfor();

    }

    componentDidUpdate(prevProps, PrevState, SnapShot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);
            console.log('tr check selectData: ', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })


        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleChangeSelect = async (option) => {
        this.setState({
            selectedOption: option
        })

        let res = await getDetailInforDoctor(option.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
        console.log('tr check res: ', res);
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let nameVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let nameEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? nameVi : nameEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        })
    }

    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        console.log('tr check handleChangeSelectDoctorInfor: ', selectedOption, name)
    }

    render() {
        let { hasOldData } = this.state;
        // selectedPrice: '',
        //     selectedPayment: '',
        //         selectedProvince: '',
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-infor">
                    <div className="content-left">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea
                            className="form-control"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            placeholder="Please input the introduction of Doctor."
                        >
                        </textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={'Chọn bác sĩ'}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                            name={'selectedPayment'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                            name={'selectedProvince'}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control" />
                    </div>

                </div>


                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                >
                    <span>
                        {hasOldData === true ?
                            <FormattedMessage id="admin.manage-doctor.add" />
                            :
                            <FormattedMessage id="admin.manage-doctor.save" />
                        }
                    </span>
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
