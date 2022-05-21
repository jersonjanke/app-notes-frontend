import DashboardCard from '@/components/DashboardCard';
import Title from '@/components/Title';
import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import ScoreService from 'services/ScoreService';
import { toastMSG } from 'utils/toast';

const Dashboard: React.FC = () => {
  const LIFE = 5;
  const router = useRouter();
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const user = useSelector((state: StoreData) => state.user);

  const createScore = useCallback(
    async (level: number) => {
      try {
        const payload = {
          email: user.email,
          life: LIFE,
          score: 0,
        };
        const response = await ScoreService.createScore(payload);
        response._id && router.push(`${pages.level}/${level}/${response._id}`);
      } catch (error) {
        toastMSG(`Problema ao criar o jogo: ${error}`, 'error');
      }
    },
    [router, user.email]
  );

  return (
    <Row>
      <Col md={12} style={{ marginBottom: 12 }}>
        <Title level={1}>Treinar ouvido:</Title>
      </Col>

      {levels.map((level) => (
        <Col key={`level-${level}`} md={3} sm={12} style={{ marginTop: 24 }}>
          <DashboardCard onClick={() => createScore(level)}>
            {`${level}° fase`}
          </DashboardCard>
        </Col>
      ))}
    </Row>
  );
};

export default Dashboard;
