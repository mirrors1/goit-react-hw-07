import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Встановлюємо базову URL-адресу
// для всіх запитів axios
axios.defaults.baseURL = 'https://67bac2d9fbe0387ca13811b4.mockapi.io';

// Оголошення асинхронної операції
// fetchContacts для отримання даних
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  // Використовуємо символ підкреслення як ім'я першого параметра,
  // тому що в цій операції він нам не потрібен
  async (signal, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', { signal: signal });
      // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // При відміні запиту на сервер повертаємо помилку
        return thunkAPI.rejectWithValue('Server request cancelled');
      } else {
        // При помилці запиту повертаємо проміс який буде відхилений з текстом помилки
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
// addContact для додавання даних
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//deleteContact для видалення даних
export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
