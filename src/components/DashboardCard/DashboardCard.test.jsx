import DashboardCard from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<DashboardCard', () => {
  it('should render <Dashboard />', () => {
    render(<DashboardCard>Dashboard Test</DashboardCard>);
    expect(screen.getByTestId('dashboardCard')).toBeInTheDocument();
  });

  it('should render disabled <Dashboard />', () => {
    render(<DashboardCard disabled={true}>Dashboard Test</DashboardCard>);
    expect(screen.getByTestId('dashboardCardDisabled')).toBeInTheDocument();
  });
});
