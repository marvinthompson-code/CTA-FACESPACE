import { createSlice } from '@reduxjs/toolkit'

export const likesSlice = createSlice({
    name: "likes",
    initialState: 0,
    reducers: {
        addLike: (state, action) => action.payload 
    },
        removeLike: (state) => state - 1 
})

export const selectLikes = (state) => state.likes

export const {addLike, removeLike} = likesSlice.actions;
export default likesSlice.reducer;