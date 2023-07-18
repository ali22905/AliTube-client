import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      // if the likes list doesn't contain the current user id
      if (!state.currentVideo.likes.includes(action.payload)) {
        // add the user id into the likes list
        state.currentVideo.likes.push(action.payload);
        // remove the user id from the dislikes list
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      // if the dislikes list doesn't contain the current user id
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        // add the user id to the dislikes list
        state.currentVideo.dislikes.push(action.payload);
        // remove the user id from the likes list
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;