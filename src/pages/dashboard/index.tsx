import DashboardCard from '@/components/DashboardCard';
import Title from '@/components/Title';
import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Row>
      <Col md={12} style={{ marginBottom: 12 }}>
        <Title level={1}>Treinar ouvido:</Title>
      </Col>

      {levels.map((level) => (
        <Col key={`level-${level}`} md={3} sm={12} style={{ marginTop: 24 }}>
          <DashboardCard onClick={() => router.push(`${pages.level}/${level}`)}>
            {`${level}° fase`}
          </DashboardCard>
        </Col>
      ))}
    </Row>
  );
};

export default Dashboard;
