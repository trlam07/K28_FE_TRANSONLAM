import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../common/apis";

export const fetchAsyncMovies = createAsyncThunk('movie/fetchAsyncMovies', async(accessToken) => {
    try {
        const {data} = await createApi(accessToken).get('/movies')
        return data?.data.movies
    } catch (error) {
        console.log(error)
    }
})

export const fetchAsyncMovie = createAsyncThunk('movie/fetchAsyncMovie', async({accessToken, id}) => {
    try {
        const {data} = await createApi(accessToken).get(`/movie/${id}`)
        return data?.data
    } catch (error) {
        console.log(error)
    }
})

export const createNewMovie = createAsyncThunk('movie/createNewMovie', async({accessToken, newMovie}) => {
    try {
        await createApi(accessToken).post('/movies', {...newMovie})
    } catch (error) {
        console.log(error)
    }
})

export const updateMovie = createAsyncThunk('movie/updateMovie', async({accessToken, id, dataUpdate}) => {
    try {
        await createApi(accessToken).put('/movies', {...dataUpdate})
    } catch (error) {
        console.log(error)
    }
})

export const deleteMovie = createAsyncThunk('movie/deleteMovie', async({accessToken, id}) => {
    try {
        await createApi(accessToken).delete(`/movies/${id}`)
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    movies: [],
    movie: {}
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        removeMovies: (state) => {
            state.movies = []
        },
        removeMovie: () => {
            state.movie = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
        builder.addCase(fetchAsyncMovie.fulfilled, (state, action) => {
            state.movie = action.payload
        })
    }
})

export const {removeMovie, removeMovies} = movieSlice.actions

export const getMovies = state => state.movie.movies

export const getMovie = state => state.movie.movie

export default movieSlice.reducer