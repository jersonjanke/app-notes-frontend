import PasswordValidate from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<PasswordValidate />', () => {
  const store = mockStore(initialState);
  it('should render <PasswordValidate />', () => {
    render(
      <Provider store={store}>
        <PasswordValidate password="Teste@123" />
      </Provider>
    );
    expect(screen.getByTestId('passwordValidate')).toBeInTheDocument();
  });

  it('should render invalid password', () => {
    render(
      <Provider store={store}>
        <PasswordValidate password="123" />
      </Provider>
    );
    expect(screen.getByTestId('passwordValidate')).toBeInTheDocument();
  });
});
