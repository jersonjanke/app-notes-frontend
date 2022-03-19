import { Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import { typePlay } from 'utils/pages';
import Stepper from '@/components/Stepper';
import { useState } from 'react';
import Title from '@/components/Title';
import { getTitleForParams } from 'utils/pages';

const PlayPage: React.FC = () => {
  const router = useRouter();
  const type = router?.query?.type as typePlay;
  const [current, setCurrent] = useState<number>(1);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Row>
      <Col md={12} style={{ marginBottom: 36, textAlign: 'center' }}>
        <Title level={2}>{getTitleForParams(type)}</Title>
      </Col>
      <Col md={12}>
        <Stepper items={items} current={current} />
      </Col>
    </Row>
  );
};

export default PlayPage;
