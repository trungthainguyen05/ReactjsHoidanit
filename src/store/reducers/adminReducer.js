import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            return {
                ...state,
            }

        //position
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isLoadingPosition = false;
            state.positions = action.data;
            // console.log('trung check state.position', state.positions)
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false;
            return {
                ...state,
            }

        //Role
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoadingRole = false;
            state.roles = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false;
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;