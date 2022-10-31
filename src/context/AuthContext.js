import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch(action.type) {
        case 'signin':
            return {errorMessage: '', token: action.payload}
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'sign_out':
            return {token: null, errorMessage: ''}
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        dispatch({type: 'signin', payload: token})
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

const signup = (dispatch) => {
    return async ({email, password}) => {
        try {
            const response = await trackerApi.post('/signup', {email, password});
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'signin', payload: response.data.token})

            // nav to main flow
            navigate('TrackList');
        } catch (err) {
            console.log(err)
            dispatch({type: 'add_error', payload: 'There was an error with SignUp. Please Try Again'})
        }
    };
};


const signin = (dispatch) => {
    return async ({email, password}) => {
        try {
            const response = await trackerApi.post('/signin', {email, password});
            console.log(response)
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'signin', payload: response.data.token})

            // nav to main flow
            navigate('TrackList');
        } catch (err) {
            dispatch({type: 'add_error', payload: 'There was an error with Signin. Please Try Again'})
        }

    };
};

const signout = (dispatch) => {
    return async () => {
        // sign out somehow
        await AsyncStorage.removeItem('token')
        dispatch({type: 'sign_out'})
        navigate('loginFlow');
    };
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage: ''}
);