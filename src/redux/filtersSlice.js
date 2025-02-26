//Імпортуємо функцію createAction
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  // Ім'я слайсу
  name: 'filters',
  // Початковий стан редюсера слайсу
  initialState: {
    status: 'all',
    name: '',
  },
  // Об'єкт case-редюсерів
  reducers: {
    changeFilter(state, action) {
      // ✅ Immer замінить це на операцію оновлення
      state.name = action.payload;
    },
    setStatusFilter(state, action) {
      // ✅ Immer замінить це на операцію оновлення
      state.status = action.payload;
    },
  },
});

export default filtersSlice.reducer;

// Експортуємо фабрики екшенів
export const { changeFilter, setStatusFilter } = filtersSlice.actions;

export const selectStatusFilter = state => state.filters.status;
export const selectNameFilter = state => state.filters.name;
