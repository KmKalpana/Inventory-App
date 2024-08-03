import { createSlice } from '@reduxjs/toolkit';

// Get the name from localStorage
const storedName = localStorage.getItem('name');
const parsedName = storedName ? JSON.parse(storedName) : '';

const initialState = {
  isLoggedIn: false,
  name: parsedName,
  user: {
    name: '',
    email: '',
    bio: '',
    phone: '',
    photo: '',
  },
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user = {
        ...state.user,
        name: profile.name,
        email: profile.email,
        bio: profile.bio,
        phone: profile.phone,
        photo: profile.photo,
      };
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;