import { createSlice } from '@reduxjs/toolkit';
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

// Оголошуємо складний селектор для фільтрування контактів по статусу
export const isselectVisibleContacts = state => {
  // Використовуємо вже існуючі селектори
  const contacts = selectContacts(state);
  const statusFilter = selectStatusFilter(state);

  // Повертаємо результат обчислень
  switch (statusFilter) {
    case 'family':
      return contacts.filter(contacts => contacts.group === 'family');
    case 'work':
      return contacts.filter(contacts => contacts.group === 'work');
    case 'other':
      return contacts.filter(
        contacts => contacts.group !== 'family' && contacts.group !== 'work'
      );
    default:
      return contacts;
  }
};

//Обчислюємо масив контактів, які необхідно відображати в інтерфейсі
export const selectVisibleContacts = state => {
  const nameFilter = selectNameFilter(state);
  const contacts = selectContacts(state);
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
  );
};
