import Password from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Password />', () => {
  it('should render <Password />', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Password />
      </Provider>
    );
    expect(screen.getByTestId('password-form')).toBeInTheDocument();
  });
});
