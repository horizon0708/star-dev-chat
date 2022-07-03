import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { supabase } from '../../services/supabaseClient';
import { SignUp } from './SignUp';

// Setting up these mocks are hard to grasp at the start
// dont worry about understanding it fully for now, copy them into your code for your tests.
// https://jestjs.io/docs/mock-functions

// mock for supabase
jest.mock('../../services/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

const mockNavigate = jest.fn();

// mock for react router
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

const mockToast = jest.fn();

// mock for chakra (only useToast)
jest.mock('@chakra-ui/react', () => {
  return {
    // we are only mocking `useToast` here as we are spreading the actual object using `jest.requireActual()`
    ...jest.requireActual('@chakra-ui/react'),
    useToast: () => mockToast,
  };
});

test('Validation errors show up and user is redirected to /signin after signing up', async () => {
  render(<SignUp />);
  // we "mock" the return value of `signUp` promise, to return {}.
  supabase.auth.signUp.mockResolvedValue({});

  // find sign up button and press it
  const signupButton = screen.getByRole('button', /sign up/i);
  userEvent.click(signupButton);

  // verify that "required" error messages show up
  await screen.findByText(/Email is required to sign up/);
  await screen.findByText(/Password is required to sign up/);

  // type a valid email
  const emailField = screen.getByLabelText(/email address/i);
  await userEvent.type(emailField, 'test@email.com', { delay: 5 });
  expect(emailField).toHaveValue('test@email.com');

  // type password that is too short
  const passwordField = screen.getByLabelText(/password/i);
  await userEvent.type(passwordField, 'short', { delay: 5 });
  expect(passwordField).toHaveValue('short');

  // press the submit button again
  userEvent.click(signupButton);

  // now we check that the minLength validation rule
  await screen.findByText(/Password must be longer than 8 letters!/);

  // we also check that the email required error doesn't show up!
  const emailRequired = screen.queryByText(/Email is required to sign up/);
  expect(emailRequired).not.toBeInTheDocument();

  // now we type a valid password
  userEvent.clear(passwordField);
  await userEvent.type(passwordField, 'longenoughpw', { delay: 5 });

  // we click the sign up button for the last time.
  userEvent.click(signupButton);

  await waitFor(() => {
    // we check that the `navigate` function was called once, with the argument '/signin'
    // after `supabase.auth.signUp` resolves successfully
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
    expect(mockNavigate).toHaveBeenCalledTimes(1);

    // we check that the success toast is shown once
    // with the correct messages
    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        title: 'Sign up success',
        description: 'Check your mailbox!',
      }),
    );
  });
});

test('User is not redirected when the sign up is not successful', async () => {
  render(<SignUp />);
  // we "mock" the return value of `signUp` promise, to return an object that returns an error.
  supabase.auth.signUp.mockResolvedValue({
    error: { message: 'error message' },
  });

  const emailField = screen.getByLabelText(/email address/i);
  await userEvent.type(emailField, 'test@email.com', { delay: 5 });

  const passwordField = screen.getByLabelText(/password/i);
  await userEvent.type(passwordField, 'validpassword', { delay: 5 });

  const signupButton = screen.getByRole('button', /sign up/i);
  userEvent.click(signupButton);

  await waitFor(() => {
    // we check that the `navigate` function hasn't been called
    // after `supabase.auth.signUp` resolves with error!
    expect(mockNavigate).not.toHaveBeenCalledWith('/signin');
    expect(mockNavigate).toHaveBeenCalledTimes(0);

    // we check that the error toast is shown once
    // with the correct messages
    expect(mockToast).toHaveBeenCalledTimes(1);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        title: 'Error',
        description: 'error message',
      }),
    );
  });
});
