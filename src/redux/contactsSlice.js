import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { selectStatusFilter, selectNameFilter } from './filtersSlice';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  // Об'єкт case-редюсерів обробку зовнішніх екшенів
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// Експортуємо редюсер слайсу
export default contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;

export const selectLoading = state => state.contacts.loading;

export const selectError = state => state.contacts.error;

//Оголошуємо складний селектор для фільтрування контактів по імені та статусу
//Обчислюємо масив контактів, які необхідно відображати в інтерфейсі
export const selectVisibleContacts = createSelector(
  [selectStatusFilter, selectContacts, selectNameFilter],
  (statusFilter, contacts, nameFilter) => {
    const items = contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
    );
    // Повертаємо результат обчислень
    switch (statusFilter) {
      case 'family':
        return items.filter(contacts => contacts.group === 'family');
      case 'work':
        return items.filter(contacts => contacts.group === 'work');
      case 'other':
        return items.filter(
          contacts => contacts.group !== 'family' && contacts.group !== 'work'
        );
      default:
        return items;
    }
  }
);

//Обчислюємо кількість контактів по групам
export const selectContactsCount = createSelector(
  [selectContacts],
  contacts => {
    return contacts.reduce(
      (acc, contacts) => {
        if (contacts.group === 'family') {
          acc.family += 1;
          acc.total += 1;
        } else if (contacts.group === 'work') {
          acc.work += 1;
          acc.total += 1;
        } else {
          acc.other += 1;
          acc.total += 1;
        }
        return acc;
      },
      { total: 0, family: 0, work: 0, other: 0 }
    );
  }
);
