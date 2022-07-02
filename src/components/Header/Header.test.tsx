import Header from '.';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Header />', () => {
  it('should render <Header />', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should click open settings', () => {
    const store = mockStore({
      user: {
        token: '62c0967ea1592368b2cc8dfc',
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('settings-icon'));
    expect(screen.getByTestId('settings-form')).toBeInTheDocument();
  });
});
