import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenUserModal: false,
        }
    }
    /** Life cycle
     * Run component
     * 1. Run construct -> init state
     * 2. Did mount (set state)
     * 3. Render
     * 
     * 
     */

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
            // console.log('check arrUser', this.state.arrUsers);
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenUserModal: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenUserModal: !this.state.isOpenUserModal,
        })
    }


    render() {
        // console.log(this.state);
        let arrUsers = this.state.arrUsers;

        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenUserModal}
                    toggleFromParent={this.toggleUserModal}
                    test='abc'
                />
                <div className="title text-center">Manage User with HoidanIt</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus">
                            Add New User
                        </i>
                    </button>
                </div>
                <div className="user-Table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((item, index) => {
                                // console.log('check map: ', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
