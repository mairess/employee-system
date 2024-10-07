import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import RegisterPage from '../../app/register/page';
import store from '../../store';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Testing Register page.', () => {
  it.only('Renders inputs and image.', async () => {
    render(<Provider store={ store }><RegisterPage /></Provider>);

    const title = screen.getByText(/Register/i);
    const loginAvatar = screen.getByAltText(/register avatar/i);

    const photoInput = screen.getByPlaceholderText('https://robohash.org/01.png');
    const fullNameInput = screen.getByPlaceholderText(/full name/i);

    const usernameInput = screen.getByPlaceholderText(/username/i);

    const emailInput = screen.getByPlaceholderText(/email/i);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);

    const buttonSignUp = screen.getByRole('button', { name: /sign up/i });

    const haveAnAccountText = screen.getByText('Already have an account?');

    const loginLink = screen.getByText(/login/i);
    const divider = screen.getByText(/or/i);

    expect(title).toBeInTheDocument();
    expect(loginAvatar).toBeInTheDocument();
    expect(photoInput).toBeInTheDocument();
    expect(fullNameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(buttonSignUp).toBeInTheDocument();
    expect(divider).toBeInTheDocument();
    expect(haveAnAccountText).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
});
