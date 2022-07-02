import DashboardCard from 'components/DashboardCard';
import Title from 'components/Title';
import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import ScoreService from 'services/ScoreService';
import { toastMSG } from 'utils/toast';
import Loading from 'components/Loading';
import { ScoreDto } from 'types/Score';
import Image from 'next/image';
import Flex from 'components/Flex';
import { GAME } from 'utils/Game';

const Dashboard: React.FC = () => {
  const LIFE = 5;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: StoreData) => state.user);
  const [data, setData] = useState<ScoreDto[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await ScoreService.getByEmailScore(user?.email);
      setData(response);
    } catch (error) {
      toastMSG(`Problema ao carregar dados: ${error}`, 'error');
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createScore = useCallback(
    async (level: number) => {
      try {
        setLoading(true);
        const payload = {
          level,
          email: user.email,
          life: LIFE,
          score: 0,
        };
        const response = await ScoreService.createScore(payload);
        response._id && router.push(`${pages.level}/${level}/${response._id}`);
      } catch (error) {
        setLoading(false);
        toastMSG(`Problema ao criar o jogo: ${error}`, 'error');
      }
    },
    [router, user.email]
  );

  const getIsDone = (level: number): boolean => {
    if (data.length > 0) {
      const item = data?.filter((item) => item?.level === level && item.done);
      const [done] = item;
      return done ? true : false;
    } else {
      return false;
    }
  };

  return (
    <Row>
      <Col md={12} style={{ marginBottom: 12 }}>
        <Title level={1}>Treinar ouvido: </Title>
      </Col>

      {loading ? (
        <Loading />
      ) : (
        GAME.map((item) => (
          <Col
            key={`level-${item.level}`}
            md={3}
            sm={12}
            style={{ marginTop: 24 }}
          >
            <DashboardCard onClick={() => createScore(item.level)}>
              <Flex justifyContent="space-between" style={{ width: '100%' }}>
                <Flex>{`${item.level}° fase`}</Flex>
                {getIsDone(item.level) && (
                  <Flex justifyContent="flex-end" alignItems="center">
                    <Image
                      layout="fixed"
                      height={24}
                      width={24}
                      src="/svg/check.svg"
                      alt="Check"
                    />
                  </Flex>
                )}
              </Flex>
            </DashboardCard>
          </Col>
        ))
      )}
    </Row>
  );
};

export default Dashboard;
