import Login from './Login';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Login />', () => {
  it('should render <Login />', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
