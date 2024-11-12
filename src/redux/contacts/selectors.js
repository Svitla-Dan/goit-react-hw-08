import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

const selectContacts = state => state.contacts.items;
const selectLoading = state => state.contacts.loading;
const selectError = state => state.contacts.error;

const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export { selectContacts, selectLoading, selectError, selectFilteredContacts };
