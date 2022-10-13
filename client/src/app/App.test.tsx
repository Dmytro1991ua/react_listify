import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  const Component = (): JSX.Element => (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  it('should render component without crashing', async () => {
    render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );
  });
});
