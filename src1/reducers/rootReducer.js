import {combineReducers} from 'redux'
import movieReducer from './moviesReducer'
import newMovieReducer from './newMovieReducer';

export default combineReducers({
    movieReducer,newMovieReducer
})
