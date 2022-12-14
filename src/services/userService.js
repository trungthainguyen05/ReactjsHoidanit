import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    // console.log('check data from service: ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (idUser) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: idUser
        }
    });
}

const editUserService = (dataUser) => {
    return axios.put('/api/edit-user', {
        id: dataUser.id,
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        address: dataUser.address,
    })
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService
}