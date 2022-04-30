import Title from '@/components/Title';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import ScoreService from 'services/ScoreService';
import { storeWrapper } from 'store';
import { User } from 'types/Login';
import { ScoreDto } from 'types/Score';
import { red } from 'utils/colors';
import { faFlushed, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Flex from '@/components/Flex';
import Table from '@/components/Table';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { pages } from 'utils/pages';
import { useEffect, useState } from 'react';

type Props = {
  result: {
    data: ScoreDto;
  };
};

const FailedPage: NextPage<Props> = ({ result }) => {
  const router = useRouter();
  const [percentual, setPercentual] = useState(0);

  useEffect(() => {
    const correctItem = result.data.notes.filter(
      (note) => note.correct === note.selected
    );

    setPercentual((correctItem.length / result.data.notes.length) * 100);
  }, [result]);

  return (
    <>
      <Flex
        style={{ marginTop: 24, width: '100%' }}
        justifyContent="space-between"
      >
        <Flex>
          <Title level={1}>
            Você Perdeu!{' '}
            <FontAwesomeIcon
              icon={faFlushed as IconProp}
              color={red}
              size="1x"
            />
          </Title>
        </Flex>
        <Flex gap="4px" justifyContent="flex-end">
          <Title level={2}>
            Pontos: <b>{result.data.score}</b>
          </Title>
        </Flex>
      </Flex>

      <hr />

      <Flex style={{ marginTop: 12 }} flexDirection="column">
        <Flex>Resultado das tentativas</Flex>
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
                  <FontAwesomeIcon
                    icon={
                      item.correct === item.selected
                        ? (faCheck as IconProp)
                        : (faTimes as IconProp)
                    }
                    color={item.correct === item.selected ? 'green' : red}
                    size="1x"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Flex justifyContent="space-between" style={{ marginTop: 12 }}>
          <Button onClick={() => router.push(`/${pages.dashboard}`)}>
            Voltar
          </Button>
          <Title level={3}>{`Você acerto: ${percentual.toFixed(2)}%`}</Title>
        </Flex>
      </Flex>
    </>
  );
};

export default FailedPage;

FailedPage.getInitialProps = storeWrapper.getInitialPageProps(
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
