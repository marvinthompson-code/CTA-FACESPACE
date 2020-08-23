import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/user/userSlice'
import tokenReducer from '../features/user/tokenSlice'
import likesReducer from '../features/likes/likesSlice'
import loadingReducer from '../features/loading/loadingSlice'
import modalReducer from '../features/modal/modalSlice'

// import logger from 'redux-logger';

export default configureStore({
    reducer: {
        posts: postsReducer,
        user: userReducer,
        token: tokenReducer,
        likes: likesReducer,
        loading: loadingReducer,
        modal: modalReducer
    },
    middleware: [...getDefaultMiddleware()]
})
