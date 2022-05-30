import Title from '@/components/Title';
import { NextPage } from 'next';
import ScoreService from 'services/ScoreService';
import { storeWrapper } from 'store';
import { StoreData, User } from 'types/Login';
import { ScoreDto } from 'types/Score';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toastMSG } from 'utils/toast';
import Loading from '@/components/Loading';
import checkIcon from '../../../../public/icons/check.svg';
import xIcon from '../../../../public/icons/x.svg';
import Image from 'next/image';

type Props = {
  result: {
    data: ScoreDto;
  };
};

const SuccessPage: NextPage<Props> = ({ result }) => {
  const LIFE = 5;
  const router = useRouter();
  const { level } = router?.query;
  const [percentual, setPercentual] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: StoreData) => state.user);

  const createScore = useCallback(
    async (level: number) => {
      try {
        setLoading(true);
        const payload = {
          email: user.email,
          life: LIFE,
          score: 0,
        };
        const response = await ScoreService.createScore(payload);
        response._id && router.push(`/${pages.level}/${level}/${response._id}`);
      } catch (error) {
        setLoading(false);
        toastMSG(`Problema ao criar o jogo: ${error}`, 'error');
      }
    },
    [router, user.email]
  );

  useEffect(() => {
    if (result) {
      const correctItem = result.data.notes.filter(
        (note) => note.correct === note.selected
      );

      setPercentual((correctItem.length / result.data.notes.length) * 100);
    }
  }, [result]);

  const handleRepeat = () => {
    createScore(Number(level));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        result && (
          <>
            <Flex
              style={{ marginTop: 24, width: '100%' }}
              justifyContent="space-between"
            >
              <Flex>
                <Title level={1}>Você Ganhou! </Title>
              </Flex>
              <Flex gap="4px" justifyContent="flex-end">
                <Title level={2}>
                  Pontos: <b>{result.data.score}</b>
                </Title>
              </Flex>
            </Flex>

            <hr />

            <Flex style={{ marginTop: 12 }} flexDirection="column">
              <Flex>Resultado das tentativas:</Flex>
              <Table>
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Nota Correto</th>
                    <th>Nota Selecionada</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {result.data.notes.map((item, index) => (
                    <tr key={`${index}${item.level}`}>
                      <td>{item.level}</td>
                      <td>{item.correct}</td>
                      <td>{item.selected}</td>
                      <td>
                        <Image
                          src={
                            item.correct === item.selected ? checkIcon : xIcon
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Flex
                justifyContent="space-between"
                style={{ marginTop: 8 }}
                alignContent="center"
              >
                <Flex gap="12px" style={{ width: '40%' }}>
                  <Button
                    onClick={() => router.push(`/${pages.dashboard}`)}
                    style={{ width: 76 }}
                  >
                    Voltar
                  </Button>
                  <Button onClick={handleRepeat} style={{ width: 76 }}>
                    Repetir
                  </Button>
                </Flex>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Title level={3}>{`Você acerto: ${percentual.toFixed(
                    2
                  )}%`}</Title>
                </Flex>
              </Flex>
            </Flex>
          </>
        )
      )}
      {!result && <Title level={2}>Problema ao carregar os dados...</Title>}
    </>
  );
};

export default SuccessPage;

SuccessPage.getInitialProps = storeWrapper.getInitialPageProps(
  (store) =>
    async ({ query }) => {
      const { id } = query;
      const user = store.getState().user as User;
      const data = await ScoreService.getByIDScoreSSR(
        id as string,
        user.token as string
      );
      return { result: { data } };
    }
);
