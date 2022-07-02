import Settings from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../../__mocks__/initialState';

const mockStore = configureStore([]);

describe('<Settings />', () => {
  it('should render <Settings />', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Settings
          open={true}
          onClose={function () {
            throw new Error('Function not implemented.');
          }}
        />
      </Provider>
    );
    expect(screen.getByTestId('settings-form')).toBeInTheDocument();
  });
});
