/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

//typeis either 'password' or 'data'
export const updateData = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
