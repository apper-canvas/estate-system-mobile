import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  loading: false,
  error: null,
  activeFilter: 'all',
  searchQuery: ''
};

export const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
});

export const { setProperties, setLoading, setError, setActiveFilter, setSearchQuery } = propertySlice.actions;

export default propertySlice.reducer;