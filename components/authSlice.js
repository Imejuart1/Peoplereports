import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null,
  },
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { setUid } = authSlice.actions;

export const selectUid = state => state.auth.uid;

export default authSlice.reducer;
