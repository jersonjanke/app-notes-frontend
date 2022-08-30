import DashboardCard from 'components/DashboardCard';
import Title from 'components/Title';
import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import ScoreService from 'services/ScoreService';
import { toastMSG } from 'utils/toast';
import Loading from 'components/Loading';
import { ScoreDto } from 'types/Score';
import Image from 'next/image';
import Flex from 'components/Flex';
import { GAME } from 'utils/Game';
import SettingsService from 'services/SettingsService';
import { setConfig } from 'store/actions/config';
import Head from 'next/head';
import withAuthPage from 'hooks/withAuthPage';

const Dashboard: React.FC = () => {
  const LIFE = 3;
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: StoreData) => state.user);
  const [data, setData] = useState<ScoreDto[]>([]);

  const fetchData = useCallback(async (email: string) => {
    try {
      const response = await ScoreService.getByEmailScore(email);
      setData(response);
    } catch (error) {
      toastMSG(`Problema ao carregar dados: ${error}`, 'error');
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length === 0 && user.email.length > 0) fetchData(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const getSettings = useCallback((email: string) => {
    SettingsService.getSettings(email).then((response) => {
      if (response.length > 0) {
        dispatch(setConfig(response[response.length - 1]));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    user.email.length > 0 && getSettings(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

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
    <>
      <Head>
        <title>Guitar Notes - Dashboard</title>
      </Head>
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
                        key={item.level}
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
    </>
  );
};

export default withAuthPage(Dashboard);
