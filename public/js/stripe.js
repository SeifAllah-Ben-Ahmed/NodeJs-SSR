/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51JtYSbKVZxBeLadQBvEwJ6unIfD8L5kfqzZ9SPFzXafoML2RWpX9pj9I2Uo0SY47eNW66Yo4YwaO6kHSqw451dTW003FKJSyo4'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
