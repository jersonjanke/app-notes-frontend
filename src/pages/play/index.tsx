import { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { pages, typePlay } from 'utils/pages';
import { getTitleForParams } from 'utils/pages';

import Stepper from '@/components/Stepper';
import Title from '@/components/Title';
import Button from '@/components/Button';
import { getRandomNumber, getLevelUnison } from 'services/GameService';
import { GameLevel, Note } from 'types/Game';
import { play } from 'services/AudioService';
import { toast } from 'react-toastify';

const PlayPage: React.FC = () => {
  const router = useRouter();
  const type = router?.query?.type as typePlay;
  const [level, setLevel] = useState<number>(1);
  const items = [1, 2, 3, 4, 5];
  const [game, setGame] = useState<GameLevel[]>();
  const [correct, setCorrect] = useState<Note | null>();

  useEffect(() => {
    switch (type) {
      case 'unison':
        setGame(getLevelUnison());
    }
  }, [router]);

  const handlePlay = () => {
    if (game) {
      const length = game[level - 1].notes.length;
      const random = getRandomNumber(length);
      const note = game[level - 1].notes[random];
      setCorrect(note);
      play(note.src);
    }
  };

  const handleNote = (note: Note) => {
    if (level < items.length) {
      if (correct === note) {
        setCorrect(null);
        setLevel(level + 1);
        toast('Correto!', {
          type: 'success',
          theme: 'colored',
        });
      } else {
        setCorrect(null);
        toast('Incorreto!', {
          type: 'error',
          theme: 'colored',
        });
      }
    } else {
      router.push(pages.dashboard);
    }
  };

  return (
    <Row
      style={{
        gap: 12,
      }}
    >
      <Col md={12} style={{ marginBottom: 36, textAlign: 'center' }}>
        <Title level={2}>{getTitleForParams(type)}</Title>
      </Col>
      <Col md={12}>
        <Stepper items={items} level={level} />
      </Col>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '12px 0',
        }}
      >
        <Button onClick={handlePlay}>Play</Button>
      </Col>
      <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
        {game &&
          game[level - 1].notes.map((note) => {
            return (
              <Button
                style={{ margin: 5 }}
                key={note.name}
                onClick={() => handleNote(note)}
              >
                {note.name} ({note.cipher})
              </Button>
            );
          })}
      </Col>
    </Row>
  );
};

export default PlayPage;
