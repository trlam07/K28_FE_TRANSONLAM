import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../common/apis";
import { message, notification } from "antd";
import NOTIFICATION_TYPE from "../../constants";

export const register = createAsyncThunk('auth/register', async(dataRegister) => {
    try {
        const {data} = await createApi().post('/auth/register', {...dataRegister})
        notification[NOTIFICATION_TYPE.success]({
            message: 'Register successfully',
            placement: 'topRight'
        })
        return data?.data
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message,
            placement: 'topRight'
        })
    }
})

export const login = createAsyncThunk('auth/login', async(dataLogin) => {
    try {
        const {data} = await createApi().post('/auth/login', {...dataLogin})
        localStorage.setItem('access_token', data?.data.accessToken)
        notification[NOTIFICATION_TYPE.success]({
            message: 'Log in successfully',
            placement: 'topRight'
        })
        return data?.data
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message,
            placement: 'topRight'
        })
    }
})

export const logout = createAsyncThunk('auth/logout', async(accessToken) => {
    try {
        await createApi(accessToken).post('/auth/logout')
        localStorage.clear()
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message,
            placement: 'topRight'
        })
    }
})

const initialState = {
    user: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = {}
        })
    }
})

export const getLoggedInUser = state => state.auth.user;

export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import createApi from "../../common/apis";
// import { notification } from "antd";
// import NOTIFICATION_TYPE from "../../constants";

// export const register = createAsyncThunk('auth/register', async(dataRegister) => {
//     try {
//         const {data} = await createApi().post('/auth/register', {...dataRegister});
//         notification[NOTIFICATION_TYPE.success]({
//             message: 'Register successfully',
//             placement: 'topRight'
//         });
//         return data?.data;
//     } catch (error) {
//         notification[NOTIFICATION_TYPE.error]({
//             message: error.response.data.message,
//             placement: 'topRight'
//         });
//         throw error;
//     }
// });

// export const login = createAsyncThunk('auth/login', async(dataLogin) => {
//     try {
//         const {data} = await createApi().post('/auth/login', {...dataLogin});
//         localStorage.setItem('access_token', data?.data.accessToken);
//         notification[NOTIFICATION_TYPE.success]({
//             message: 'Log in successfully',
//             placement: 'topRight'
//         });
//         return data?.data;
//     } catch (error) {
//         notification[NOTIFICATION_TYPE.error]({
//             message: error.response.data.message,
//             placement: 'topRight'
//         });
//         throw error;
//     }
// });

// export const logout = createAsyncThunk('auth/logout', async(accessToken) => {
//     try {
//         await createApi(accessToken).post('/auth/logout');
//         localStorage.clear();
//     } catch (error) {
//         notification[NOTIFICATION_TYPE.error]({
//             message: error.response.data.message,
//             placement: 'topRight'
//         });
//         throw error;
//     }
// });

// const initialState = {
//     user: null, // Initialize user as null
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(login.fulfilled, (state, action) => {
//             state.user = action.payload;
//         });
//         builder.addCase(logout.fulfilled, (state) => {
//             state.user = null;
//         });
//     }
// });

// export const getLoggedInUser = (state) => state.auth.user;

// export default authSlice.reducer;