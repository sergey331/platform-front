import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {LOGIN, REGISTER} from "../Api/api";
import register from "../../Page/Register";

export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {

        return axios.post(LOGIN, data)
            .then(({data}) => data)


    }
)

export const Registers = createAsyncThunk(
    'auth/register',
    async (data) => {
        return axios.post(REGISTER,data)
            .then(({data}) => data)
    }
)

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const Auth = createSlice({
    name: 'auth',
    initialState: {
        user: (user !== null) ? JSON.parse(user) : {},
        token: (token !== null) ? token : '',
        isSuccess: false,
        isError: false,
        isLoading: false,
        message: ''
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload.user;
            state.token = payload.access_token;
            localStorage.setItem('user', JSON.stringify(payload.user))
            localStorage.setItem('token', JSON.stringify(payload.access_token))
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = 'Login or password not found'
            state.user = {};
            state.token = '';
        },
        [Registers.pending]: (state) => {
            state.isLoading = true
        },
        [Registers.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload.user;
            state.token = payload.access_token;
            localStorage.setItem('user', JSON.stringify(payload.user))
            localStorage.setItem('token', JSON.stringify(payload.access_token))
        },
        [Registers.rejected]: (state, action) => {
            console.log(action)
            state.isLoading = false;
            state.isError = true;
            state.message = 'Entries fields is not correct'
            state.user = {};
            state.token = '';
        }
    },
    reducers: {
        reset: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.isLoading = false;
            state.message = ''
        }
    }
})

export  const {reset} = Auth.actions
export default Auth.reducer;
