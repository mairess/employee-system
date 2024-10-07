import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Divider from '../../components/Divider';
import store from '../../store';
import LoginPage from '../../app/page';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Testing Login page.', () => {
  it('Renders inputs and image.', async () => {
    render(
      <Provider store={ store }><LoginPage /></Provider>,
    );

    const title = screen.getByText(/welcome back/i);
    const loginAvatar = screen.getByAltText(/login avatar/i);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const keepMeLogged = screen.getByLabelText(/Keep me logged/i);

    const keepMeLoggedCheckBox = screen.getByRole('checkbox');
    const buttonSignIn = screen.getByRole('button', { name: /sign in/i });

    const buttonForgotPassword = screen.getByRole('button', { name: /forgot your password/i });
    const dontHaveAccount = screen.getByText(/Don't have an account/i);
    const register = screen.getByText(/Register/i);
    const ImageLogin = screen.getByRole('img', { name: /logo/i });

    expect(title).toBeInTheDocument();
    expect(loginAvatar).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(keepMeLogged).toBeInTheDocument();
    expect(keepMeLoggedCheckBox).toBeInTheDocument();
    expect(buttonSignIn).toBeInTheDocument();
    expect(buttonForgotPassword).toBeInTheDocument();
    expect(dontHaveAccount).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(ImageLogin).toBeInTheDocument();
  });

  it('Renders divider component with 2 lines and "OR" text in teh middle.', async () => {
    const { container } = render(<Divider />);

    const orText = screen.getByText(/or/i);
    const lines = container.querySelectorAll('.border-t');

    expect(orText).toBeInTheDocument();
    expect(lines.length).toBe(2);
  });

  it('Selects keep me logged.', async () => {
    render(
      <Provider store={ store }><LoginPage /></Provider>,
    );

    const keepMeLoggedCheckBox = screen.getByRole('checkbox');

    expect(keepMeLoggedCheckBox).toBeInTheDocument();

    await userEvent.click(keepMeLoggedCheckBox);
    expect(keepMeLoggedCheckBox).toBeChecked();
  });

  it('Renders modal password change.', async () => {
    render(
      <Provider store={ store }><LoginPage /></Provider>,
    );

    const buttonForgotPassword = screen.getByRole('button', { name: /forgot your password/i });

    await userEvent.click(buttonForgotPassword);

    const changePasswordHeading = screen.getByRole('heading', { level: 1, name: /forgot password?/i });

    const changePasswordAvatar = screen.getByRole('img', { name: /forgot password avatar?/i });

    const changePasswordBtn = screen.getByRole('button', { name: /change password/i });
    const closeModalBtn = screen.getByRole('button', { name: /fechar modal/i });
    const changePasswordEmailInput = screen.getByPlaceholderText(/email/i);

    expect(changePasswordBtn).toBeInTheDocument();
    expect(closeModalBtn).toBeInTheDocument();
    expect(changePasswordEmailInput).toBeInTheDocument();
    expect(changePasswordHeading).toBeInTheDocument();
    expect(changePasswordAvatar).toBeInTheDocument();

    await userEvent.click(closeModalBtn);
    expect(changePasswordBtn).not.toBeInTheDocument();
  });
});
