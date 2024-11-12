import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, createContact, deleteContact } from './operations';
import { logoutUser } from '../auth/operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(createContact.pending, handlePending)
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, state => {
        state.items = [];
        state.loading = false;
      });
  },
});

export default contactsSlice.reducer;
